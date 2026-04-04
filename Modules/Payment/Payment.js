import mongoose from "mongoose";

const Payment = new mongoose.Schema({

    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    method: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "PAID"
    },

    paymentDate: {
        type: Date,
        default: Date.now
    }

});

export default mongoose.model("Payment", Payment);