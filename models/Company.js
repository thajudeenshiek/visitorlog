
const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
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

const CompanySchema = new mongoose.Schema({
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
    address: AddressSchema,
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



const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;