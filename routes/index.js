const express = require('express');

const indexController = require('../controllers/index');

const router = express.Router();

router.get('/', indexController.getHomePage);

router.post('/', indexController.post);

module.exports = router;