const express = require('express');
const { logout, loginUser, checkAuth } = require('../controller/Auth');
const passport = require('passport');

const router = express.Router();

router
    .post('/login', passport.authenticate('local'), loginUser)
    .get('/checkauth', passport.authenticate('jwt'), checkAuth)
    .post('/logout', logout)
    ;

exports.router = router;