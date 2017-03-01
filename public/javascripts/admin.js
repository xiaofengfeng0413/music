// $(function(){
// 	$('#wangyi').blur(function(){
// 		var wangyi = $(this)
// 		var id = wangyi.val()
// 		if(id){
// 			$.ajax({
// 			type: 'get',
// 			// url:'http://music.163.com/api/song/detail?ids=%5B' + id + '%5D',
// 			url:'https://api.douban.com/v2/book/'+id,
// 			dataType: 'jsonp',
// 			jsonp: 'callback',
// 			crossDomain: true,
// 			cache: true,
// 			success: function(json){
// 				alert(json.title)
// 				// alert('111111')
// 				 //var songs = JSON.parse(json);
// 				 //alert(songs.songs.name)
// 				// console.log(songs)
// 				// $('#inputTitle').val(songs.name)
// 				// $('#inputMusicer').val(songs.artists[0].name)
// 				// $('#inputFlash').val(songs.mp3Url)
// 			}
			
// 		  })
// 		}
// 	})
// })
