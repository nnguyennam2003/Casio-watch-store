const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["Casio Baby-G", "Casio Edifice", "Casio General", "Casio Gshock", "Luxury", "Sheen", "Couple"],
    },
    collections: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["Men", "Women", "Unisex"],
    },
    caseMaterial: {
        type: String,
        required: true
    },
    bandMaterial: {
        type: String,
        required: true
    },
    movement: {
        type: String,
        required: true,
        enum: ["Digital", "Mechanical"]
    },
    waterResistance: {
        type: String
    },
    dialDiameter: {
        type: Number // mm
    },
    images: [
        {
            url: {
                type: String,
                required: true
            },
            altText: {
                type: String
            }
        }
    ],
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    metaTitle: {
        type: String
    },
    metaDescription: {
        type: String
    },
    metaKeywords: {
        type: String
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model("Product", productSchema)