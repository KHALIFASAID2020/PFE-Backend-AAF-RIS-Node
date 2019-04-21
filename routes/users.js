const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const chechAuth = require("../middleware/check-auth");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post("/signup",chechAuth,UserController.createUser);
router.post("/login",UserController.loginUser);

module.exports = router;
