
$('#header').load('data/header.php',function(){
	var fonts=[
		{"i":0,"cnt":"我校坚持以人为本，坚持科学发展观，在领域内，坚持实事求是，不虚假，不做作。"}
	];
	var fChange={
		INTERVAL:50000,//定时器时间
		WAIT:2000,//一次性定时器的时间
		LIWIDTH:0,//Li的宽
		timer:null,//定时器序号
		$UL:null,//ul
		init(){
			this.$UL=$("#change>ul");
			this.LIWIDTH=parseFloat($("#change").css("width"));//1300
			this.updateView();
			this.autoMove();
		},
		autoMove(){
			var timer=setTimeout(this.Move.bind(this),this.WAIT);
		},
		Move(){
			clearTimeout(this.timer);
			this.timer=null;
			this.$UL.animate({left:-1*this.LIWIDTH},this.INTERVAL,function(){
				fonts=fonts.concat(fonts.splice(0,1));
				this.updateView();
				this.$UL.css("left",this.LIWIDTH);
				this.autoMove();
			}.bind(this));
		},
		updateView(){
			for (var i=0,lis="";i<fonts.length;i++)
			{
				lis+=`<li>${fonts[i].cnt}</li>`
			}
			this.$UL.html(lis).css("width",this.LIWIDTH*fonts.length);
		}
	}
	fChange.init();
	$('.quit').on('click',function(e){
		e.preventDefault();
		$.ajax({
			url:'data/clearsession.php?state=1',
			success:function(data){
				if (data.code==1){

					location.href='login.html';
				}
			}
		});

	});
	$('.user').on('click','a',function(e){
		e.preventDefault();
		switch($(this).attr('href')){
			case 'login':location.href='login.html';break;
			case 'register':location.href='register.html';break;
		}
	});
	window.sessionStorage['loginName']=$('.sessionData').attr("data-name");
	window.sessionStorage['teacherId']=$('.sessionData').attr("data-teacherid");
	window.sessionStorage['uPower']=$('.sessionData').attr("data-upower");
	window.sessionStorage['loginPwd']=$('.sessionData').attr("data-pwd");
	$(".sessionData").remove();
});
$(".navigation").load('data/left.php');
$('#footer').load('data/footer.php');
