const express = require('express');
const BookShelf = require('../models/BookShelf')
const User = require('../models/User')
const History = require('../models/History')



// The same as: const checkId = require('../middlewares').checkId
const { isLoggedIn } = require('../middlewares')

const router = express.Router();

// update according user
function updateValue(orgList, cur){
  cur = cur[0].split(",");
  for(var j=0; j < cur.length; j++){
    var flag = 0;
    for(var i = 0; i< orgList.length; i++){
      if(orgList[i] === cur[j]){
        flag = 1;
      }
    }
    if(flag == 0){
      orgList.push(cur[j]);
    }
    else{
      let idx = orgList.indexOf(cur[j]);
      orgList.splice(idx, 1);
      orgList.push(cur[j]);
    }
  }
  var curLenght = orgList.length;
  if(curLenght > 5){
    orgList.splice(0, curLenght-5)
  }

  return orgList;
}


router.use((req, res, next) => {
  console.log('DEBUG routes/bookShelf');
  next()
})

// Route to personal bookshelf
// change by yourself
router.get('/', isLoggedIn, (req, res, next) => {
  
  let id = req.user._id;
  User.findById(id).populate('_booklist')
  .then(user=> res.json(user._booklist))
});

// it could return null for user without history
router.get('/history/', isLoggedIn, (req, res, next) => {
  
  let id =  req.user._id;
  History.findOne({_user:id})
  .then(history=> {
    res.json(history)
  })
  .catch(err => next(err))
});


router.post('/history/', isLoggedIn, (req, res,next)=>{
  let uid = req.user._id;
  let {author, category} = req.body;
  History.findOne({_user:uid}).then(history => {
    if(history !== null){
    let newAuthorL =  updateValue(history.author, author)
    let newCategoryL = updateValue(history.category, category)
    let id = history._id
    History.findByIdAndUpdate(id,{
      $set: {category: newCategoryL,
      author: newAuthorL}
    }).then(history => console.log(history._user))
    return

    } else {
      const newHistory = new History({
        _user:req.user._id,
        category: [category],
        author: [author]
      })

      return newHistory.save()
    }
  })
  .then(newHistory => {
    res.json(newHistory)
  })
  .catch(err => next(err))

})


router.post('/', isLoggedIn, (req, res, next) => {
  let { onlineId, imageUrl, title, author, description, category, buyLink, price } = req.body
  BookShelf.findOne({onlineId:onlineId})
  .then(book => {
    if(book !== null){
      console.log("user_id: ", req.user.id)
      let bookId = book._id;
      console.log("bookId: ", bookId);
      let id = req.user.id;

      User.findByIdAndUpdate(id, {
        $push: {_booklist:bookId}
      }).then(user => console.log("work: ", user._id))
      res.json({success: true })
      return
    } else {
      const newBook = new BookShelf({
        onlineId :onlineId, 
        imageUrl:imageUrl, 
        title:title, 
        author:author, 
        description:description, 
        category:category, 
        buyLink:buyLink, 
        price:price
      })
      let bookId =newBook._id;
      let id = req.user.id;
      User.findByIdAndUpdate(id, {
        isFirstTime:true,
        $push: {_booklist:bookId}
      }).then(user => console.log("work: ", user._id))

      newBook.save()
      .then(newBook => {
        res.json(newBook)
      })
    }
  })
  .catch(err => next(err))
});


router.delete('/:id', isLoggedIn,  (req, res, next) => {
  let bookid = req.params.id;
  let id = req.user.id
  User.findByIdAndUpdate(id, {$pull: {_booklist: bookid}})
  .then(user => {res.json({success: true})})
  
 
})


module.exports = router;