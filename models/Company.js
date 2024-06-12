
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    officeNo: String,
    floorNo: String,
    buldingName: String,
    street: String,
    city: String,
    country: String,
    poBox: {
        type: String,
        min: 2,
        max: 8
    }
});

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    contactPerson: {
        type: String,
        required: true,
        minLength: 3
    },
    phoneCode: {
        type: Number,
        required: true,
        min: 1,
        max: 9999
    },
    phone: {
        type: String,
        required: true,
        min: 9,
        max: 15
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    domain: {
        type: String,
        required: false,
        lowercase: true
    },
    address: addressSchema
}, { timestamps: true });

// Create a virtual property for the full name
companySchema.virtual('id').get(function () {
    return `${this._id}`;
});

// Ensure virtual fields are included in toJSON and toObject
companySchema.set('toJSON', { virtuals: true });
companySchema.set('toObject', { virtuals: true });

const Company = mongoose.model("Company", companySchema);

module.exports = Company;