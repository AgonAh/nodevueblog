const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Users = require('./../../models/Users');
const bcrypt = require('bcryptjs');
const passport=require('passport');
const flash = require('express-flash');
//const session = require('express-session');
const session = require('cookie-sessions');
const cookieparser = require('cookie-parser');
const cors = require('cors');
//const app = require('./../../index');
router.use(cors({
    credentials: true,
    origin: "http://localhost:8080"
  }));

router.use(session({
    name: 'blogSession',
    secret: process.env.SESSION_SECRET,
    keys: [process.env.SESSION_SECRET],
    // keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

//-------------------------------------


router.get('/', (req,res)=>{
    Users.find().exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

router.get('/userinfo',checkAuth,(req,res)=>{
    res.status(200).json(req.session.user);
})

// router.get('/posts',  (req,res)=>{
//     // db.student.find({}, {roll:1, _id:0})
//     Users.find({},{posts:1,_id:0}).exec().then(result => {
//         var posts = result;
//         res.status(200).json(result);
//     }).catch(err => {
//         console.log(err);
//         res.status(500)
//         .json({err});
//     });
// });


router.get('/:id',(req,res)=>{
    Users.findById(req.params.id).exec().then(result => { //Or find({_id : req.params.id})
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

router.get('/user/:username',(req,res)=>{
    Users.findOne({username : req.params.username}).exec().then(result => { //Or find({_id : req.params.id})
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

// router.delete('/AUser/:id',(req,res)=>{
//     Users.remove({_id : req.params.id}).then(result => {
//         res.status(200).json(result);
//     });
// });

router.delete('/user',(req,res)=>{
    Users.remove({_id : req.session.user._id}).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/post/:id',(req,res)=>{
    Users.updateMany(
        { },
        { $pull: { posts: { _id : req.params.id}}})
        .then(result => {
        res.status(200).json(result);
    });
})

router.put('/updateUser',(req,res)=>{
    Users.updateOne({_id : req.session.user._id},req.body).exec()
    .then(result => res.status(200).json(result))
    .catch(err=>res.status(500).json({err}))
});

router.post('/addPost',(req,res)=>{
    Users.updateOne({_id:req.session.user._id},{$push : {posts : req.body}}).exec().then(result => {
        res.status(200).json(restult);
    }).catch(err => res.status(500).json(err));
});




//Registration

router.post('/register',async (req,res)=>{
    var user = req.body;
    if(!(user.name && user.username && user.password)){
        return res.status(500).json({err : `Please include all fields`});
        console.log('Please include all fields');
    }
    const hashedPassword = await bcrypt.hash(user.password,10);

    newUser = new Users({
        name : user.name,
        username : user.username,
        password : hashedPassword, //Hash this
        posts : []
    });
    newUser.save().then(result => res.status(200).json(result)).catch(err=>{
        console.log(err);
        return res.status(500).json({err});
    });
});

//Check auth middleware
function checkAuth(req,res,next){
    if(req.session && req.session.user){
        return next();
    }
    else{
        res.status(200).json({msg : 'Not logged in'});
    }
}

module.exports = router;