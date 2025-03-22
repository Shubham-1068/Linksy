import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    urls: [
        {
            type: String,
            required: true
        }
    ]
});

const linkModel = mongoose.models.Link || mongoose.model("Link", linkSchema);

export default linkModel;
