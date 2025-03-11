import mongoose from "mongoose";
const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    images: [{
        alt: String,
        url: String
    }],
    videoes: [{
        alt: String,
        url: String
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
        },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    
},{ timestamps: true });

export default mongoose.models.Content || mongoose.model("Content", contentSchema);