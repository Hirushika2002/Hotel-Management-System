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

        //verify headers (req.body should be raw for webhooks)
        const body = Buffer.isBuffer(req.body) ? req.body.toString() : JSON.stringify(req.body);
        await whook.verify(body, headers);

        // Parse the body after verification
        const parsedBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
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
                // Check if user already exists
                const existingUser = await User.findById(data.id);
                if (!existingUser) {
                    await User.create(userData);
                }
                break;
            }

            case "user.updated":{
                await User.findByIdAndUpdate(data.id, userData, { upsert: true });
                break;
            }

            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
            }
               
            default:
                console.log(`Unhandled webhook type: ${type}`);
                break;
        }
        res.json({success: true, message: "Webhook Received"})

    } catch (error) {
        console.log("Webhook error:", error.message);
        // Return appropriate status code based on error type
        const statusCode = error.message.includes('verification') ? 401 : 400;
        const message = process.env.NODE_ENV === 'development' ? error.message : 'Internal server error';
        res.status(statusCode).json({success: false, message});
    }
}

export default clerkWebhooks;