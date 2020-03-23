
const router = require("express").Router();
const users = require("./user-model.js");
const protected = require("../auth/protected-middleware");


router.get('/users', protected, (req, res) => {
  users.find()
  .then(users => {
      res.json(users);
  })
  .catch(error => res.send(error));
});

module.exports = router;

