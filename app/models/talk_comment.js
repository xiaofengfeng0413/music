var mongoose = require("mongoose")
var Talk_CommentScheam = require("../schemas/talk_comment")
var Talk_Comment = mongoose.model('Talk_Comment',Talk_CommentScheam)

module.exports = Talk_Comment