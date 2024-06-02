const Visitor = require('../../models/Visitor');

const register = async (req, res) => {

    try {
        const { firstName, lastName, phone, email, idType, idNumber } = req.body;

        visitor = new Visitor({
            firstName, lastName, phone, email, idType, idNumber
        });

        const newVisitor = await visitor.save();

        const responseCode = 201
        const responseDate = {
            "success": true,
            "code": responseCode,
            "message": "Register Successfully!",
            "data": newVisitor
        }
        res.status(responseCode).json(responseDate)
    } catch (err) {
        console.error(err);
    }
}

const list = async (req, res) => {

    try {
        const visitorData = await Visitor.find({});

        const responseCode = 200
        const responseDate = {
            "success": true,
            "code": responseCode,
            "message": "",
            "data": visitorData
        }
        res.status(responseCode).json(responseDate)
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    register,
    list
}