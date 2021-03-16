const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const app = express()
const User = require('../models/user')
const {registerValidation,loginValidation} = require('../validations')


const router = express.Router()





// REGISTER AN USER
router.post('/register',async (req,res)=>{
    
    // LETS VALIDATE THE DATA BEFORE WE CREATE A USER
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    // CHECKING IF USER IS ALREADY IN THE DATABASE
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exist')

    // HASHING PASSWORD
    const salt  = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)

    // CREATE A NEW USER
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.status(200).send(savedUser);
        console.log('user registered')
    }catch(error){
        res.status(400).send(error);
    }
});


router.post('/login',async (req,res)=>{

    // LETS VALIDATE THE DATA BEFORE WE LOGIN A USER
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    // CHECKING IF USER EXIST IN THE DATABASE
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email is not found')

    // IF PASSWORD CORRECT OR NOT
    const validPass = await bcrypt.compareSync(req.body.password, user.password)
    if (!validPass) return res.status(400).send('invalid password')
     
    const access_token = jwt.sign({ _id: user._id},process.env.TOKEN_SECRET)
    // res.header('auth-token',token).send(access_token)

    
    console.log("Access Token:" + access_token);
    res.status(200).json({access_token})
    // res.send('successfully login!')

})

module.exports = router;