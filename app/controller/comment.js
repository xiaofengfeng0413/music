var Comment = require('../models/comment')
var Music = require('../models/music')

//comment
exports.save = function(req, res) {
	//var _comment = req.body.comment
	var musicId = req.body.music
	var userId = req.body.user//评价用户
	var content = req.body.content
	var toId = req.body.toId
	var cId = req.body.commentId




	
	if(cId){
		Comment.findById(cId, function(err, comment){

			var reply = {
				from: userId,
				to: toId,
				content: content
			}
			comment.reply.push(reply)

			console.log('aaaa'+comment)
			
			comment.save(function(err, comment){
				if(err) {
					console.log(err)
				}

				//res.redirect('/music/'+musicId)
				 return res.json({'status':'1'})			
			})
		})
	}

	else{
		var comment = new Comment({
			 music: musicId,
			 from: userId,//评价用户
			 content: content
		})


		comment.save(function(err,comment) {
			if(err) {
				console.log(err)
			}
			//res.redirect('/music/'+musicId)
			 return res.json({'status':'2',
			 	'commentId':comment._id,
			 	'fromId':comment.from,
			 	// 'fromName':comment.from.name,
			 	'fromName':'',
			 	'content':comment.content})
		})
			
	}
	// if(_comment.cid){
	// 	Comment.findById(_comment.cid, function(err, comment){

	// 		var reply = {
	// 			from: _comment.from,
	// 			to: _comment.tid,
	// 			content: _comment.content
	// 		}
	// 		comment.reply.push(reply)

	// 		console.log(comment)
			
	// 		comment.save(function(err, comment){
	// 			if(err) {
	// 				console.log(err)
	// 			}

	// 			res.redirect('/music/'+musicId)				
	// 		})
	// 	})
	// }

	// else{
	// 	var comment = new Comment(_comment)


	// 	comment.save(function(err,comment) {
	// 		if(err) {
	// 			console.log(err)
	// 		}

	// 		res.redirect('/music/'+musicId)
	// 	})
			
	// }

}