require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
var LocalStrategy = require('passport-local');
const authRouter = require('./routes/Auth');

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: '*',
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        // preflightContinue: false,
        // optionsSuccessStatus: 204,
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Content-Type', 'Authorization']
    })
)

app.use('/auth', authRouter.router);

passport.use(new LocalStrategy(function verify(email, password, cb) {
    if (email === 'admin@gmail.com' && password === 'admin') {
        return cb(null, {
            id: 1,
            username: 'admin',
            password: 'admin'
        });
    }
    else {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }

    // db.get('SELECT * FROM users WHERE username = ?', [username], function (err, user) {
    //     if (err) { return cb(err); }
    //     if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    //     crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
    //         if (err) { return cb(err); }
    //         if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
    //             return cb(null, false, { message: 'Incorrect username or password.' });
    //         }
    //         return cb(null, user);
    //     });
    // });
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})