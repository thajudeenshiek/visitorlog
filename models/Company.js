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
}, {
    collection: 'company_addresses', // Specify the collection name here
    timestamps: true
});

addressSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        // Create a new object with the desired order
        const ordered = {
            officeNo: ret.officeNo,
            floorNo: ret.floorNo,
            buldingName: ret.buldingName,
            street: ret.street,
            city: ret.city,
            country: ret.country,
            poBox: ret.poBox
        };
        return ordered;
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
        max: 15,
        unique: true
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
    address: addressSchema,
    // Soft delete field
    isDeleted: {
        type: Boolean,
        defaults: false
    }
}, {
    collection: 'companies', // Specify the collection name
    timestamps: true
});

companySchema.methods.softDelete = function (callback) {
    this.isDeleted = true;
    this.save(callback);
};

companySchema.set('toJSON', {
    transform: (doc, ret, options) => {
        // Create a new object with the desired order
        const ordered = {
            id: ret._id,
            name: ret.name,
            contactPerson: ret.contactPerson,
            phoneCode: ret.phoneCode,
            phone: ret.phone,
            email: ret.email,
            domain: ret.domain,
            phoneCode: ret.phoneCode,
            address: ret.address
        };
        return ordered;
    }
});

companySchema.index({ email: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });


const Company = mongoose.model("Company", companySchema);

// Company.init().then(() => {
//     // The index has been created
//     console.log('The Company index has been created');
// }).catch(err => {
//     console.error('Error creating index:', err);
// });

module.exports = Company;