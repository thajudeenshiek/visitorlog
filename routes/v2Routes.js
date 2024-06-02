const express = require('express');
const router = express.Router();

// Import controllers
const visitorController = require("../controllers/v2/visitorController");

// Use visitor routes
router.route('/visitor/register').post(visitorController.register);
router.route('/visitor/list').get(visitorController.list);

module.exports = router;