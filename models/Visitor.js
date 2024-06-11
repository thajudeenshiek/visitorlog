
const mongoose = require('mongoose');
// Retrieve the Schema constructor from mongoose
const { Schema } = mongoose;

const visitorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        set: value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3
    },
    phone: {
        type: String,
        required: true,
        minLength: 9,
        maxLength: 15
    },
    email: {
        type: String,
        required: false,
        set: value => value.toLowerCase()
        // validate: {
        //     validator: () => Promise.resolve(false),
        //     message: 'Email validation failed'
        // }
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
    visitPurpose: {
        type: Schema.Types.ObjectId,
        ref: 'visitPurpose',
        required: true
    },
    checkIn: {
        type: Date,
        default: Date.now
    },
    checkOut: {
        type: Date,
        default: Date.now
    },
    // avb: {
    //     type: Array,
    // },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create a virtual property for the full name
visitorSchema.virtual('id').get(function () {
    return `${this._id}`;
});

visitorSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

visitorSchema.virtual('checkInDate').get(function () {
    return this.checkIn.toISOString().split('T')[0];
});

visitorSchema.virtual('checkInTime').get(function () {
    return this.checkIn.toISOString().split('T')[1].split('.')[0];
});

visitorSchema.virtual('checkOutDate').get(function () {
    return this.checkOut.toISOString().split('T')[0];
});

visitorSchema.virtual('checkOutTime').get(function () {
    return this.checkOut.toISOString().split('T')[1].split('.')[0];
});

// Ensure virtual fields are included in toJSON and toObject
visitorSchema.set('toJSON', { virtuals: true });
visitorSchema.set('toObject', { virtuals: true });

const Visitor = mongoose.model("Visitor", visitorSchema);

const visitPurposeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const VisitPurpose = mongoose.model('VisitPurpose', visitPurposeSchema);

module.exports = {
    Visitor, VisitPurpose
};