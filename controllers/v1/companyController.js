const express = require('express');
const Company = require('../../models/Company');

const register = async (req, res) => {

    try {
        const { name, contactPerson, phoneCode, phone, email, domain, address } = req.body;

        const newCompany = new Company({
            name, contactPerson, phoneCode, phone, email, domain, address
        });

        const saveCompany = await newCompany.save();

        const responseCode = 201
        const responseDate = {
            "success": true,
            "code": responseCode,
            "message": "Register Successfully!",
            "data": saveCompany
        }
        res.status(responseCode).json(responseDate)
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            const formattedErrors = Object.keys(error.errors).map(key => ({
                path: error.errors[key].path,
                message: error.errors[key].message
            }));

            const responseCode = 400;
            const responseDate = {
                "success": false,
                "code": responseCode,
                "message": "Error Occured!",
                "errors": formattedErrors
            }
            res.status(responseCode).json(responseDate);
        } else {
            const responseCode = 500;
            const responseDate = {
                "success": false,
                "code": responseCode,
                "message": "Error Occured!",
                "errors": { "Error": "Server error" }
            }
            res.status(responseCode).json(responseDate);
        }
    }
}

const list = async (req, res) => {

    try {
        const companyData = await Company.find({});

        const responseCode = 200
        const responseDate = {
            "success": true,
            "code": responseCode,
            "message": "",
            "data": companyData
        }
        res.status(responseCode).json(responseDate)
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            const formattedErrors = Object.keys(error.errors).map(key => ({
                path: error.errors[key].path,
                message: error.errors[key].message
            }));

            const responseCode = 400;
            const responseDate = {
                "success": false,
                "code": responseCode,
                "message": "Error Occured!",
                "errors": formattedErrors
            }
            res.status(responseCode).json(responseDate);
        } else {
            const responseCode = 500;
            const responseDate = {
                "success": false,
                "code": responseCode,
                "message": "Error Occured!",
                "errors": { "Error": "Server error" }
            }
            res.status(responseCode).json(responseDate);
        }
    }
}

const show = async (req, res) => {

    try {
        const { id } = req.params;
        const data = await Company.findById(id);

        const responseCode = 201
        const responseDate = {
            "success": true,
            "code": responseCode,
            "message": "",
            "data": data
        }
        res.status(responseCode).json(responseDate)
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            const formattedErrors = Object.keys(error.errors).map(key => ({
                path: error.errors[key].path,
                message: error.errors[key].message
            }));

            const responseCode = 400;
            const responseDate = {
                "success": false,
                "code": responseCode,
                "message": "Error Occured!",
                "errors": formattedErrors
            }
            res.status(responseCode).json(responseDate);
        } else {
            const responseCode = 500;
            const responseDate = {
                "success": false,
                "code": responseCode,
                "message": "Error Occured!",
                "errors": { "Error": "Server error" }
            }
            res.status(responseCode).json(responseDate);
        }
    }
}

const update = async (req, res) => {

    try {

        const responseDate = {};
        const responseCode = 200;

        const { name } = req.body; //, contactPerson, phoneCode, phone, email, domain, address

        const { id } = req.params;
        await Company.findByIdAndUpdate(id, { name },
            function (err, docs) {
                if (err) {
                    responseCode = 400;

                    responseDate = {
                        "success": false,
                        "code": responseCode,
                        "message": err,
                        "data": {}
                    }
                }
                else {
                    responseCode = 200;

                    responseDate = {
                        "success": true,
                        "code": responseCode,
                        "message": "Updated Successfully!",
                        "data": docs
                    }
                }
            });
        res.status(responseCode).json(responseDate)
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            const formattedErrors = Object.keys(error.errors).map(key => ({
                path: error.errors[key].path,
                message: error.errors[key].message
            }));

            const responseCode = 400;
            const responseDate = {
                "success": false,
                "code": responseCode,
                "message": "Error Occured!",
                "errors": formattedErrors
            }
            res.status(responseCode).json(responseDate);
        } else {
            const responseCode = 500;
            const responseDate = {
                "success": false,
                "code": responseCode,
                "message": "Error Occured!",
                "errors": { "Error": "Server error" }
            }
            res.status(responseCode).json(responseDate);
        }
    }
}

module.exports = {
    register,
    list,
    show,
    update
}