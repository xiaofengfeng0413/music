var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var Topic_CommentSchema = new Schema({
	topic: {
		type: ObjectId,
		ref: 'Talk'
	},
	from: {
		type: ObjectId,
		ref: 'User'
	},
	content: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})
Topic_CommentSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else{
		this.meta.updateAt = Date.now()
	}
	next()
})


Topic_CommentSchema.statics = {
	fetch: function(cb){
		return this
		  .find({})
		  .sort('meta.updateAt')
		  .exec(cb)
	},
	findById: function(id, cb){
	return this
	  .findOne({_id: id})
	  .exec(cb)
	}
}

module.exports = Topic_CommentSchema