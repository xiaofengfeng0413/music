var Music = require('../models/music')
var Category = require('../models/category')
var User = require('../models/user')

exports.intro = function(req,res){
    res.render('page/intro')
}
exports.index = function(req, res) {
  // console.log('user in session: ')
   //console.log(req.session.user)
   //var userName = req.session.user
   //console.log("userName"+userName)
   //User.find({name: userName}, function(err, user){
       Category
        .find({})
        .exec(function(err, categories){
          // console.log("长度"+user.length)
          // console.log(user)
          console.log(categories)
          if(err){
          console.log(err)
        }
          res.render('page/index', {
          categories: categories,
          // user: user
        })
      })
   //})
  // user = req.s
  // User.findById()
 
}