require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const authRouter = require('./routes/Auth');
const { sanitizeUser, cookieExtractor } = require('./services/common');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const app = express();

app.use(cookieParser());
app.use(
    session({
        secret: process.env.JWT_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
    })
)
app.use(passport.authenticate('session'))
app.use(
    cors({
        origin: '*',
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Content-Type', 'Authorization']
    })
);
app.use(express.json());

app.use('/auth', authRouter.router);

passport.use(
    'local',
    new LocalStrategy({ usernameField: 'email' }, async function (
        email,
        password,
        done
    ) {
        // by default passport uses username
        try {
            if (email !== 'admin@gmail.com' || password !== 'admin')
                return done(null, false, { message: 'Invalid username or password.' });

            const token = jwt.sign(sanitizeUser({ id: 1, role: 'admin' }), process.env.JWT_SECRET_KEY);
            return done(null, { id: 1, role: 'admin', token }); // this lines sends to serializer
        } catch (err) {
            done(err);
        }
    })
);

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;
passport.use(
    'jwt',
    new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            return done(null, { id: 1, role: 'admin' });
            // const user = await User.findById(jwt_payload.id);
            // if (user) {
            //     return done(null, sanitizeUser(user)); // this calls serializer
            // } else {
            //     return done(null, false);
            // }
        } catch (err) {
            console.log(err);
            return done(err, false);
        }
    })
);

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user)
    })
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})