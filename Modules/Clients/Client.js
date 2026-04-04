import mongoose from "mongoose";

const Client = new mongoose.Schema({
    name: { type: String, required: true },
    passport: { type: String, required: true, unique: true },
    phone: { type: String },
    email: { type: String },
    birthdate: { type: Date }
}, { collection: "clients" });

export default mongoose.model("Client", Client);