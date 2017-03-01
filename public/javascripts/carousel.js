$(function(){
	var WEIGHT = $(window).width()
	var imgs = $('#carousel_gallery').get(0)
	 //alert(parseInt(5*WEIGHT))
	//alert(WEIGHT)
	// var btn = $('.carousel_btn').get()
	// alert(btn[1].hasClass('btn'))
	$('#carousel_gallery').css('left',parseInt('-'+WEIGHT))
	var btn = $('.carousel_btn').get()
	var count=0;
	var timer;
	var interval=3000;
	var animated = false;
	function move(offset){
		animated = true;
		var time = 1000;
        var inteval = 20;
        var speed = offset/(time/inteval);
		var left=parseInt(imgs.style.left)+offset;
		var animate=function(){
			var WEIGHT = $(window).width()
		if ( (speed > 0 && parseInt(imgs.style.left) < left) || (speed < 0 && parseInt(imgs.style.left) > left)) {
                    imgs.style.left = parseInt(imgs.style.left) + speed + 'px';
                    setTimeout(animate, inteval);
                }else{
                	imgs.style.left = left+'px';
                	if(parseInt(left) > parseInt('-'+WEIGHT)){
					imgs.style.left = parseInt('-'+WEIGHT*4)+"px";
						
					}
					if(parseInt(left) < parseInt('-'+WEIGHT*4)){
					imgs.style.left = parseInt('-'+WEIGHT)+"px";
					}
					 animated = false;
                }
			}	
			animate();
	}
	function ifhasClass(dom, className) {
	    className = className.replace(/^\s|\s$/g, "")

	    return (
	        " " + ((dom || {}).className || "").replace(/\s/g, " ") + " "
	    ).indexOf(" " + className + " ") >= 0
	}
	function showbtn(){
		
		for(i=0; i<btn.length ;i++){
			//alert(typeof btn[i])
			if(ifhasClass(btn[i],'on')){
				btn[i].className='carousel_btn btn';
			}
				
		}
		//alert(count)
		btn[count].className += ' on';
	}
	$('#prev').click(function(){
		var WEIGHT = $(window).width()
		if (animated) {
              return;
            }
		move(WEIGHT);
		if(count==0){
			count=3;
		}
		else
			count--;
		showbtn();
	})
	$('#next').click(function(){
		var WEIGHT = $(window).width()
		if (animated) {
              return;
            }
		move(parseInt('-'+WEIGHT));
		if(count==3){
			count=0;
		}
		else
			count++;
		showbtn();
	})
	function nextFunction(){
		var WEIGHT = $(window).width()
		if (animated) {
              return;
            }
		move(parseInt('-'+WEIGHT));
		if(count==3){
			count=0;
		}
		else
			count++;
		showbtn();
	}
	//按钮
	for (var i = 0; i < btn.length; i++) {
		btn[i].id=i;
		var WEIGHT = $(window).width()
		btn[i].onclick=function(){
			if (animated) {
                        return;
                    }
			if(this.className=='on'){
			return;
			}
			index = this.id;
			var offset=parseInt('-'+WEIGHT)*(index-count);
			//alert(offset)
			imgs.style.left = offset+parseInt(imgs.style.left)+'px';
			count=index;
			showbtn();
		}	
		
	}
	function play() {
                timer = setInterval(function () {
                    $('#next').click()
                }, interval);
            }
    function stop() {
                clearInterval(timer);
            }

     imgs.onmouseover = stop;
     imgs.onmouseout = play;
 		play();

})