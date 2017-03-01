var mongoose = require("mongoose")
var Schema = mongoose.Schema
var bcrypt = require("bcrypt")//加密
var SALT_WORK_FACTOR = 10//加密强度
var ObjectId = Schema.Types.ObjectId

var UserSchema = new Schema({
	name:{
		unique:true,
		type:String
	},
	password:{
		unique:true,
		type:String
	},
	//0 nomal user
	//1 verified user
	//2 professonal user
	role: {
		type: Number,
		default: 100
	},
	head: String,
	concerns: [{
		type: ObjectId,
		ref: 'User'
	}],
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

UserSchema.pre('save',function(next){
	var user = this 
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else{
		this.meta.updateAt = Date.now()
	}

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
		if(err) return next(err)

		bcrypt.hash(user.password,salt,null,function(err,hash){
			if(err) return next(err)
			user.password = hash
			next()	
		})
	})//生成盐

})

/*UserSchema.methods = {
	comparePassword: function(_password, cb){
		console.log(_password+"1")
		bcrypt.compare(_password,this.password, function(err, isMatch){
			if(err){
				return cb(err)
			}
			cb(null, isMatch)
		})
	}
}*/
UserSchema.methods.comparePassword = function(_password, cb) {
	console.log(this.password)
    bcrypt.compare(_password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.statics = {
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
module.exports = UserSchema