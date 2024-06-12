
const mongoose = require('mongoose');
// Retrieve the Schema constructor from mongoose
const { Schema } = mongoose;
const { format } = require('date-fns');
const visitPurpose = require('./VisitPurpose');

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
        minLength: 8
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
    }
}, { timestamps: true });

// Create a virtual property for the full name
visitorSchema.virtual('id').get(function () {
    return `${this._id}`;
});

visitorSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

visitorSchema.virtual('checkInDateTime').get(function () {
    return { 'date': format(this.checkIn, 'yyyy-MM-dd'), 'time': format(this.checkIn, 'HH:mm') };
});

visitorSchema.virtual('checkInDate').get(function () {
    return format(this.checkIn, 'yyyy-MM-dd');
});

visitorSchema.virtual('checkInTime').get(function () {
    return format(this.checkIn, 'HH:mm');
});

visitorSchema.virtual('checkOutDateTime').get(function () {
    return { 'date': format(this.checkOut, 'yyyy-MM-dd'), 'time': format(this.checkOut, 'HH:mm') };
});

visitorSchema.virtual('checkOutDate').get(function () {
    return format(this.checkOut, 'yyyy-MM-dd');
});

visitorSchema.virtual('checkOutTime').get(function () {
    return format(this.checkOut, 'HH:mm');
});

// Ensure virtual fields are included in toJSON and toObject
visitorSchema.set('toJSON', { virtuals: true });
visitorSchema.set('toObject', { virtuals: true });

const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;