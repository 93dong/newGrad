/**
 * Created by Administrator on 2017/2/12.
 */
$(document).ready(function(){
  $(".mcont").load("per_vip.html",function(){
    vipshow();
    vipreview();
  });
  var user = main_getLoginUserFromCookie();
  if( user == null ){
    main_toLoginThenToBeforePage( location.href );
    return;
  }
  var sessionid = user.sessionid;

  var days;

  if(user.img!=""){
    $(".pheadp").attr("src",E_URL+"/script/userimg/"+user.img+"?"+Math.random());
  }else{
    $(".pheadp").attr("src",E_URL+"/script/tu/user.jpg");
  }
  $(".phead h1").html(user.name);


  //会员中心
  function vipshow(){
    $(".viptips span").html(user.outdays);
    $(".mchead h1 a").click(function(){
      var viphref=E_URL +"/web/buy_vip.html";
      $(this).attr("href",viphref);
    });
    //会员中心切换到会员激活
    $(".jihcard>a").click(function(){
      $(".pnbcont li").removeClass("cur").find("p:contains('会员激活')").parent().addClass('cur');
      $(".mcont").load("per_activate.html",function(){
        activate();
      });
    });
  }
  //会员中心页的最近浏览
  function vipreview(){
    $.ajax({
      type : "get",
      url :  E_URL + "/brower/getBrowerListNew/"+sessionid,
      async : true,
      dataType : "json",
      success : function(data){
        if(data.result==1){
          num=data.list.length;
          if(num!=0){
            var re=data.list;
            //获取所有列表
            var conText='<ul class="clearfloat">';
            (num>4)?num=4:num;
            for(i=0;i<num;i++){
              if(re[i].book == null){
                continue;
              }
              conText+='<li>'
                +'<a href="../play_new.html?bookId='+re[i].book.id+'&name='+re[i].book.name+'&price='+re[i].book.price+'&dir='+re[i].book.direction+'">'
                +'<img src="../library/tu_new/'+re[i].book.bookImg+'">'
                +'</a>'
                +'<div>'
                +'<p>'+re[i].book.direction+'</p>'
                +'<a href="'+re[i].book.url+'">'
                +'<p>'+re[i].book.name+'</p>'
                +'</a>'
                +'<p>授课教师：'+re[i].book.teacher+'</p>'
                +'</div>'
                +'</li>';
            }
            conText+='</ul>';
            $(".review>div").html(conText);
          }else{
            $(".review>div").html('<div class="ncourse"><h1>欢迎来到达内TMOOC,让我们一起去</h1><a href="'+E_URL+'/web/course_new.html">发现新课程</a></div>');
          }
        }
      },
      error:function(){
        $(".review>div").html('<div class="serror"><h2>服务器异常！请稍后！(*^__^*)</h2></div>');
      }
    });
  }

  $(".pnbcont li").click(function(){
    var num=$(this).index();
    if(num==4){//云笔记
      LoginInote();
      return;
    }
    $(".pnbcont li").removeClass('cur');
    $(this).addClass('cur');
    $(".mcont").html("");
    switch(num){
      case 0://会员中心
        $(".mcont").load("per_vip.html",function(){
          vipshow();
          vipreview();
        });
        break;
      case 1://账号设置
        $(".mcont").load("per_setting.html",function(){
          deulnv();
          $preview = $('#preview-pane');
          $pcnt = $('#preview-pane .preview-container');
          $pimg = $('#preview-pane .preview-container img');
          xsize = $pcnt.width();
          ysize = $pcnt.height();
          getName();
        });
        break;
      case 2://我的课程
        $(".mcont").load("per_class.html",function(){
          loadCourse();
        });
        break;
      case 3://会员激活
        $(".mcont").load("per_activate.html?"+Math.random(),function(){
          activate();
        });
        break;
      /*case 4://大豆兑换
       $(".mcont").load("per_exchange.html");
       break;
       case 5://邀请好友
       $(".mcont").load("per_invitation.html");
       break;*/
      default:
        break;
    }
  });

  //帐号设置层切换函数
  function deulnv(){
    $(".deulnv li").click(function(){
      $(".seting>ul>li").removeClass();
      $(this).addClass('cur');
      var num=$(this).index();
      $(".setcont>div").hide();
      $(".setcont>div").eq(num).show();
    });
  }
  //我的课程加载数据函数
  function loadCourse(){
    var list0=E_URL + "/livevideo/myLiveVideo/"+sessionid;	//直播课程,get
    var list1=E_URL + "/book/getStudyBook/"+sessionid;	//正在学习,post
    var list2=E_URL + "/book/getFinishBook/"+sessionid;	//已经学完,post
    var list3=E_URL + "/book/buylist/"+sessionid; //已购课程,post
    var list4=E_URL + "/book/getFavoriteList/"+sessionid; //我的收藏,get
    var list5=E_URL + "/brower/getBrowerListNew/"+sessionid; //最近浏览,get

    liveClass(list0);

    $(".deulnv li").click(function(){
      $(".mmyclass>ul>li").removeClass();
      $(this).addClass('cur');
      var num=$(this).index();

      switch(num){
        case 0:		//get 直播课程
          liveClass(list0);
          break;
        case 1:		//post 正在学习
          firstClass(list1);
          break;
        case 2:		//post 已经学完
          firstClass(list2);
          break;
        case 3:		//post  已购课程
          firstClass(list3);
          break;
        case 4:		//get 我的收藏
          loadContent(num,list4);
          break;
        case 5:		//get 最近浏览
          loadContent(num,list5)
          break;
      }

    });
  }

  //加载正在学习，已经学习，已购课程
  function firstClass(list){
    $(".mmccont").html('<div class="loading"><h2><img src="../../script/images_new/loading.gif" alt="">页面正在加载请稍后！</h2></div>');
    $.ajax({
      type: "post",
      url: list,
      async: true,
      dataType: "json",
      success: function(data){
        if(data.result==1){
          var num=data.list.length;
          if(num!=0){
            var re=data.list;
            var conText='<div class="hcourse"><ul class="clearfloat">';
            for(i=0;i<num;i++){
              if(re[i] == null){
                continue;
              }
              conText+='<li>'
                +'<a href="../play_new.html?bookId='+re[i].id+'&name='+re[i].name+'&price='+re[i].price+'&dir='+re[i].direction+'">'
                +'<img src="../library/tu_new/'+re[i].bookImg+'">'
                +'</a>'
                +'<div>'
                +'<p>'+re[i].direction+'</p>'
                +'<a href="'+re[i].url+'">'
                +'<p>'+re[i].name+'</p>'
                +'</a>'
                +'<p>授课教师：'+re[i].teacher+'</p>'
                +'</div>'
                +'</li>';
            }
            conText+='</ul></div>';
            $(".mmccont").html(conText);
          }else{
            $(".mmccont").html('<div class="ncourse"><h1>欢迎来到达内TMOOC,让我们一起去</h1><a href="'+E_URL+'/web/course_new.html">发现新课程</a></div>');
          }
        }
      },
      error:function(){
        $(".mmccont").html('<div class="serror"><h2>服务器异常！请稍后！(*^__^*)</h2></div>');
      }
    });
  }

  //加载课程函数
  function loadContent(num,list){
    $(".mmccont").html('<div class="loading"><h2><img src="../../script/images_new/loading.gif" alt="">页面正在加载请稍后！</h2></div>');
    $.ajax({
      type : "get",
      url :  list,
      async : true,
      dataType : "json",
      success : function(data){
        if(data.result==1){
          num=data.list.length;
          if(num!=0){
            var re=data.list;
            //获取所有列表
            var conText='<div class="hcourse"><ul class="clearfloat">';
            for(i=0;i<num;i++){
              if(re[i].book == null){
                continue;
              }
              conText+='<li>'
                +'<a href="../play_new.html?bookId='+re[i].book.id+'&name='+re[i].book.name+'&price='+re[i].book.price+'&dir='+re[i].book.direction+'">'
                +'<img src="../library/tu_new/'+re[i].book.bookImg+'">'
                +'</a>'
                +'<div>'
                +'<p>'+re[i].book.direction+'</p>'
                +'<a href="'+re[i].book.url+'">'
                +'<p>'+re[i].book.name+'</p>'
                +'</a>'
                +'<p>授课教师：'+re[i].book.teacher+'</p>'
                +'</div>'
                +'</li>';
            }
            conText+='</ul></div>';
            $(".mmccont").html(conText);
          }else{
            $(".mmccont").html('<div class="ncourse"><h1>欢迎来到达内TMOOC,让我们一起去</h1><a href="'+E_URL+'/web/course_new.html">发现新课程</a></div>');
          }
        }else{
          $(".mmccont").html(data.message);
        }
      },
      error:function(){
        $(".mmccont").html('<div class="serror"><h2>服务器异常！请稍后！(*^__^*)</h2></div>');
      }
    });
  }

  //加载直播课程
  function liveClass(list){
    $(".mmccont").html('<div class="loading"><h2><img src="../../script/images_new/loading.gif" alt="">页面正在加载请稍后！</h2></div>');
    $.ajax({
      type : "get",
      url :  list,
      async : true,
      dataType : "json",
      success : function(data){
        if(data.result==1){
          num=data.list.length;
          if(num!=0){
            var re=data.list;
            //获取所有列表
            var conText='<div class="hcourse"><ul class="clearfloat">';
            for(i=0;i<num;i++){
              if(re[i]==null){
                continue;
              }
              if(re[i].status==1 || re[i].status==2){
                conText+='<li>'
                  +'<a href=../live/live_intro.html?classId='+re[i].number+'>'
                  +'<img src="'+re[i].pictureUrl+'">'
                  +'<span class="hint">'+re[i].startDate+'</span>'
                  +'</a>'
                  +'<div>'
                  +'<p>'+re[i].liveDirection+'</p>'
                  +'<a href=../live/live_intro.html?classId='+re[i].number+'>'
                  +'<p>'+re[i].liveName+'</p>'
                  +'</a>'
                  +'<p>授课教师：'+re[i].teacher+'</p>'
                  +'</div>'
                  +'</li>';
              }
            }
            conText+='</ul></div>';
            $(".mmccont").html(conText);
          }else{
            $(".mmccont").html('<div class="ncourse"><h1>欢迎来到达内TMOOC,让我们一起去</h1><a href="'+E_URL+'/web/live/live.html">发现新课程</a></div>');
          }
        }
      },
      error:function(){
        $(".mmccont").html('<div class="serror"><h2>服务器异常！请稍后！(*^__^*)</h2></div>');
      }
    });
  }

  //修改密码-获取信息
  function getName(){
    $("#info_loginname").html("");
    $.ajax({
      type: "post",
      url: E_URL+"/login/hadlogin/"+user.sessionid,
      dataType: "json",
      data:{
        type:'mess'
      },
      success: function (data) {
        if( data.result == 1 ){
          var b_user = data.user ;
          $("#info_loginname").html(b_user.login_name);
        } else {
          main_toLoginThenToBeforePage(location.href);
        }
      }
    });
    $("#editpassword").click(function(){
      enchange();
    });
  }

  //确认修改
  var enchange=function(){
    if(checkName()&&checkPwd()){
      changName();
      changPass();
      return;
    }else if(checkName()){
      changName();
      return;
    }else if(checkPwd()){
      $("#new_name").next("em").hide();
      changPass();
      return;
    }

  };

//	var enchange=function(){
//		if(checkName()){
//			changName();
//			return;
//		}else if(checkPwd()){
//			$("#new_name").next("em").hide();
//			changPass();
//			return;
//		}else if(checkName()&&checkName()){
//			changName();
//			changPass();
//			return;
//		}
//
//	};

  //修改用户名
  var changName=function(){
    var nname=$.trim($("#new_name").val());
    $.ajax({
      type : "post",
      url : E_URL+ "/user/update/"+ user.sessionid,
      dataType : "json",
      data : {
        type : "name",
        value : nname
      },
      success : function(data) {
        if (data.result == 1) {
          main_update_NickName(nname);
          $("#new_name").next("em").css("color","#2ecc71").html("<span></span>修改成功").find("span").addClass("suc");
          var user = main_getLoginUserFromCookie();
          $(".phead>h1").text(user.name);
        } else if (data.result == 2) {//验证没有过
          modalDialog(data.mess);
        } else {
          main_toLoginThenToBeforePage(location.href);
        }
      }
    });
  };

  //修改密码
  function changPass(){
    if(user.loginname.match(/^P#tarena_[a-zA-Z0-9]{3,4}[\d]{4}_[\w]+@tarena.com.cn$/) || user.loginname.match(/^P#[a-zA-Z0-9]{3,4}[\d]{4}_[\w]+@tarena.com.cn$/)){
      if(!user.loginname.match(/^P#[a-zA-Z0-9]{3,4}[\d]{4}_t@tarena.com.cn$/)){
        $("#new_pw").next("em").html("<span></span>此帐号不可以改密码").addClass("err");
        return;
      }
    }
    $.ajax({
      type: "post",
      url: E_URL+"/user/updatepassword/"+user.sessionid,
      dataType: "json",
      data:{
        oldpassword:MD5($.trim($("#old_pw").val())),
        newpassword:MD5($.trim($("#new_pw").val()))
      },
      success: function (data) {
        if( data.result == 1 ){
          $("#old_pw").val("");
          $("#new_pw").val("");
          $("#new_pw2").val("");
          $("#new_pw2").next("em").css("color","#2ecc71").html("<span></span>修改成功").find("span").addClass("suc");
        } else {
          $("#old_pw").next("em").html("<span></span>"+data.mess).find("span").addClass("err");
        }
      }
    });
  }

  //验证名称
  var regName = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
  var checkName=function(){
    var regname=$("#new_name").val();
    var infortips=$("#new_name").next("em");
    if(regname.length==0){
      infortips.html("<span></span>用户名长度不能为空").find("span").addClass("err");
      return false;
    }else if(!regName.test(regname)){
      infortips.html("<span></span>由汉字、字母、数字和下划线组成").find("span").addClass("err");
      return false;
    }else if(regname.length<2 || regname.length>10){
      infortips.html("<span></span>长度为2至10个字符").find("span").addClass("err");
      return false;
    }else{
      return true;
    }
  };

  //验证密码
  function checkPwd(){
    $("#old_pw").next("em").text("");
    $("#new_pw").next("em").text("");
    $("#new_pw2").next("em").text("");
    if($("#old_pw").val().length < 6 || $("#old_pw").val().length > 50){
      $("#old_pw").next("em").html("<span></span>密码长度为6至50个字符").find("span").addClass("err");
      return false;
    }
    if($("#new_pw").val().length < 6 || $("#new_pw").val().length > 50){
      $("#new_pw").next("em").html("<span></span>密码长度为6至50个字符").find("span").addClass("err");
      return false;
    }
    if($("#new_pw2").val().length < 6 || $("#new_pw2").val().length > 50){
      $("#new_pw2").next("em").html("<span></span>密码长度为6至50个字符").find("span").addClass("err");
      return false;
    }
    if( $("#new_pw2").val() != $("#new_pw").val() ){
      $("#new_pw2").next("em").html("<span></span>两次密码不一致").find("span").addClass("err");
      return false;
    }
    if( $("#new_pw2").val() == $("#old_pw").val() ){
      $("#new_pw2").next("em").html("<span></span>新旧密码一致").find("span").addClass("err");
      return false;
    }
    return true ;
  }

  //会员卡激活
  function activate(){
    $("#ttscardKey").blur(checkCK);//验证卡号格式
    $("#ttscardpwd").blur(checkPWD);//验证激活码是否为空

    $("#ttscheckcard").click(function(){
      if (checkCK() || checkPWD()){
        return;
      }

      var cardkey = $.trim($("#ttscardKey").val());
      var cardpwd = $.trim($("#ttscardpwd").val());
      var email=user.loginname.split("#")[1];//获取登录名
      //请求数据
      $.post(E_URL+ "/o2o/check/"+ sessionid,
        {
          "o2o" : cardkey,
          "pwd" : cardpwd,
          "email" : email
        },
        function(data) {

          if (data.result == 1) {
            var cardtype = data.mess;
            var v2 = cardtype.split("-")[1];
            if (/^day-.*$/.test(cardtype)) {
              if (v2 == 30) {
                cardtype = "TMOOC 包月卡";
              } else if (v2 == 180) {
                cardtype = "达内在读学员VIP卡";
              } else if (v2 == 365) {
                cardtype = "TMOOC 包年卡";
              }
            }
            if (/^o2o-.*$/.test(cardtype)) {
              cardtype = "职业课程卡 - "+ v2;
            }
            days=v2;
            $("#ttscardname").html(cardtype);
            $("#ttsuseremail").html(email);
            $("#ac1").hide();
            $("#ac2").show();
          } else {
            switch (data.mess) {
              case "101":
                $("#ac1").append('<li style="color:#f30;">用户名错误！</li>');
                break;
              case "102":
                $("#ttscardpwd").next().html('<span class="err"></span>激活码错误');
                break;
              case "103":
                $("#ttscardKey").next().html('<span class="err"></span>此卡无效');
                break;
              case 500:
                $("#ac1").append('<li id="systemerror" style="color:#f30;">系统繁忙中...</li>');
                break;
            }
          }
        }, "json");

    });
    $("#ttsactiveCard").click(function() {
      var cardkey = $.trim($("#ttscardKey").val());
      var cardpwd = $.trim($("#ttscardpwd").val());
      var email=user.loginname.split("#")[1];//获取登录名
      $.post(E_URL + "/o2o/active/" + sessionid,
        {
          "cardkey" : cardkey,
          "passwd" : cardpwd,
          "email" : email
        },
        function(data) {
          if (data.result == 1) {
            if(days != 0){
              user.outdays = eval(user.outdays + "+" + days);
              user.vip = user.outdays > 365 ? 3 : 1;
              udpateuser(user);
            }
            $("#ac2").hide();
            $("#ac3").show();
          } else {

          }
        }, "json");
    });
    $("#backedit").click(function(){
      $("#ac1").show();
      $("#ac2").hide();
    });
    $("#backac").click(function(){
      $(".mcont").load("per_activate.html?random="+Math.random(),function(){
        activate();
      });

    });
    //卡号格式验证
    function checkCK(){
      var keyreg = /^([0-9A-Z]{5}-){4}[0-9A-Z]{5}$/;
      var cardkey =$.trim($("#ttscardKey").val());
      if(cardkey.length==0){
        $("#ttscardKey").next().html('<span class="err"></span>卡号不能为空');
        return true;
      }else if(!keyreg.test(cardkey)){
        $("#ttscardKey").next().html('<span class="err"></span>卡号格式不正确');
        return true;
      }else{
        $("#ttscardKey").next().html('<span class="suc"></span>');
        return false;
      }
    }
    //激活码格式验证
    function checkPWD(){
      var cardpwd = $.trim($("#ttscardpwd").val());
      if (cardpwd.length == 0) {
        $("#ttscardpwd").next().html('<span class="err"></span>激活码不能为空');
        return true;
      } else {
        $("#ttscardpwd").next().html('<span class="suc"></span>');
        return false;
      }
    }
    //复选框是否选中
    $('#ttscheck_card').click(function(){
      if($(this).is(':checked')){
        $('#ttscheckcard').removeAttr('disabled');
        $('#ttscheckcard').addClass('enactivte');
      }else{
        $('#ttscheckcard').attr('disabled','disabled').removeClass();
      }
    });

  }
});

//修改头像
var jcrop_api, boundx,  boundy, $preview, $pcnt, $pimg, xsize, ysize;
var fileNames;
function doUpload() {
  var user = main_getLoginUserFromCookie();
  if( user == null ){
    main_toLoginThenToBeforePage( location.href );
  }
  // 上传方法
  $.upload({
    // 上传地址
    url: E_URL+'/user/upload/'+user.sessionid,
    // 文件域名字
    fileName: 'file',
    // 其他表单数据
    // 上传完成后, 返回json, text
    dataType: 'json',
    // 上传之前回调,return true表示可继续上传
    onSend: function() {
      return true;
    },
    //提交之前 检测
    onSubmit:function(){
      var obj = document.getElementById("uploadfiles");
      if(obj.value.match(/^.*\.(jpg)|(png)$/)<=0){
        $(".addimg").css("color","#d40207");
        return false;
      }
      if(obj.files[0].size>(1024*1024)){
        $(".addimg").css("color","#d40207");
        return false;
      }
      return true;
    },
    // 上传之后回调
    onComplate: function(data) {
      fileNames = data.mess;
      var urls = E_URL+"/script/userimg/cache/"+data.mess+"?"+Math.random();
      $('.cacheimg img').attr("src",urls);
      var pic_real_height = 0,pic_real_width=0;
      $("<img/>")
        .attr("src", urls)
        .load(function() {
          pic_real_width = this.width;
          pic_real_height = this.height;
          var hi;
          if(pic_real_width>pic_real_height){
            hi = 305/pic_real_width*pic_real_height;
            $('.cacheimg img').height(hi);
          }else{
            hi = (305/pic_real_height)*pic_real_width;
            $('.cacheimg img').width(hi);
          }
          //$('#preview-pane .preview-container img').attr("src",urls);
          $pimg.attr("src",E_URL+"/script/userimg/cache/"+fileNames+"?"+Math.random());
          $(".cacheimg").show();
          $("#jcropdiv").children("p,input").hide();
          $(".reimg").show();
          initJcrop(pic_real_width>pic_real_height,hi);
        });
    }
  });
}
function updatePreview(c){
  if (parseInt(c.w) > 0){
    var rx = xsize / c.w;
    var ry = ysize / c.h;
    $pimg.css({
      width: Math.round(rx * boundx) + 'px',
      height: Math.round(ry * boundy) + 'px',
      marginLeft: '-' + Math.round(rx * c.x) + 'px',
      marginTop: '-' + Math.round(ry * c.y) + 'px'
    });
  }
};
function initJcrop(he,num){
  $('.cacheimg img').Jcrop({
    onChange: updatePreview,
    onSelect: updatePreview,
    aspectRatio: xsize / ysize,
  },function(){
    var bounds = this.getBounds();
    boundx = bounds[0];
    boundy = bounds[1];
    jcrop_api = this;
    $preview.appendTo(jcrop_api.ui.holder);
  });
  jcrop_api.animateTo([50,50,200,200]);
  //jcrop_api.setOptions({allowSelect:false});
};
function queren(){
  var user = main_getLoginUserFromCookie();
  if( user == null ){
    main_toLoginThenToBeforePage( location.href );
  }
  jcrop_api.getWidgetSize();
  var sx = jcrop_api.tellSelect().x;
  var sy = jcrop_api.tellSelect().y;
  //计算相对坐标
  var pic_real_width;
  $("<img/>") // Make in memory copy of image to avoid css issues
    .attr("src", $(".cacheimg>img").attr("src"))
    .load(function() {
      pic_real_width = this.width;   // Note: $(this).width() will not
      pic_real_height = this.height; // work for in memory images.
      //获得选框宽度
      var cwidth = jcrop_api.tellScaled().w;
      var scale = (305/pic_real_width)*(150/cwidth);
      //计算比例
      $.post(E_URL+"/user/cimg/"+user.sessionid,{
        "x":Math.floor(sx*(150/cwidth)),
        "y":Math.floor(sy*(150/cwidth)),
        "fname":fileNames,
        "scale":scale,
      },function(data){
        if(data.result==1){
          var user = main_getLoginUserFromCookie();
          user.img = data.mess;
          loadimg(data.mess);
          udpateuser(user);
          reimgp();
          closeMessBox();
        }else{
          modalDialog("系统错误!");
        }
      },"json");
    });
}
function loadimg(name) {
  var urls = E_URL + "/script/userimg/" + name + '?' + Math.random();
  $.ajax({
    url : urls,
    type : "GET",
    success : function() {//能请求到资源
      $(".pheadp").attr("src", urls);
      $(".logined>a>img").attr("src", urls);
    },
    error : function() {//不能请求到资源
    }
  });
}
//重新加载头像页面
function reimgp(){
  var nhtmlp=
    '<div class="imgleft" id="jcropdiv">'
    +'<div class="cacheimg" style="display: none;">'
    +'<img src="" alt="">'
    +'</div>'
    +'<p class="addimg">只支持JPG、PNG，大小不超过1M</p>'
    +'<input type="button" value="选择本地图片" onclick="doUpload()"/>'
    +'<input class="reimg" type="button" value="更换图片" onclick="reimgp()" style="display: none;"/>'
    +'</div>'
    +'<div class="imgright">'
    +'<div class="previewimg">'
    +'</div>'
    +'<p>头像预览</p>'
    +'<input type="button" value="确认上传头像" onclick="queren()"/>'
    +'</div>';
  $(".setimg").html(nhtmlp);
}

//我的云笔记
function LoginInote(){
  var user = main_getLoginUserFromCookie();
  var w=window.open();
  if( user == null ){
    main_toLoginThenToBeforePage( location.href );
  }
  $.ajax({
    type: "post",
    url: E_URL+"/login/hadlogin/"+user.sessionid,
    dataType: "json",
    success: function (data) {
      if( data.result == 1 ){
        w.location=( Y_URL+"/login/loginnow?sessionId="+encodeURI(data.sid) );
      } else {
        main_toLoginThenToBeforePage(location.href);
      }
    }
  });
}