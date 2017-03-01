var mongoose = require('mongoose')
var Topic_CommentSchema = require('../schemas/topic_comment')
var Topic_Comment = mongoose.model('Topic_Comment',Topic_CommentSchema)

module.exports = Topic_Comment