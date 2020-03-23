//import router && bcryptjs
const router = require("express").Router();
const bcrypt = require("bcryptjs");

const users = require("../users/user-model");

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
      res
        .status(500)
        .json({ message: `There was an error creating this new user` });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  users
    .findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedInUser = user;
        res.status(200).json({ message: `Welcome${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
