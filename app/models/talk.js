var mongoose = require("mongoose")
var TalkSchema = require("../schemas/talk")
var Talk = mongoose.model('Talk',TalkSchema)

module.exports = Talk