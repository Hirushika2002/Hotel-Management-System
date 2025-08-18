import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    }
}, {
    timestamps: true,
    _id: false // Disable auto-generated _id since we're using custom _id
});

export default mongoose.model('User', userSchema);

