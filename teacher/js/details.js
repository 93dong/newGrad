/*-----------------------------------------------------------------------------页面载入--------*/
/*
	fadeOut([speed],[easing],[fn])
	通过不透明度的变化来实现所有匹配元素的淡出效果，并在动画完成后可选地触发一个回调函数。这个动画只调整元素的不透明度，也就是说所有匹配的元素的高度和宽度不会发生变化。
	speed[,fn]Number/String,FunctionV1.0speed:三种预定速度之一的字符串("slow","normal", or "fast")或表示动画时长的毫秒数值(如：1000)
	fn:在动画完成时执行的函数，每个元素执行一次。
	[speed],[easing],[fn]Number/String,String,FunctionV1.4.3speed:三种预定速度之一的字符串			           ("slow","normal", or "fast")或表示动画时长的毫秒数值(如：1000)
	easing:(Optional) 用来指定切换效果，默认是"swing"，可用参数"linear"
	fn:在动画完成时执行的函数，每个元素执行一次。
*/
	

	$("#msg>ul>li[name]").on("focus",function(txt,msg){
		if (txt.value==msg)
		{
			txt.value="";
		}
	})
/*------------------------------------------------------------------------------文字轮播------*/
	

	/*-----------------------jQuery和CSS3可互动的背景视觉差效果------------*/

	var lFollowX = 0,   //放大0.1 lFollow值控制图片边界 使图片不越界  lFollowX=img.width*0.1
			lFollowY = 0,		//lFollowY=img.height*0.1
			x = 0, //定义x位移量
			y = 0, //定义y位移量
			friction = 1 / 30;   //friction摩擦  减缓位移量增速 偏移更缓和
	function moveBackground() {
		x += (lFollowX - x) * friction;  //(20-0)*1 / 30
		y += (lFollowY - y) * friction;  //(10-0)*1 / 30
		translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';//scale  缩放

		$('#trans').css({
			'-webit-transform': translate,
			'-moz-transform': translate,
			'transform': translate
		});

		window.requestAnimationFrame(moveBackground);  //frame 架构   渲染->使动画更自然
	}

	$(window).on('mousemove click', function(e) {
		//e.clientX 鼠标所在位置据window左上角的水平距离x值
		//e.clientY 鼠标所在位置据window左上角的垂直距离y值
		//$(window).width() / 2 - e.clientX  max:720  min:-719 
		//控制出发位移方位范围 即在水表
		var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));  //max:100 min:-100 
		var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));  //max:100 min:-100
		lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow   max:20 min:-20 
		lFollowY = (10 * lMouseY) / 100;
	});
moveBackground();