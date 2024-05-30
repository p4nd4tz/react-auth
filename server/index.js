require('dotenv').config();
const express = require('express');
const authRouter = require('./routes/Auth');

const server = express();

server.use(express.json());

server.use('/auth', authRouter.router);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})