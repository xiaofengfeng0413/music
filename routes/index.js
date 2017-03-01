var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

var indexCtr = require('../app/controller/index')
var userCtr = require('../app/controller/user')
var musicCtr = require('../app/controller/music')
var commentCtr = require('../app/controller/comment')
var categoryCtr = require('../app/controller/category')
var talkCtr = require('../app/controller/talk')
var talk_commentCtr = require('../app/controller/talk_comment')
var albumCtr = require('../app/controller/album')
var topicCtr = require('../app/controller/topic')
var topicCommentCtr = require('../app/controller/topic_comment')
var radioCtr = require('../app/controller/radio')
var manageCtr = require('../app/controller/manage')


//pre handle user
router.use(function(req, res, next){
  var _user = req.session.user 
  //console.log('11111'+_user.name)
  if(_user){
    res.locals.user = _user//Express 4
  }
    return next()
})

//介绍界面 
router.get('/intro',indexCtr.intro)
/* GET home page. */
router.get('/', indexCtr.index);

//管理员管理信息界面
router.get('/manage',manageCtr.index)

//个人界面
 router.get('/user/:id',talkCtr.detail)
 router.post('/user/talk',talkCtr.save)
 router.post('/user/talk/comment',talk_commentCtr.talk_comment)
 router.post('/head/upload',talkCtr.upload)
 router.post('/user/head/upload', talkCtr.head)

//-------------音乐路由--------------------------------


//list页面
router.get('/admin/musiclist', userCtr.signinRequired, userCtr.adminRequired, musicCtr.list);

//每个音乐细节页
router.get('/music/:id', musicCtr.detail);

//更新音乐, 
router.get('/admin/music/update/:id', userCtr.signinRequired, userCtr.adminRequired, musicCtr.update)

//后台录入页面post的数据
router.post('/admin/music', userCtr.signinRequired, userCtr.adminRequired, musicCtr.save);

//录入音乐
router.get('/admin/music/new', userCtr.signinRequired, userCtr.adminRequired, musicCtr.new)






//-----------------------用户路由---------------------

//signup注册
router.post('/user/signup',userCtr.signup)

//sign in
router.post('/user/signin',userCtr.signin)
//ajax sign in
router.post('/user/ajax_signin',userCtr.ajax_signin)

//logout
router.get('/logout',userCtr.logout)


//list
router.get('/admin/userlist', userCtr.signinRequired, userCtr.adminRequired, userCtr.list);

//show signin
router.get('/signin', userCtr.showSignin)

//show signup
router.get('/signup', userCtr.showSignup)

//加入关注

router.post('/user/concern', userCtr.concern)




//---------------------评论Comment---------------

router.post('/user/comment', userCtr.signinRequired, commentCtr.save)

//---------------------Catetory 分类------------------
//新建分类
router.get('/admin/category/new', userCtr.signinRequired, userCtr.adminRequired, categoryCtr.new)
//存储新建分类和修改新建分类
router.post('/admin/category', userCtr.signinRequired, userCtr.adminRequired, categoryCtr.save)
//分类页面集合
router.get('/admin/categorylist', userCtr.signinRequired, userCtr.adminRequired, categoryCtr.list )
//更新分类
router.get('/category/update/:id', userCtr.signinRequired, userCtr.adminRequired, categoryCtr.update )
//分类详情页
router.get('/category/:id', userCtr.signinRequired, userCtr.adminRequired,categoryCtr.detail);
//分类页上传专辑图片
router.post('/category/upload' ,userCtr.signinRequired, userCtr.adminRequired,categoryCtr.upload)


//--------------上传功能-------------------
router.get('/user/upload', function(req,res){
	res.render('page/upload',{
		title:'上传界面',
	})
})

router.post('/user/upload', function(req,res){
   AVATAR_UPLOAD_FOLDER = '/upload/'
	var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'public'+AVATAR_UPLOAD_FOLDER; //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
    console.log(form)
  form.parse(req, function(err, fields, files) {
   
    if (err) {
      console.log('上传出错')
      res.redirect('/');
      return;		
    }  
     
    var extName = '';  //后缀名
    switch (files.fulAvatar.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;		 
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;		 
    }

    if(extName.length == 0){
        res.locals.error = '只支持png和jpg格式图片';
        res.render('/', { title: TITLE });
        return;				   
    }

    var avatarName = Math.random() + '.' + extName;
    var newPath = form.uploadDir + avatarName;

    console.log(newPath);
    fs.renameSync(files.fulAvatar.path, newPath);  //重命名
  });

  res.redirect('/user/upload');
})



//--------------------------------------------------音频播放界面
// router.get('/album',function(req, res){
//     res.render('page/album')
// })

//播放专辑音乐
router.get('/album/category/:id',albumCtr.detail)






//专辑全部界面
router.get('/album/all',albumCtr.all)


//话题
router.get('/topic',topicCtr.index)
router.get('/topic/:id',topicCtr.detail)
router.post('/topic/upload', topicCtr.upload)
router.post('/topic/launch', topicCtr.save)


//话题评论 
router.post('/topic/comment', userCtr.signinRequired,topicCommentCtr.comment)

//电台功能

router.get('/radio', radioCtr.index)

module.exports = router;