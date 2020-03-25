const router = require("express").Router();

const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/user-router");

router.use("/auth", authRouter);
router.use("/protected", usersRouter);

// router.get("/", (req, res) => {
//     if (req.session.seenYouAgain) {
//       res.json({ message: "Nice to see you again" });
//     } else {
//       req.session.seenYouAgain = true;
//       res.json({ message: "Nice to meet you!" });
//     }
//   });

//router.get("/auth",(req,res)=>{
//res.json({message:"It is working"})
//})

//router.get("/",(req,res)=>{
//res.json({message:"It is"})
//})

router.get("/",(req,res)=>{
    console.log("test me");
    res.json({api:"I m alive!"});
});


module.exports = router;
