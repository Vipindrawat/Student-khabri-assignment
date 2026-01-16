import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    company: String,
    status: String,
    source: String,
    assignedTo: String
},
    {
        timestamps: true
    }
);

export default mongoose.model("Lead", leadSchema);
