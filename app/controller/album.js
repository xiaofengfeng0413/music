var Music = require('../models/music')
var Category = require('../models/category')

exports.detail = function(req, res){
	var id = req.params.id
	console.log('id是'+id)
	Music.find({category: id}, function(err,musics){
   		res.render('page/album',{
   			musics: musics
   		})
	})
}

exports.all = function(req, res){
	Category.fetch(function(err, categories){
    if(err){
      console.log(err)
    }
    res.render('page/album_all', {
     categories: categories
    });
  })
}