import express from "express"
import "dotenv/config";
import cors from "cors";

const app = express()
app.use(cors())
app.use(express.json())

// Simple test route
app.get('/', (req, res) => {
    res.json({ 
        message: "API is working",
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development'
    })
})

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is healthy' })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('Unhandled rejection:', err)
    process.exit(1)
})

export default app;
