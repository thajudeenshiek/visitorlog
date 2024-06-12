
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { format } = require('date-fns');

const visitPurposeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // Soft delete field
    isDeleted: {
        type: Boolean,
        defaults: false
    }
}, { timestamps: true });

visitPurposeSchema.methods.softDelete = function (callback) {
    this.isDeleted = true;
    this.save(callback);
};

// Create a virtual property for the full name
visitPurposeSchema.virtual('id').get(function () {
    return `${this._id}`;
});

// Ensure virtual fields are included in toJSON and toObject
visitPurposeSchema.set('toJSON', { virtuals: true });
visitPurposeSchema.set('toObject', { virtuals: true });

const VisitPurpose = mongoose.model('VisitPurpose', visitPurposeSchema);

module.exports = VisitPurpose;