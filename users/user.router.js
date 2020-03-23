const router = require("express").Router();
const { find } = require("./user-model.js");
const protected = require("../auth/protected-middleware");

router.get("/users", protected, (req, res) => {
  find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error retrieving the users"
      });
    });
});

module.exports = router;