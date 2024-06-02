const express = require('express');
const router = express.Router();

// Import controllers
const visitorController = require("../controllers/v1/visitorController");
const companyController = require("../controllers/v1/companyController");

// Use visitor routes
router.route('/visitor/register').post(visitorController.register);
router.route('/visitor/list').get(visitorController.list);

// Use company routes
router.route('/company/register').post(companyController.register);
router.route('/company/list').get(companyController.list);

module.exports = router;