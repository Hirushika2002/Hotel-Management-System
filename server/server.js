import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";

connectDB()

const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Use raw body parser for webhook route BEFORE any body-consuming middleware
app.post("/api/clerk", express.raw({ type: 'application/json' }), clerkWebhooks);

//middleware
app.use(clerkMiddleware())
app.use(express.json())

//API
app.get('/', (req, res) => res.send("API is working"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));