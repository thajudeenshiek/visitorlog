const Company = require('../../models/Company');

const register = async (req, res) => {

    try {
        const { name, contactPerson, phone, email, domain, address } = req.body;

        company = new Company({
            name, contactPerson, phone, email, domain, address
        });

        const newCompany = await company.save();

        const responseCode = 201
        const responseDate = {
            "success": true,
            "code": responseCode,
            "message": "Register Successfully!",
            "data": newCompany
        }
        res.status(responseCode).json(responseDate)
    } catch (err) {
        console.error(err);
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
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    register,
    list
}