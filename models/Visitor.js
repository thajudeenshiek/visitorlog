
const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3
    },
    phone: {
        type: String,
        required: true,
        min: 9,
        max: 15
    },
    email: {
        type: String,
        required: false,
        lowercase: true
    },
    idType: {
        type: Number, 
        enum: [1, 2], // 1 - EmiratesId, 2 - Passport
        required: true
    },
    idNumber: {
        type: String,
        required: true,
        minLength: 10
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
});

const Visitor = mongoose.model("Visitor", VisitorSchema);

module.exports = Visitor;