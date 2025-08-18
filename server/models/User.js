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
    _id: false
});

export default mongoose.model('User', userSchema);

