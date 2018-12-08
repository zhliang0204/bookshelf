const express = require('express');
const User =  require('../models/User');
const{ isLoggedIn } = require('../middlewares')
const router = express.Router();
const parser = require('../configs/cloudinary')
const bcrypt = require("bcrypt")
const bcryptSalt = 10




router.get('/profile', isLoggedIn, (req,res,next) => {
 req.user.password = null
 User.findById(req.user._id)
    .populate('_booklist')
    .then(user =>{
      res.json(user)
    })
});

router.put('/profile', isLoggedIn, (req,res,next)=>{
  let updates = {
    username: req.body.username,
    password: req.body.password,
    // email: req.body.email
  }
  if (req.body.newPassword && req.body.currentPassword && req.body.newPassword !== "") {

    if (!bcrypt.compareSync(req.body.currentPassword, req.user.password)) {
     
      next(new Error("Current password is wrong"))
      return
    }
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(req.body.newPassword, salt)
    updates.password = hashPass
  }
  User.findByIdAndUpdate(req.user._id, updates)
  .then(user => {
    res.json({
      success: true
    })
  })
});


router.post('/favorite', isLoggedIn, (req, res, next) => {
  let id = req.user._id;
  let newlikes = req.body.likes
  User.findOneAndUpdate({_id:id}, {
    likes: newlikes
  }).then(user => res.json({success: true}))
  return
});

router.get('/favorite', isLoggedIn, (req, res, next) => {
  let id = req.user._id;
  User.findById(id)
      .then(user => res.json({success: true,
                              likes: user.likes}))
});

router.post('/pictures', isLoggedIn, parser.single('picture'), (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { pictureUrl: req.file.url})
    .then((user) => {
      console.log(user)
      res.json({
        success: true,
        pictureUrl: req.file.url,
      })
    })
    .catch(err => next(err))
});



module.exports = router;