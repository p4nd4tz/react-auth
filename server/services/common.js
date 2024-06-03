const passport = require("passport")

exports.isAuth = (req, res, done) => {
    return passport.authenticate('jwt');
}

exports.sanitizeUser = (user) => {
    return {
        id: user.id,
        role: user.role
    }
}


exports.cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookie) {
        token = req.cookie['jwt'];
    }

    return token;
}