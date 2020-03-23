const express =require("express");
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

//Routes initialized and imported...
const authRouter = require("../auth/auth-router");
const server = express();

const sessionConfig = {
    name:'sessionId',
    secret:'This is a secret',
    cookie:{
        maxAge: 1000 * 60 * 60,
        secure:false,// https
        httpOnly: true,  // when true, js can't get to the cookie
    },
    resave:false,
    saveUnitialized: false,
}

server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());
server.use(cors());


server.use("/auth", authRouter)

server.get("/", (req, res) => {
    res.json({ api: "up" });
  });

  module.exports = server;