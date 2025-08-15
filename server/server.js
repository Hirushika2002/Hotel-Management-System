import express from "express"
import "dotenv/config";
import cors from "cors";

const app = express()
app.use(cors())

//Middleware
app.use(express.json())

// Wrap database connection in try-catch
async function connectDB() {
    try {
        const { default: connect } = await import("./configs/db.js");
        await connect();
    } catch (error) {
        console.log("Database connection failed:", error.message);
        // Don't crash the server, just log the error
    }
}

// Add Clerk middleware with error handling
async function setupClerk() {
    try {
        const { clerkMiddleware } = await import('@clerk/express');
        app.use(clerkMiddleware());
        
        // Add webhook routes with error handling
        const { default: clerkWebhooks } = await import("./controllers/clerkWebhooks.js");
        app.use("/api/clerk", clerkWebhooks);
    } catch (error) {
        console.log("Clerk setup failed:", error.message);
        // Continue without Clerk for now
    }
}

// Initialize everything
async function startServer() {
    await connectDB();
    await setupClerk();
    
    app.get('/',(req, res)=> res.send("API is working"))
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
}

startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});


