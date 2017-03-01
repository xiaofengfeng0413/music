var Topic = require("../models/topic")
var formidable = require('formidable');
var Topic_Comment = require('../models/topic_comment')
var fs = require('fs');

exports.index = function(req, res){
	// Topic.fetch(function(err,topics){
	// 	if(err){
	// 		console.log(err)
	// 	}
	// 	res.render('page/topic',{
	// 		topics:topics
	// 	})
	// })
	Topic.find({})
	.sort({createAt: 1})
	.exec(function(err, topics){
		if(err){
			console.log(err)
		}
		res.render('page/topic',{
			topics: topics
		})
	})
}

exports.save = function(req,res){
	var topicObj = req.body.topic
	var topic = new Topic(topicObj)
	topic.save(function(err,topic){
		res.redirect('/topic')
	})
}

exports.detail = function(req, res){
	var id = req.params.id
	Topic.findById(id, function(err,topic){
		if(err){
			console.log(err)
		}
		Topic_Comment
			.find({topic: id})
			.populate('from','name')
			.exec(function(err,topic_comments){
				console.log(topic_comments)
				console.log(topic)
				res.render('page/topic_detail',{
					topic: topic,
					topic_comments: topic_comments
				})
			})
	})
}

exports.upload = function(req, res){
	AVATAR_UPLOAD_FOLDER = '/upload/topic'
	var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'public'+AVATAR_UPLOAD_FOLDER; //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    console.log(form)
     console.log('1111111111111111')

    form.parse(req, function(err, fields, files) {
  	 console.log('1111111111111111')
   //  console.log('fields'+fields)
   //  console.log('files'+files)
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