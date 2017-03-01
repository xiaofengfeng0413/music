var Talk_Comment = require('../models/talk_comment')
var Talk = require('../models/talk')

exports.talk_comment = function(req,res){
	var talkId = req.body.talk;
	var userId = req.body.user;
	var content = req.body.content;

	var talk_comment = new Talk_Comment({
		talk: talkId,
		from: userId,
		content: content
	})

	//console.log('talk_comment的id是' +talk_comment._id)
	//将评论内容加入到说说中
	Talk.findById(talkId,function(err,talk){
		//console.log('talk是'+talk)
		console.log('talk是'+talk.talk_comments.length)
		talk.talk_comments.push(talk_comment._id)  
		talk.save(function(err){})
	})

	talk_comment.save(function(err,talk_comment){
		if(err){
			console.log(err)
		}
		Talk_Comment
			.find({_id: talk_comment._id})
			.populate('from', '_id name')
			.exec(function(err, talk_comments){//这部分我也没懂，但是却实现了，有点BUG
					//console.log('talk_comment.from._id'+talk_comment.from._id)
					//console.log('talk_comments'+talk_comments)
					console.log(talk_comment.from.name)
					return res.json({
					'status': '2',
					'talkId': talk_comment.talk,
					'userId': talk_comment.from,
					'userName' :talk_comments[0].from.name,
					'content': talk_comment.content 
				})
			})
		
	})
}