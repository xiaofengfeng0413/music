var Geetest = require('geetest/gt-sdk'); //验证码
// var _ = require('underscore')
var User = require('../models/user')

var pcGeetest = new Geetest({
    geetest_id: '15ebc381da1a7736f00d807a244f9388',
    geetest_key: '1ce10f316cfca06d373b25ee3a265a6b'
});

//show signup
exports.showSignup = function(req, res){
  res.render('page/signup',{
    title: '注册界面',
  })
}

//signup注册
exports.signup = function(req,res){
    var _user = req.body.user
    
    User.findOne({name: _user.name}, function(err,user){
      if(err){
        console.log(err)
      }
      if(user){
        return res.redirect('/signin')
      }
      else{
        var user = new User({
         name: _user.name,
         password: _user.password 
        })
        user.save(function(err,user){
          if(err){
            console.log(err)
           }
           res.redirect('/');
            //console.log(user)
          })
        }
    })
}


//show signin
exports.showSignin = function(req, res){
  res.render('page/signin',{
    title: '登录界面',
  })
}

//sign in登录
exports.signin = function(req,res){
  var _user = req.body.user
  var name = _user.name
  var password = _user.password
  // var name = req.body.username
  // var password = req.body.password



 // pcGeetest.validate({

 //        challenge: req.body.geetest_challenge,
 //        validate: req.body.geetest_validate,
 //        seccode: req.body.geetest_seccode

 //    }, function (err, result) {
 //        if (err || !result) {
 //            res.send("<h1 style='text-align: center'>登陆失败</h1>");
 //        } else {
 //            res.send("<h1 style='text-align: center'>登陆成功</h1>");
 //        }
 //    });




  console.log(name)
  console.log(password)
  User.findOne({name: name}, function(err, user) {
    console.log(user)
    if(err){
      console.log(err)
    }
    if(!user){
      //return res.json({success:true});
       return res.redirect('/signin')
    }
    user.comparePassword(password,function(err, isMatch){
      console.log(password)
      if(err){
        console.log(err)
      }

      if(isMatch) {
        req.session.user = user
        console.log('password is match')
        return res.redirect("/")
      }
      else{
        //return res.json({success:false});
        console.log('password is wrong')
        return res.redirect("/signin")
        
      }
    })
  })
}

//ajax sign in登录
exports.ajax_signin = function(req,res){
  // var _user = req.body.user
  // var name = _user.name
  // var password = _user.password
  var name = req.body.username
  var password = req.body.password
  console.log('name '+name)
  console.log('passsword '+password)
  User.findOne({name: name}, function(err, user) {
    console.log('这是user'+user)
    if(err){
      console.log(err)
    }
    if(!user){
      return res.json({'status':'1'});
    }
    user.comparePassword(password,function(err, isMatch){
      console.log(password)
      if(err){
        console.log(err)
      }

      if(isMatch) {
        req.session.user = user
        console.log('password is match')
        return res.json({'status':'2'});
      }
    })
  })
}

//logout登出
exports.logout = function(req,res) {

  delete req.session.user
  res.redirect('/')
}


//用户列表

exports.list = function(req, res, next) {
  User.fetch(function(err, users){
    if(err){
      console.log(err)
    }
    res.render('page/userlist', {
     title: '疯音 用户列表页',
     users: users
    });
  })

  // res.render('page/list', { title: '疯音 列表页' });
}

//权限判断
//midware for user
exports.signinRequired = function(req, res, next) {
  var user = req.session.user

  if(!user) {
    return res.redirect('/signin')
  }
  next()
}

exports.adminRequired = function(req, res, next) {
  var user = req.session.user

  if(user.role <= 10) {
    
    return res.redirect('/signin')
  }
  next()
}

exports.concern = function(req, res){
    var user = req.body.user
    var person = req.body.person
        console.log(person)
    User.findOne({_id: user})
    .exec(function(err,people){
    people.concerns.push(person)  
    people.save(function(err){})
  //   User.findById(user,function(err,people){
  //     if(err){
  //       console.log(err)
  //     }
  //   //console.log('people是'+people)
  //   //console.log('talk是'+talk.talk_comments.length)
  //   people.concerns.push(person)  
  //   people.save(function(err){})
  // })
  
    })
    return res.json({
      'status': '2'
      })
}
