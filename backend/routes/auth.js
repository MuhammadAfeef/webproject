const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "nameplacething";

//Route no1 : Create a User using : POST "/api/auth/createuser". No login Required

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
    // If there are errors, return bad and the errors
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success , errors: errors.array() });
    }
    // Checks whether the user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success , error: "Sorry a user with this email already exist" });
      }
      // securing the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash (req.body.password , salt);
      //create a User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
        const data = {
          user:{
            id : user.id
          }
        }
      const authtoken = jwt.sign(data , JWT_SECRET)
      // res.json(user);
      success = true;
      res.json({success ,authtoken})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internel server error");
    }
  }
);

// Route no2 :Authenticate a User using : POST "/api/auth/login". No login required
router.post("/login",[

    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be blanked").exists(),
    // If there are errors, return bad and the errors

  ], async (req , res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email , password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        success = false
        return res.status(400).json({success ,error :"Please try to login with the correct credentials"})
      }

      const passwordcompare = await bcrypt.compare(password , user.password);
      if (!passwordcompare){
        success = false
        return res.status(400).json({success ,error :"Please try to login with the correct credentials"})
      }
      const data = {
        user:{
          id : user.id
        }
      }
    const authtoken = jwt.sign(data , JWT_SECRET)
    success = true ;
    res.json({ success, authtoken})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internel server error");
    }
  }
);

// Route no3 :Get loggedin User's detail using : POST "/api/auth/getuser". Login required

router.post("/getuser", fetchuser ,async (req , res)=>{
try {
  userId = req.user.id ;
  const user = await User.findById(userId).select('-password')
  res.send(user)
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internel server error");
 }
});
module.exports = router;
