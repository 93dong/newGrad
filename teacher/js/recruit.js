$(".showMessage").load('data/recruit.php',function(){
    var admin = $('.navigation ul').attr("data-power");
    var teacherId = $('.navigation ul').attr("data-id");

    if(admin==0){
        recruit.manager();

    }else{
        recruit.user();
    }
});
var recruit = (function(){
    var userDom = '<ul class="messageWindow"></ul>';
    var managerDom = '<ul class="messageWindow"></ul><p class="addBtn">添加</p>';
    var initUser = function(){
        console.log("123");
        var data={};
        data.url="data/recruit.php";
        data.successF = function(returnData){
            console.log("success");
            ajaxUser(returnData);
        };
        data.errorF = function(){
            console.log("fail");
        };
        CommonAjax.ajax(data);
    };
    var ajaxUser = function(returnData){
        var data = returnData.data;
        //console.log(Number(new Date()));
        var time = function(time){
            var mydate = new Date(time);
            var str = "" + mydate.getFullYear()+'-';
            var mm = mydate.getMonth()+1
            if(mydate.getMonth()>9){
                str += mm;
            }
            else{
                str += "0" + mm+'-';
            }
            if(mydate.getDate()>9){
                str += mydate.getDate();
            }
            else{
                str += "0" + mydate.getDate();
            }
            return str;
        }

        var $user = $(userDom);
        var outIndex,inIndex;
        var liData='';
        for(outIndex = 0;outIndex<data.length;outIndex++){
            var rdata = data[outIndex];
            var ntime = time(Number(rdata.rtime));
            liData += '<li class="message"><p class="postImg"><img src=""></p><ul class="showPost"><li class="titleM"><span class="recruitName">' + rdata.rname + '</span></li> <li class="messageText">'+ rdata.rintro +'<a class="aStyleChange" href="123">[详情]</a></li><li class="messageTime" style="text-align: right">'+ntime+'</li></ul></li>'
        }
        $user.html(liData);
        $(".showMessage").html($user);
    };
    var initManager = function(){

    };
    var ajaxManager = function(){

    };
    return {
        user:initUser,
        manager:initManager

    }
})();