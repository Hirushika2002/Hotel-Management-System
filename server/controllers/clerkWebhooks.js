import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // Verify signature using raw body
        const payload = req.body; // Buffer
        const jsonString = payload.toString();
        whook.verify(jsonString, headers);

        // Parse JSON for use
        const { data, type } = JSON.parse(jsonString);

        const userData = {
            _id: data.id,
            username: data.first_name + " " + data.last_name,
            email: (data.email_addresses && data.email_addresses[0]) ? data.email_addresses[0].email_address : "",
            image: data.image_url,
            role: "User",
            recentSearchedCities: [],
        };

        //Switch case for differnt events

        switch (type) {
            case "user.created": {
                await User.create(userData);
                break;
            }

            case "user.updated": {
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }

            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                break;
            }

            default:
                break;
        }

        res.json({ success: true, message: "Webhook Received" });
    } catch (error) {
        console.log("Webhook error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
}

export default clerkWebhooks;