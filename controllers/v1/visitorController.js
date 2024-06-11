const { Visitor, VisitPurpose } = require('../../models/Visitor');

const saveVisitPurpose = async (req, res) => {

    try {
        const { name } = req.body;

        const newVisitPurpose = new VisitPurpose({
            name
        });

        const savedVisitPurpose = await newVisitPurpose.save();

        // const visitorData = {
        //         id: savedVisitor.id,
        //         fullName: savedVisitor.fullName,
        //         phone: savedVisitor.phone,
        //         email: savedVisitor.email,
        //         checkIn: savedVisitor.checkIn,
        //         checkOut: savedVisitor.checkOut
        //     };

        const responseCode = 201
        const responseDate = {
            "success": true,
            "code": responseCode,
            "message": "Register Successfully!",
            "data": savedVisitPurpose
        }
        res.status(responseCode).send(responseDate);
    } catch (err) {
        console.error(err);

        // let errors = {};

        // let errorsObj = err.errors;
        // Object.keys(errorsObj).forEach(key => {
        //     let message = "";
        //     let errorMessage = errorsObj[key]["message"];
        //     // console.log(`Key: ${key}, Value: ${errorsObj[key]["message"]}`);
        //     errors[key] = errorMessage;
        // });

        const responseCode = 400
        const responseDate = {
            "success": false,
            "code": responseCode,
            "message": "Error Occured!",
            "errors": err
        }
        res.status(responseCode).json(responseDate);
    }
}

const register = async (req, res) => {

    try {
        const { firstName, lastName, phone, email, idType, idNumber, visitPurpose } = req.body;

        const newVisitor = new Visitor({
            firstName, lastName, phone, email, idType, idNumber, visitPurpose
        });

        const savedVisitor = await newVisitor.save();

        const visitorData = {
            id: savedVisitor.id,
            fullName: savedVisitor.fullName,
            phone: savedVisitor.phone,
            email: savedVisitor.email,
            checkIn: savedVisitor.checkIn,
            checkOut: savedVisitor.checkOut
        };

        const responseCode = 201;
        const responseDate = {
            "success": true,
            "code": responseCode,
            "message": "Register Successfully!",
            "data": visitorData
        };
        res.status(responseCode).json(responseDate);
    } catch (error) {
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

        const visitors = await Visitor
            .find({ checkIn: { '$gte': new Date("2024-06-10") } }).populate('visitPurpose', 'name', 'VisitPurpose')
            // .select('id, firstName lastName phone email checkIn checkOut visitPurpose')
            .sort({ checkIn: 'asc' });

        const visitorData = visitors.map(visitor => {
            return {
                id: visitor.id,
                fullName: visitor.fullName,
                phone: visitor.phone,
                email: visitor.email,
                visitPurpose: visitor.visitPurpose.name,
                checkInDate: visitor.checkInDate,
                checkInTime: visitor.checkInTime,
                checkOutDate: visitor.checkOutDate,
                checkOutTime: visitor.checkOutTime
            };
        });

        const responseCode = 200
        const responseDate = {
            "success": true,
            "code": responseCode,
            "message": "",
            "data": visitorData
        }
        res.status(responseCode).json(responseDate)
    } catch (error) {
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
    saveVisitPurpose,
    register,
    list
}