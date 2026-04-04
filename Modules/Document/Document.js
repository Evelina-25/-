import mongoose from "mongoose";

const Document = new mongoose.Schema({

    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true
    },

    type: {
        type: String,
        enum: [
            "APPLICATION",
            "PAYMENT_RECEIPT",
            "SERVICE_CONTRACT",
            "TOUR_VOUCHER",
            "TUR1_VOUCHER",
            "TICKET",
            "INSURANCE_POLICY",
            "TOURIST_MEMO",
            "PASSPORT",
            "VISA_APPLICATION"
        ],
        required: true
    },

    number: {
        type: String
    },

    status: {
        type: String,
        enum: ["CREATED", "ISSUED", "RECEIVED"],
        default: "CREATED"
    },

    source: {
        type: String,
        enum: ["AGENCY", "CLIENT", "CONSULATE"],
        default: "AGENCY"
    },

    issueDate: {
        type: Date,
        default: Date.now
    }

});

export default mongoose.model("Document", Document);