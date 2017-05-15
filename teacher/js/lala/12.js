var url  = location.href;
var E_URL= url.substring(0,url.length-url.replace(/^http:\/\/[A-Za-z\.:0-9]*/,"").length);
if(E_URL.indexOf("localhost")>-1||E_URL.indexOf("tarena.com.cn")>-1){
  E_URL=E_URL+"/elearning";
}
//云笔记的URL
//var Y_URL = "http://inote.tmooc.cn" ;
var Y_URL = "http://inote.tmooc.cn" ;

//题海的URL
var QS_URL="http://qsserver.tmooc.cn/qsserver";
//跳转考试的URL
var QS_EXAM_url=QS_URL+"/rest/attendExam";
// 认证考试列表
var QS_RENZHENG_EXAM_url=QS_URL+"/web/examList.html";
var QS_RENZHENG_EXAM_url2=QS_URL+"/web/examList_.html";

//TTS的URL
//var TTS_URL="http://tts8.tarena.com.cn";
var TTS_URL="http://tts8.tmooc.cn";
var TTS_MYTTS_url = TTS_URL+"/user/myTTS";

var FLUME_URL="http://123.59.57.104:5140";

//CC视频参数 CC_PLAYERID（播放器样式） CC_UID（用户ID）
// liao
var CC_UID = "0DD1F081022C163E";
var CC_PLAYERID = "C550161F45FAA381";
// hanxl
//var CC_UID = "C9B64FC6B11AB7BA";
//var CC_PLAYERID = "F04C096F7B41247E";

console.log("欢迎! 使用 TMOOC ! 想看文档,注册登录即可观看!");
console.log("欢迎! 使用 TMOOC ! 想看文档,注册登录即可观看!");
console.log("欢迎! 使用 TMOOC ! 想看文档,注册登录即可观看!");
console.log("欢迎! 使用 TMOOC ! 想看文档,注册登录即可观看!");

$(document).ready(function() {
  var page = main_getEleHref(location.href) ;
  var beforepage = main_getEleHref(document.referrer) ;
  var user = main_getLoginUserFromCookie();
  var loginname="";
  if( user !=null ) loginname=user.loginname ;
  $.ajax({
    type:"post",
    url: E_URL+"/log",
    cache:false,
    async:false, //false=异步 true=同步
    dataType: "json",
    data:{
      loginname:loginname,
      beforepage:beforepage.length == 0 ? "/":beforepage,
      page:page.length == 0 ? "/":page,
      ietype:main_getOs()
    }
  });
  $(".goumai").click(function(){
    var o2o = $(this).attr("title");
    location.href=E_URL+"/web/pay/o2opay.html?o2o=" + o2o;
  });
});
function main_getOs(){
  if(navigator.userAgent.indexOf("MSIE")>0) return "MSIE";
  if(isFirefox=navigator.userAgent.indexOf("Firefox")>0) return "Firefox";
  if(isSafari=navigator.userAgent.indexOf("Safari")>0) return "Safari";
  if(isCamino=navigator.userAgent.indexOf("Camino")>0) return "Camino";
  if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0) return "Gecko";
  return "other";
}
function main_getEleHref( href ){
  if( href.indexOf("?")>0 ){
    href = href.substring( 0 ,href.indexOf("?") );
  }
  if( href.indexOf(E_URL) == 0 ){
    href = href.substr( E_URL.length );
  }
  return href ;
}
function locationToHref( href ){
  location.href= E_URL+ href ;
}
/**
 * 跳转到登录页面
 * tohref：登录成功后，跳转的页面
 */
function main_toLoginThenToBeforePage( tohref ){
  $.cookie("sessionid",null);
  $.cookie("beforePage",tohref ) ;
  location.href = E_URL +"/web/login_new.html" ;
}
function main_loginToIndex(){
  if( $.cookie("beforePage") !=null && $.cookie("beforePage").length>0 ){
    var login_to_page = $.cookie("beforePage");
    $.cookie("beforePage",null);
    if(login_to_page=="school"){
      location.href="http://zjhy-dhkj.tmooc.cn/web/school/zjhy-dhkj/index.html";
    }else{
      location.href = login_to_page ;
    }

  } else {
    location.href = E_URL +"/web/index_new.html" ;
  }
}
function main_update_user_outdays( iuser ){
  if(iuser==null) return;
  var sessionid = $.cookie("sessionid");
  if( sessionid == null || sessionid.length<1 ) return ;
  var user = main_getLoginUserFromCookie();
  var newsessionid = user.sessionid+"|"+user.loginname+"|"+user.name+"|"+user.istts+"|"+iuser.outdays + "|" + user.sex +"|"+user.img +"|"+iuser.vip+"|"+ user.graduatetime +"|"+ user.isupdatepwd;
  $.cookie('sessionid',newsessionid,{ expires: 1,path:'/'  });
}

function udpateuser(user){
  var newsessionid = user.sessionid+"|"+user.loginname+"|"+user.name+"|"+user.istts+"|"+user.outdays + "|" + user.sex +"|"+user.img+"|"+user.vip +"|"+ user.graduatetime  +"|"+ user.isupdatepwd;
  $.cookie('sessionid',newsessionid,{ expires: 1,path:'/' });
}
function main_getLoginUserFromCookie(){
  var sessionid = $.cookie("sessionid");
  if( sessionid == null || sessionid.length<1 ) return null ;
  var user = new Object() ;
  var str = new Array();
  str = sessionid.split("|");
  /**
   * sessionid|Login_name|Name|Is_tts|OutDays|sex|img|vip|graduatetime|isupdatepwd
   **/
  user.sessionid = str[0] ;
  user.loginname=str[1];
  user.name = str[2];
  user.istts= str[3];
  user.outdays = str[4] ;
  user.sex = str[5];
  user.img = str[6];
  user.vip = str[7];
  user.graduatetime=parseInt(str[8])+185*24*60*60*1000
  user.isupdatepwd=str[9];
  if(user.outdays>0&&user.vip==0){
    updateVIPIMG(user);
  }
  return user ;
}
function updateVIPIMG(user){
  $.post(E_URL+"/user/uvip/"+user.sessionid,null,function(data){
    user.vip = data.vip;
    udpateuser(user);
  },'json');
}
/*
 *提示操作成功
 *
 */
