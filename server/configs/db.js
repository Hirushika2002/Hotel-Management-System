import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on(`connected`, ()=> console.log("Databse Connected")
    );
        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`)
        console.log("MongoDB connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectDB;

