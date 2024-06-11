const data = {
    visitPurpose: require('../../public/data/purpose-of-the-visit.json')
}

const list = async (req, res) => {

    try {
        const visitPurposeData = data.visitPurpose;

        const responseCode = 200
        const responseDate = {
            "success": true,
            "code": responseCode,
            "message": "",
            "data": visitPurposeData
        }
        res.status(responseCode).json(responseDate)
    } catch (err) {
        console.error(err);

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

module.exports = {
    list
}