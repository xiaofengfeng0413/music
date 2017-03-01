window.onload=function(){
	//waterfall('waterFall_main','waterFall_box');
	//json
	var dataInt={"data":[{"src":'../../../images/1.jpg'},{"src":'../../../images/2.jpg'},{"src":'../../../images/2.jpg'},{"src":'../../../images/2.jpg'}]}
	window.onscroll=function(){
		if(checkScrollSlide){
			var oparent=$("#waterFall_main").get(0)
			//将数据快渲染到当前页面尾部
			for (var i = 0; i < dataInt.data.length; i++) {
				var oBox=document.createElement("div");
				oBox.className="waterFall_box";
				oparent.appendChild(oBox);
				var opic=document.createElement('div');
				opic.className='waterFall_pic';
				oBox.appendChild(opic);
				var oimg=document.createElement('img');
				oimg.src=dataInt.data[i].src;
				opic.appendChild(oimg)
				// alert(i)
				if(i == dataInt.data.length-1){
					window.onscroll = function(){
						console.log('到底了')
						return false
					}
				}
			}
			waterfall('waterFall_main','waterFall_box');
		}
		
	}
}

function waterfall(parent,box){
	//将main下所有class为box的元素取出来
	var oparent=$('#'+parent).get(0);
	var oBoxs=getByClass(oparent,box)
	console.log(oBoxs)
	//console.log(oBox.length)
	//计算整个页面的列数（页面宽/box宽）
	var  oBoxW=oBoxs[0].offsetWidth;
	//console.log(oBoxW);
	var clos=Math.floor(document.documentElement.clientWidth/oBoxW)//求列数
	//console.log(clos)
	//设置main的宽
	oparent.style.cssText='width:'+oBoxW*clos+'px; margin :0 auto';
	var hArr=[];//每一列高度的值
	for (var i = 0; i < oBoxs.length; i++) {
		if(i<clos){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH=Math.min.apply(Math,hArr);
			//console.log(minH)
			var index=getMinhIndex(hArr,minH)//索引
			oBoxs[i].style.position="absolute";
			oBoxs[i].style.top=minH+"px";
			oBoxs[i].style.left=oBoxW*index+"px";
			hArr[index]+=oBoxs[i].offsetHeight;//更改数组
		}
	};
	//console.log(hArr)
}
//根据class获取元素
function getByClass(parent,clsName){
	
	var boxArr = new Array//用来存储获取到所有class为box的元素
	oElements = parent.getElementsByTagName('*');//取出所有子元素
	console.log(oElements)
	for (var i = 0; i < oElements.length; i++) {

		if(ifhasClass(oElements[i],clsName))
			boxArr.push(oElements[i]);//取出传过来相等的className
	};
	console.log(boxArr.length)
	return boxArr;
}
function getMinhIndex (arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}
function checkScrollSlide(){//检测是否具备加载数据块的条件
	var oparent=$('#waterFall_main').get(0);
	var oBoxs=getByClass(oparent,'waterFall_box')
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2)
	var  scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var height=document.body.clientHeight||document.documentElement.clientHeight;
	return(lastBoxH<scrollTop+height)?true:false;
}

function ifhasClass(dom, className) {
	    className = className.replace(/^\s|\s$/g, "")

	    return (
	        " " + ((dom || {}).className || "").replace(/\s/g, " ") + " "
	    ).indexOf(" " + className + " ") >= 0
	}