import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try{
        // Validate environment variable
        if (!process.env.CLERK_WEBHOOK_SECRET) {
            console.error("CLERK_WEBHOOK_SECRET is not configured");
            return res.status(500).json({success: false, message: "Server configuration error"});
        }

        // Create a Svix instance with clerk webhook secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)   

        //Getting Headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // Validate required headers
        if (!headers["svix-id"] || !headers["svix-timestamp"] || !headers["svix-signature"]) {
            return res.status(400).json({success: false, message: "Missing required headers"});
        }

        // Fix body handling for Vercel serverless functions
        let body;
        if (Buffer.isBuffer(req.body)) {
            body = req.body.toString();
        } else if (typeof req.body === 'string') {
            body = req.body;
        } else {
            body = JSON.stringify(req.body);
        }

        //verify headers
        await whook.verify(body, headers);

        // Parse the body after verification
        let parsedBody;
        try {
            parsedBody = typeof body === 'string' ? JSON.parse(body) : req.body;
        } catch (parseError) {
            parsedBody = req.body;
        }
        
        const {data, type} = parsedBody;

        // Validate required data
        if (!data || !data.id) {
            return res.status(400).json({success: false, message: "Missing required data"});
        }

        // Fix username generation to handle empty names
        const userData = {
            _id: data.id,
            email: data.email_addresses?.[0]?.email_address || "",
            username: ((data.first_name || "") + " " + (data.last_name || "")).trim() || data.username || "User",
            image: data.image_url || "",
        }

        // Switch cases for different events
        switch(type) {
            case "user.created":{
                try {
                    // Check if user already exists
                    const existingUser = await User.findById(data.id);
                    if (!existingUser) {
                        await User.create(userData);
                    }
                } catch (dbError) {
                    console.error("Database error in user.created:", dbError.message);
                    // Don't fail webhook for database errors
                }
                break;
            }

            case "user.updated":{
                try {
                    await User.findByIdAndUpdate(data.id, userData, { upsert: true });
                } catch (dbError) {
                    console.error("Database error in user.updated:", dbError.message);
                }
                break;
            }

            case "user.deleted":{
                try {
                    await User.findByIdAndDelete(data.id);
                } catch (dbError) {
                    console.error("Database error in user.deleted:", dbError.message);
                }
                break;
            }
               
            default:
                console.log(`Unhandled webhook type: ${type}`);
                break;
        }
        
        res.status(200).json({success: true, message: "Webhook Received"})

    } catch (error) {
        console.error("Webhook error:", error.message, error.stack);
        
        // More specific error handling
        let statusCode = 400;
        let message = "Webhook processing failed";
        
        if (error.message.includes('verification')) {
            statusCode = 401;
            message = "Webhook verification failed";
        } else if (error.message.includes('CLERK_WEBHOOK_SECRET')) {
            statusCode = 500;
            message = "Server configuration error";
        }
        
        res.status(statusCode).json({
            success: false, 
            message: process.env.NODE_ENV === 'development' ? error.message : message
        });
    }
}

export default clerkWebhooks;