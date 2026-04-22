import mongoose from "mongoose";

const Application = new mongoose.Schema({

    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },

    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour",
        required: true
    },

    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    peopleCount: {
        type: Number,
        required: true
    },

    bookingStatus: {
        type: String,
        enum: ["NEW", "CONFIRMED", "CANCELLED"],
        default: "NEW"
    },

    paymentStatus: {
        type: String,
        enum: ["UNPAID", "PAID"],
        default: "UNPAID"
    },

    bookingDate: {
        type: Date,
        default: Date.now
    },

    documentsIssued: {
    type: Boolean,
    default: false
}
});

export default mongoose.model("Application", Application);