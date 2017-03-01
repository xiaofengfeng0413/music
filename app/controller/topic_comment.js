var Topic = require("../models/topic")
var Topic_Comment = require("../models/topic_comment")

exports.comment = function(req, res){
	var topic = req.body.topic,
	   	content = req.body.content,
	   	from = req.body.from
	var topic_comment = new Topic_Comment({
		topic: topic,
		content: content,
		from: from
	})
	topic_comment.save(function(err,topic_comment){
		if(err){
			console.log(err)
		}
		console.log(topic_comment._id)
		Topic_Comment
			.find({_id: topic_comment._id})
			.populate('from','_id name')
			.exec(function(err, comment){
				console.log(comment)
				//console.log('111111111111'+comments.from.name)
				return res.json({
					'status': '2',
					'userName': comment[0].from.name,
					'content': topic_comment.content
				})
			})
	})
}