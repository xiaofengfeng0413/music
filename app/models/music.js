var mongoose = require('mongoose')
var MusicSchema = require('../schemas/music')
var Music = mongoose.model('Music',MusicSchema)

module.exports = Music