var User = require('../models/user')
var Talk = require('../models/talk')
var Talk_Comment = require('../models/talk_comment')
var formidable = require('formidable');

exports.detail = function(req,res){
	//console.log(req.params.id)
	var id = req.params.id
	console.log(id)
	User.findOne({_id:id})
		.populate('concerns','name _id')
		.exec(function(err, user){
		console.log(user)
		Talk.find({author: user._id})
		.populate({
			path: 'talk_comments',
			select: '_id  from reply content',
			model: 'Talk_Comment',
			populate: {
				path: 'from reply',
				select: 'name',
				model: 'User',
			}
			
		})
		.sort({createAt: -1})
		.exec(function(err,talks){
				console.log(talks)
				if(err){
					console.log(err)
				}
				res.render('page/talk',{
					talks: talks,
					person: user
				})
			})
	})
	
}
exports.save = function(req, res){
	var userId = req.body.user
	var content = req.body.content

	var talk = new Talk({
		author: userId,
		content: content
	})

	//将id转化为name属性
	//  User.findById(userId, function(err, user){
	//     Talk
	//       .find({author: userId})
	//       .populate('author', 'name')
	//       .exec(function(err, talks){ 
	//       	var name = talks[0].author.name
	//    });			      
	// })
	// console.log('我的名字是name'+name)



	talk.save(function(err,comment){
		if(err){
			console.log(err)
		}
		User.findById(userId, function(err, user){
		    Talk
		      .find({author: userId})
		      .populate('author', '_id name')
		      .exec(function(err, talks){ 
		      	//console.log('talks[0].author.name:'+talks[0].author.name)
		      		return res.json({
					'status': '2',
					'talkId': talk._id,
					'userId': talks[0].author._id,
					'userName': talks[0].author.name,
					'content': talk.content
				})
		   });			      
		})
		
	})
}

//用户头像上传
exports.upload = function(req, res){
  AVATAR_UPLOAD_FOLDER = '/upload/head'
  var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';    //设置编辑
    form.uploadDir = 'public'+AVATAR_UPLOAD_FOLDER; //设置上传目录
    form.keepExtensions = true;  //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
    //console.log(form)
     //console.log('1111111111111111')
    form.parse(req, function(err, fields, files) {
     //console.log('1111111111111111')
   //  console.log('fields'+fields)
    // console.log('files'+files[user])
    if (err) {
      console.log('上传出错')
      res.redirect('/');
      return;   
    }  
    //console.log(name)
    var extName = '';  //后缀名
    var urls = []
    for(var key in files){
      var file = files[key];
      switch (file.type) {
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

      //var avatarName = Math.random() + '.' + extName;
      //var newPath = form.uploadDir + avatarName;

      //console.log('newPath'+newPath);
      var usefulPath = file.path.substring(6)
      urls.push(usefulPath);
      console.log('file.path  '+file.path)
      //fs.renameSync(file.path, newPath);  //重命名
      }
    res.send(urls[0]);
  });
}

exports.head = function(req, res){
	var id = req.body.user.id
	var head = req.body.user.head
	User.update({_id: id},{
		$set: {head: head}
	},function(err){
		if(err){
			console.log(err)
			return
		}
		console.log("更新成功")
	})
	console.log('1111111111111'+id)
	User.findById(id, function(err, user){
		
		Talk.find({author: user._id})
		.populate({
			path: 'talk_comments',
			select: '_id  from reply content',
			model: 'Talk_Comment',
			populate: {
				path: 'from reply',
				select: 'name',
				medel: 'User'
			}
			
		})
		.sort({createAt: -1})
		.exec(function(err,talks){
				console.log(talks)
				console.log(user)
				if(err){
					console.log(err)
				}
				res.redirect('/user/'+id)
			})
	})
}