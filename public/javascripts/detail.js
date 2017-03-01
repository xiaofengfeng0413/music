$(function(){
	var talk_count = 0; //用户计数器
	var comment_count=0;//用户计数器。
	var talk_comment_count = 0;//用户计数器

	$('.comment').click(function(e){
		var target = $(this)
		var toId = target.data('tid')
		var commentId = target.data('cid')
		//alert($('#comment_music').val())
		if($('#toId').length > 0){
			$('#toId').val(toId)
		}
		else{
			$('<input>').attr({
				type: 'hidden',
				id: 'toId',
				name: 'comment[tid]',
				value: toId

			}).appendTo('#commentForm')

			
		}
		if($('#commentId').length > 0){
			$('#commentId').val(commentId)
		}
		else{
			$('<input>').attr({
				type: 'hidden',
				id: 'commentId',
				name: 'comment[cid]',
				value: commentId

			}).appendTo('#commentForm')
		}
		

	})
	//ajax登录
	$('#ajax_signin').click(function(){
		var ajax_signin = $.ajax({
			data:{
					username:$('#signinName_ajax').val(),
					password:$('#signinPassword_ajax').val()
				},
			url:'/user/ajax_signin',
			type:'post',
			dataType:'json',
			success:function(data){
				//alert(data.status)			
				if(data.status==2){
					console.log('我被执行了')
					return window.location='/'
				}
				if(data.status==1){
					//alert(ajax_signin)
					$('#signinName_ajax').val('')
					$('#signinPassword_ajax').val('')
					ajax_signin.abort();
					return $('#text').text('用户名或密码错误')
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
    				alert('error ' + textStatus + " " + errorThrown);  
    			}
		})
	})
	//评论ajax
	function comment(){
			
			var data={
						music:$('#comment_music').val(),
						user:$('#comment_from').val(),
						content:$('#comment_content').val(),
						toId:$('#toId').val(),
						commentId:$('#commentId').val()
					}
			alert('data'+data.music)
			var music = $('#comment_music').val()
			//alert(music)
			$.ajax({
				data:data,
				url:'/user/comment',
				type:'post',
				dataType:'json',
				success:function(data){
					// alert(data.commentId)
					// alert(data.fromId)
					// alert(data.fromName)
					// alert(data.content)
					// alert(data.status)
					if(data.status == 2){
		                var html = $("<li class='media'><div class='pull-left'><a class='comment'id='count' href='comments' data-cid=data.commentId, data-tid=data.fromId><img class='media-object' src='../../../images/head.jpg' style='width:64px; height:64px;'></a></div><div class='media-body'><h4 class='media-heading'>data.fromName</h4><p>data.content</p></div></li>")
		                $('.media-list').append(html)
		                comment_count++;

		                $('#count').attr('id',comment_count)
		                $('#'+comment_count).attr('data-cid',data.commentId)
		                $('#'+comment_count).attr('data-tid',data.fromId)
		                $('#'+comment_count).parent('.pull-left').next().find('h4').text(data.fromName)
		                $('#'+comment_count).parent('.pull-left').next().find('p').text(data.content)
		                // alert($('#count'))
		                //alert($('.comment').attr('data-cid').length)
					}
				}
			})
		
		//$('#commentForm').attr('name')
	}
	$('#ajax_comment').click(comment)//调用评论ajax



//说说评论ajax
$('.ajax_talk_comment').click(talk_comment)
function talk_comment(){
	//alert($(this).parent('.form-group').parent('from').find('.talk_comment_talk').length)
	var talkValue = $(this).parent().parent().find('.talk_comment_talk').val()
	var userValue = $(this).parent().parent().find('.talk_comment_from').val()
	var contentValue = $(this).parent().find('.talk_comment_content').val()
	var data = {
			//music:$('#comment_music').val(),
			talk: talkValue,
			user: userValue,
			content: contentValue,
			// toId:$('#toId').val(),
			// commentId:$('#commentId').val()
	}
	// alert(111)
	// alert(data.talk)
	// alert(data.user)
	// alert(data.content)
	$.ajax({
		data: data,
		url: '/user/talk/comment',
		type: 'post',
		dataType: 'json',
		success: function(data){
			if(data.status == '2'){
				var html = $("<li class='media pt15'><div class='pull-left'><a class='comment'id='talk_comment_count' href='comments' data-cid=data.commentId, data-tid=data.fromId><img class='media-object' src='../../../images/head.jpg' style='width:64px; height:64px;'></a></div><div class='media-body'><a class='media-heading'>data.fromName</a><p>data.content</p></div></li>")
				//alert(111)
				if($('#'+data.talkId)){
					// alert(1111)
					 //alert('data.talkId'+data.talkId)
					$('#'+data.talkId).find('ul').append(html)//给每一个说说加了一个id
				}
				talk_comment_count++;
				// alert('data.userId'+data.userId)
				// alert('data.userName'+data.userName)

				$('#talk_comment_count').attr('id','talk_comment_count'+talk_comment_count)
				$('#talk_comment_count'+talk_comment_count).parent('.pull-left').next().find('a').text(data.userName)
				$('#talk_comment_count'+talk_comment_count).parent('.pull-left').next().find('p').text(data.content)
				//$('#talk_comment_content'+talk_comment_count).before(html)
				 //alert(data.content+'11111')
				 //$('#talk_comment_count').attr('id','talk_comment_count'+talk_comment_count)
				//$('#talk_comment_count'+talk_comment_count).text(data.content)


			}
		}
	})
}
//说说ajax
	function talk(){
		
		var data = {
			user: $('#talk_user').val(),
			content: $('#talk_content').val()
		}
		
		$.ajax({
			data: data,
			url: '/user/talk',
			type: 'post',
			dataType: 'json',
			success: function(data){
				if(data.status=='2'){
					//var html = $("<div class='col-md-12 h' id='talk_count' ></div>")
					var html_comment_on = $("<li class='media'><div class='pull-left'><a class='comment'id='talk_count' href='comments' data-cid=data.commentId, data-tid=data.fromId><img class='media-object' src='../../../images/head.jpg' style='width:64px; height:64px;'></a></div><div class='media-body'><h4 class='media-heading'>data.fromName</h4><p>data.content</p></div><div class='panel panel-default'><div class='panel-heading'><h3>热门评论</h3></div><div class='panel-body' id='talk_id'><ul class='media-list col-md-12'></ul></div></div></li>")
					var html_comment_to = $("<div id='comments' class='col-md-12'><form id='commentForm' method='post' action='/user/talk/comment'><input id='talk_comment_talk' type='hidden' name='talk_comment[talk]' value='#{talk._id}'/><input id='talk_comment_from' type='hidden' name='talk_comment[from]' value='#{user._id}'/><div class='form-group'><textarea class='talk_comment_content col-md-12' name='talk_comment[content]' row='3' class='form-control'></textarea><button class='ajax_talk_comment btn btn-primary pull-right' type='button' >评论  </button></div></form></div>")
					$('#talk_list').children('ul').append(html_comment_on)
					talk_count++
					$('#talk_count').attr('id',talk_count)//给id重新赋值，因为新添加的元素我识别对象赋值

					// alert(data.userId)
					// alert(data.content)

					$('#talk_id').attr('id',data.talkId)

					//$('#'+talk_count).append(html_comment_on)
					$('#'+talk_count).parent('.pull-left').next().find('h4').text(data.userName)
					$('#'+talk_count).parent('.pull-left').next().find('p').text(data.content)

					$('#'+talk_count).parent('.pull-left').parent('.media').append(html_comment_to)

					$('#talk_comment_talk').attr('id','talk_comment_talk'+data.talkId)//唯一标识
					$('#talk_comment_from').attr('id','talk_comment_from'+data.userId)//唯一标识

					//如果有评论通过class找到
					$('#talk_comment_talk'+data.talkId).attr('class','talk_comment_talk')
					$('#talk_comment_talk'+data.talkId).next().attr('class','talk_comment_from')//防止一个用户多个评论进行重叠
					//$('#talk_comment_from'+data.userId).attr('class','talk_comment_from')

					$('#talk_comment_talk'+data.talkId).val(data.talkId)//赋值talkid，方便之后评论获取值
					$('#talk_comment_talk'+data.talkId).next().val(data.userId)


					//$('#talk_comment_from'+data.userId).val(data.userId)//赋值用户id，方便之后用户评论

					$('.ajax_talk_comment').click(talk_comment)//激活评论
				}
			}
		})
	}

	$('#ajax_talk').click(talk)
// $('#ajax_talk').click(function(){
// 		var talk_count=0;//用户计数器。
// 		alert($('#talk_content').val())
// 		var data={
// 				user:$('#talk_user').val(),
// 				content:$('#talk_content').val()
// 		}
// 		$.ajax({
// 			data:data,
// 			url:'/user/talk',
// 			type:'post',
// 			dataType:'json',
// 			success:function(data){
// 				if(data.status=='2'){
					
// 				}
// 			}
// 		})
// 	})



//ajax_category_upload 专辑页内图片上传
	$('#ajax_category_upload').click(function(){
	// alert($('#category_upload_name').val())
	var filename = $('#category_upload_name').val()
	var data = new FormData();
	var files = $('#category_upload_name')[0].files;
	if(files){
　　　　　　data.append("file", files[0]);
        }

	$.ajax({
		data: data,
		url: '/category/upload',
		type: 'post',
		async: false,
        cache: false,
        contentType: false,
        processData: false,
		success: function(data){
			// alert(data)
			var img = $("<div class='col-md-5' ><img id='preview'class='w'src=''/ ><div>")
			$('#category_upload').append(img)
			$('#preview').attr('src',data)
			$('#inputCategoryPic').val(data)
		}

	})
})

	//ajax_category_upload 话题页内图片上传
	$('#ajax_topic_upload').click(function(){
	// alert($('#topic_upload_name').val())
	var filename = $('#topic_upload_name').val()
	var data = new FormData();
	var files = $('#topic_upload_name')[0].files;
	if(files){
　　　　　　data.append("file", files[0]);
        }
    // alert(data)

	$.ajax({
		data: data,
		url: '/topic/upload',
		type: 'post',
		async: false,
        cache: false,
        contentType: false,
        processData: false,
		success: function(data){
			// alert('data'+data)
			var img = $("<div class='col-md-5' ><img id='preview'class='w'src=''/ ><div>")
			$('#topic_upload').append(img)
			$('#preview').attr('src',data)
			$('#inputTopicPic').val(data)
		}

	})
})

//话题评论功能
   $('#ajax_topic_comment').click(function(){
   		//alert(1111111)
   		var data = {
   			topic: $('#comment_topic').val(),
   			content: $('#topic_comment_content').val(),
   			from: $('#comment_topic_from').val()
   		}
   		$.ajax({
   			data:data,
   			url: '/topic/comment',
   			type: 'post',
   			dataType: 'json',
   			success: function(data){
				 if(data.status == '2'){
				 	//alert(data.userName)
	                var html = $("<li class='media'><div class='pull-left'><a class='comment'id='count' href='comments' data-cid=data.commentId, data-tid=data.fromId><img class='media-object' src='../../../images/head.jpg' style='width:64px; height:64px;'></a></div><div class='media-body'><a class='media-heading'>data.fromName</a><p>data.content</p></div></li>")
	                $('.media-list').append(html)
	                comment_count++;

	                $('#count').attr('id',comment_count)
	                // $('#'+comment_count).attr('data-cid',data.commentId)
	                // $('#'+comment_count).attr('data-tid',data.fromId)
	                $('#'+comment_count).parent('.pull-left').next().find('a').text(data.userName)
	                $('#'+comment_count).parent('.pull-left').next().find('p').text(data.content)
	                // alert($('#count'))
	                //alert($('.comment').attr('data-cid').length)
				}
			}
   		})
   })	
//加入关注ajax

	$('#ajax_concern').click(function(){
		var data = {
				person: $('#concernPerson').val(),
				user: $('#concernUser').val()
		}
		$.ajax({
			data: data,
			url:'/user/concern',
			type: 'post',
			dataType: 'json',
			success: function(data){
				if(data.status == '2'){
					//alert(111111)
					$('#ajax_concern').text('已关注')
					//$('#ajax_concern').click() = null;
				}
			}
		})
	})

//头像上传
	$('#ajax_head_upload').click(function(){
		var filename = $('#head_upload_name').val()
		var data = new FormData();
		var files = $('#head_upload_name')[0].files;
		if(files){
	　　　　　　data.append("file", files[0]);
	        }

		$.ajax({
			data: data,
			url: '/head/upload',
			type: 'post',
			async: false,
	        cache: false,
	        contentType: false,
	        processData: false,
			success: function(data){
				// alert(data)
				var img = $("<div class='col-md-5' ><img id='preview'class='w'src=''/ ><div>")
				$('#head_upload_prev').append(img)
				$('#preview').attr('src',data)
				$('#head_upload_head').val(data)
			}

		})
	})
	//获取窗口大小并给予首页的第一张大图
	var HEIGHT = $(window).height()
	var WIDTH = $(window).width()
	$("#page_head_img").height(HEIGHT)
	$('.img_scale.transition').hover().css('rotate','1.1')
//index 大头子居中
	var TextWidth = $('#index_head_text').width()
	var Txet_OffsetLeft =(parseInt(WIDTH)-parseInt(TextWidth))/2
	$('#index_head_text').css('left',Txet_OffsetLeft+'px')

// index主页向下滚动和居中
	var DownWidth = $('#page_head_down').width()
	var Down_OffsetLeft =(parseInt(WIDTH)-parseInt(DownWidth))/2
	$('#page_head_down').css('left',Down_OffsetLeft+'px')
	$('#page_head_down').click(function(){
		$('html,body').animate({scrollTop: HEIGHT+'px'}, 800); 
	})
// 音乐背景墙
    $('#radio_bg').height(HEIGHT)
    $('#radio_bg').width(WIDTH)


    //验证码
    // var handlerEmbed = function (captchaObj) {
    //     $("#embed-submit").click(function (e) {
    //         var validate = captchaObj.getValidate();
    //         if (!validate) {
    //             $("#notice")[0].className = "show";
    //             setTimeout(function () {
    //                 $("#notice")[0].className = "hide";
    //             }, 2000);
    //             e.preventDefault();
    //         }
    //     });
    //     // 将验证码加到id为captcha的元素里，同时会有三个input的值：geetest_challenge, geetest_validate, geetest_seccode
    //     captchaObj.appendTo("#embed-captcha");
    //     captchaObj.onReady(function () {
    //         $("#wait")[0].className = "hide";
    //     });
    //     // 更c多接口参考：http://www.geetest.om/install/sections/idx-client-sdk.html
    // };
    // alert(11111111)
    // $.ajax({
    //     // 获取id，challenge，success（是否启用failback）
    //     //检测极验服务器是否宕机，一般不需要关注
    //             // 更多配置参数请参见：http://www.geeteurl: "/pc-geetest/register?t=" + (new Date()).getTime(), // 加随机数防止缓存
    //     type: "get",
    //     dataType: "json",
    //     success: function (data) {
    //         // 使用initGeetest接口
    //         // 参数1：配置参数
    //         // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
    //         initGeetest({
    //             gt: data.gt,
    //             challenge: data.challenge,
    //             product: "embed", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
    //             offline: !data.success // 表示用户后台st.com/install/sections/idx-client-sdk.html#config
    //         }, handlerEmbed);
    //     }
    // });

})



