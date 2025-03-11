import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
}, { timestamps: true })


export default mongoose.models.Category || mongoose.model("Category", categorySchema);
