var Category = require('../models/category')
var formidable = require('formidable');
var fs = require('fs');

exports.new = function(req, res) {
	res.render('page/category_admin', {
		title: '疯音后台分类页',
		category: {},
	})
}

exports.save = function(req, res) {
	var categoryObj =req.body.category
	var id = req.body.category._id
	var _category

	console.log("名字"+categoryObj.name)
	if(id){
		Category.findById(id, function(err,category){
			if(err){
				console.log(err)
			}
			 _category = _.extend(category, categoryObj)
			 _category.save(function(err,category){
			 	if (err) {
			 		console.log(err)
			 	}
			 	res.redirect('/category/'+category._id)
			 })
		})
	}else{
		var category = new Category(categoryObj)
		category.save(function(err, category) {
			if(err){
				console.log(err)
			}
			res.redirect('/category/'+category._id)
		})
	}
}

exports.list = function(req, res) {
  Category.fetch(function(err, categories){
    if(err){
      console.log(err)
    }
    res.render('page/categorylist', {
     title: '疯音 分类列表列',
     categories: categories
    });
  })


  // res.render('page/list', { title: '疯音 列表页' });
}

exports.update = function(req, res) {
	var id = req.params.id
	if(id){
		Category.findById(id, function(err, category){
			res.render('page/category_admin',{
				category:category
			})
		})
	}
}




exports.detail = function(req, res){
	var id = req.params.id
	Category.findById(id, function(err,category){
		console.log(category)
		res.render('page/category_detail',{

			category: category,
		})
	})
}


exports.upload = function(req, res){

	AVATAR_UPLOAD_FOLDER = '/upload/album'
	var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'public'+AVATAR_UPLOAD_FOLDER; //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    console.log(form)
     console.log('1111111111111111')

    form.parse(req, function(err, fields, files) {
  	 console.log('1111111111111111')
     console.log('fields'+fields)
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