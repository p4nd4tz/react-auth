const express = require('express');
const { logout, loginUser } = require('../controller/Auth');
const passport = require('passport');

const router = express.Router();

router
    .post('/login', passport.authenticate('local'), loginUser)
    .post('/logout', logout)
    ;

exports.router = router;