
const VisitPurpose = require('../../models/VisitPurpose');

const addVisitPurpose = async (req, res) => {

    try {
        const { name } = req.body;

        const newVisitPurpose = new VisitPurpose({
            name, deleted: false
        });

        const savedVisitPurpose = await newVisitPurpose.save();

        const visitPurposeData = {
            id: savedVisitPurpose.id,
            name: savedVisitPurpose.name
        };

        const responseCode = 201
        const responseDate = {
            "success": true,
            "code": responseCode,
            "message": "Register Successfully!",
            "data": visitPurposeData
        }
        res.status(responseCode).json(responseDate);
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

const listVisitPurpose = async (req, res) => {

    try {

        const visitPurposes = await VisitPurpose.find();
        //.sort({ createAt: 'asc' });

        const visitPurposesData = visitPurposes.map(visitPurpose => {
            return {
                id: visitPurpose.id,
                name: visitPurpose.name
            };
        });

        const responseCode = 200
        const responseDate = {
            "success": true,
            "code": responseCode,
            "message": "",
            "data": visitPurposesData
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

const updateVisitPurpose = async (req, res) => {

    try {

        const { id , name } = req.body;

        await VisitPurpose.findByIdAndUpdate(id, { name });

        const updatedVisitPurpose = await VisitPurpose.findById(id);

        const visitPurposeData = {
            id: updatedVisitPurpose.id,
            name: updatedVisitPurpose.name
        };

        const responseCode = 200
        const responseDate = {
            "success": true,
            "code": responseCode,
            "message": "Updated Successfully!",
            "data": visitPurposeData
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

const deleteVisitPurpose = async (req, res) => {

    try {

        const { id } = req.body;

        const visitPurpose = await VisitPurpose.findById(id);

        // Soft delete the document
        visitPurpose.softDelete();

        const responseCode = 200
        const responseDate = {
            "success": true,
            "code": responseCode,
            "message": "Deleted Successfully!"
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

module.exports = { addVisitPurpose, listVisitPurpose, updateVisitPurpose, deleteVisitPurpose }