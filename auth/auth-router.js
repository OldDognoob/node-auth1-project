//import router && bcryptjs
const router = require("express").Router();
const bcrypt = require("bcryptjs");

const users = require("../users/user-model");

// const protected =require("../auth/protected-middleware");

router.post("/register", (req, res) => {
  console.log("register endpoint");
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  users
    .add({
      username,
      password: hashedPassword
    })
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: `You shall not pass!` });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  users
    .findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user= user;
        res.status(200).json({ message: `Welcome${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/logout", (req, res) => {
  console.log("logout endpoint");
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({ message: "You shall not pass!" });
      } else {
        res.json({ message: "good bye" });
      }
    });
  }
});
module.exports = router;
