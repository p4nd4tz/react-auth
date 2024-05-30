const express = require('express');
const { logout, loginUser } = require('../controller/Auth');

const router = express.router();

router
    .post('/login', loginUser)
    .post('/logout', logout)
    ;

exports.router = router;