const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session');

//Routes initialized and imported...
const authRouter = require("../auth/auth-router");
const userRouter =require("../users/user-router");
const apiRouter =require("../api/api-router");


const server = express();

const sessionConfig = {
    name: 'sessionId',
    secret: 'keep it secret, keep it safe!',
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,   // https
      httpOnly: true,  // when true, js can't get to the cookie
    },
    // we should only save sessions when user allows it
    resave: false,
    saveUninitialized: false,
    clearInterval: 1000 * 60 * 60
  }
  

  server.use(session(sessionConfig))
  server.use(helmet());
  server.use(express.json());
  server.use(cors());


server.use("/auth", authRouter)
server.use("/api/users",userRouter)
server.use("/api",apiRouter)

server.get("/", (req, res) => {
    res.json({ api: "up" });
  });

  module.exports = server;