var Music = require('../models/music')
var Category = require('../models/category')
var Comment = require('../models/comment')
var _ = require('underscore')


//list页面
exports.list = function(req, res, next) {
  Music.fetch(function(err, musics){
    if(err){
      console.log(err)
    }
    res.render('page/musiclist', {
     title: '疯音 列表页',
     musics: musics
    });
  })
}



//细节页

exports.detail = function(req, res, next) {
  
  var id = req.params.id
  console.log(id)
  Music.findById(id, function(err, music){
    Comment
      .find({music: id})
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')
      .exec(function(err, comments){
      //console.log(comments)
      res.render('page/detail', {
      title: '疯音 '+ music.title ,
      music: music,
      comments: comments
    })
   });
  })
}

//更新音乐
exports.update = function(req, res){
  var id = req.params.id

  if(id){

    Music.findById(id, function(err, music){
      Category.find({}, function(err, categories) {
        res.render('page/admin',{
          title: '疯音 后台更新页',
          music: music,
          categories: categories
        })
      })
    })
  }
}

//后台录入电影界面
exports.new = function(req, res, next) {
  Category.find({},function(err,categories) {
    res.render('page/admin', { title: '疯音 后台录入页',
      categories: categories,
      music: {
          title: '',
          musicer: '',
          country: '',
          year: '',
          poster: '',
          flash: '',
          summary: '',
          language: ''
        }
    });
  })
  
}


//后台录入 post来的数据进行保存
exports.save = function(req, res){
  //console.log(req.body.music)
  var id = req.body.music._id
  var musicObj = req.body.music
  console.log(musicObj.category)
  var _music

  if(id){
    Music.findById(id, function(err, music){
      if(err){
        console.log(err)
      }
      _music = _.extend(music, musicObj)
      _music.save(function(err, music){
        if(err){
          console.log(err)
        }
        res.redirect('/music/'+music._id)
      })
    })
  }
  else{
    _music = new Music(musicObj)
    var categoryId = _music.category
    _music.save(function(err, music){
       if(err){
          console.log(err)
        }

        Category.findById(categoryId, function(err,category) {
          category.musics.push(music._id)

          category.save(function(err, category) {
            console.log(music._id)
            res.redirect('/music/'+music._id)
          })
        })

        
        
    })
  }
}

//删除

exports.del = function(req, res) {
  var id =req.query.id

  if(id) {
    Music.remove({_id: id}, function(err, movie) {
      if(err){
        console.log(err)
        res.json({success: 0})
      }
      else{
        res.json({success: 1})
      }
    })
  }
}


