const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';
var fetchuser = require('../middleware/fetchuser');

// Create a User using: POST "/api/auth/createuser".
router.post('/createuser', [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', 'Enter valid email').isEmail(),
    body('password', "Password atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    // Check whether the user with this email exists already
    try {

        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success,error: "Sorry user with same email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        // res.json(user)
        success=true

        res.json({ success,authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

// Authenticate User using: POST "/api/auth/login".

router.post('/login', [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password cannot be empty').exists(),

], async (req, res) => {

    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(404).json({ error: "Please try to login with correct credentials" })
        }

        const passwordComapare = await bcrypt.compare(password, user.password);
        if (!passwordComapare) {
            success = false
            return res.status(404).json({ success ,error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success,authtoken })


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal serever error occured");
    }

})

// Get logged in user details using: POST "/api/auth/getuser".

router.post('/getuser', fetchuser,  async (req, res) => {
    try {
        userId=req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)



    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal serever error occured");
    }
})



module.exports = router