import mongoose from "mongoose";

const Tour = new mongoose.Schema({

    name: { 
        type: String, 
        required: true 
    },

    country: { 
        type: String, 
        required: true 
    },

    city: { 
        type: String 
    },

    startDate: { 
        type: Date, 
        required: true 
    },

    durationDays: { 
        type: Number, 
        required: true 
    },

    price: { 
        type: Number, 
        required: true 
    },

    description: { 
        type: String 
    },

    availableSeats: { 
        type: Number, 
        required: true 
    },

    images: { 
        type: [String], 
        default: [] 
    }
    });

export default mongoose.model("Tour", Tour);