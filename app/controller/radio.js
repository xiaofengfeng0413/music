var Category = require('../models/category')
var Music = require('../models/music')

exports.index = function(req, res){
	Category.find({})
		.exec(function(err,categories){
			Music.find({})
			.sort({createAt: -1})
			.exec(function(err, musics){
				res.render('page/radio',{
				categories: categories,
				musics: musics
				})
			})	
		})
}