function show_success(dom,s){
  dom.html(s);
  dom.fadeIn(1000);
  setTimeout(function(){dom.fadeOut(1000);},1000);
}
/*
 *页面的搜索 日志
 */
function search_log( searchText ){
  //记录日志
  var user = main_getLoginUserFromCookie();
  var loginname="";
  if( user !=null ) loginname=user.loginname ;
  $.ajax({
    type:"post",
    url: E_URL+"/log/searchlog",
    cache:false,
    async:false, //false=异步 true=同步
    dataType: "json",
    data:{
      loginname:loginname,
      text:searchText
    }
  });
}
/*
 *字符数组去重，大小写不敏感
 * 返回的是小写字符数组
 */
function main_stringunique(arr) {
  var ret = [];
  var hash = {};
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i].toLocaleLowerCase();
    if (hash[item] !== 1) {
      ret.push(item);
      hash[item] = 1;
    }
  }
  return ret;
}
/*
 *字符数组去重
 * 返回的是去重字符数组
 */
function main_arrayunique(arr) {
  var ret = [];
  var hash = {};
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    if (hash[item] !== 1) {
      ret.push(item);
      hash[item] = 1;
    }
  }
  return ret;
}
//时间转换格式
function main_dateformat(time, format){
  if( format == null || format.length<1) format="yyyy-MM-dd";
  var t = new Date(time);
  var tf = function(i){return (i < 10 ? '0' : '') + i;};
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
    switch(a){
      case 'yyyy':
        return tf(t.getFullYear());
        break;
      case 'MM':
        return tf(t.getMonth() + 1);
        break;
      case 'mm':
        return tf(t.getMinutes());
        break;
      case 'dd':
        return tf(t.getDate());
        break;
      case 'HH':
        return tf(t.getHours());
        break;
      case 'ss':
        return tf(t.getSeconds());
        break;
    }
  });
}
function def_img(jqc){
  var user = main_getLoginUserFromCookie();
  var url;
  url = E_URL+"/script/images/"+"personal_boy_head.png";
  if( user != null ){
    if(user.img!=null&&user.img.length>0&&user.img!="undefined"){
      url = E_URL+"/script/userimg/" + user.img;
      $(jqc).css("background-image","url("+url+")");
      return;
    }else{
      if(user.sex ==0){
        $(jqc).removeClass("girl").addClass("boy");
      }else{
        $(jqc).removeClass("boy").addClass("girl");
      }
    }
  }
}
function updateImage(iuser){
  var sessionid = $.cookie("sessionid");
  if( sessionid == null || sessionid.length<1 ) return ;
  var user = main_getLoginUserFromCookie();
  var newsessionid = user.sessionid+"|"+user.loginname+"|"+user.name+"|"+user.istts+"|"+user.outdays + "|" + user.sex +"|"+iuser.img+"|"+iuser.vip +"|"+ user.graduatetime  +"|"+ user.isupdatepwd;
  $.cookie('sessionid',newsessionid,{ expires: 1,path:'/' });
}
function main_update_NickName(nickname) {
  var sessionid = $.cookie("sessionid");
  if (sessionid == null || sessionid.length < 1)
    return;
  var user = main_getLoginUserFromCookie();
  var newsessionid = user.sessionid + "|" + user.loginname + "|"+ nickname + "|" + user.istts + "|" + user.outdays+ "|" + user.sex +"|"+user.img+"|"+user.vip +"|"+ user.graduatetime  +"|"+ user.isupdatepwd;
  $.cookie('sessionid', newsessionid, {expires : 1});
}
/**
 * CC视屏播放插件实现
 * @param video_id 视屏ID , ID视屏上传后CC自动生成.
 * @param swfDiv 视屏窗口ID,div的ID
 * @param w 视屏宽度
 * @param h 视屏高度
 */
function showVieo(video_id,swfDiv,w,h){
  var video_swfobj = new SWFObject(
    'http://p.bokecc.com/flash/player.swf',
    CC_PLAYERID, w,h, '8');
  video_swfobj.addVariable("userid", CC_UID );
  video_swfobj.addVariable("videoid", video_id);
  //video_swfobj.addVariable("playerid", CC_PLAYERID );
  video_swfobj.addVariable("mode", "api");
  video_swfobj.addVariable("autostart", "false");
  video_swfobj.addVariable("jscontrol", "true");
  video_swfobj.addParam('allowFullscreen', 'true');
  video_swfobj.addParam('allowScriptAccess', 'always');
  video_swfobj.addParam('wmode', 'transparent');
  video_swfobj.write(swfDiv);
}
function get_cc_verification_code( vid ) { //cc自动调用,进行权限检查验证,校验Code
  var user = main_getLoginUserFromCookie();
  return user.sessionid ;
}

function uo2o(){
  $.post(E_URL+"/pay/updateo",null,function(data){
    console.log(data);
  },'json');
}
/* 加载头尾 */
$(document).ready(function() {
  $(".header").load("/web/main/header_v2.html");
  $(".footer").load("/web/main/footer_v2.html");
});/**
 * Created by Administrator on 2017/2/12.
 */
