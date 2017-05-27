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
    var managerDom = '<div><ul class="messageWindow"></ul><p class="addBtn">添加</p></div>';
    var initUser = function(){
        var data={};
        data.url="data/recruit.php";
        data.successF = function(returnData){
            ajaxUser(returnData);
        };
        data.errorF = function(){
            console.log("fail");
        };
        CommonAjax.ajax(data);
    };
    var ajaxUser = function(returnData){
        var data = returnData.data;
        time.init(time);
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
        var data={};
        data.url="data/recruit.php";
        data.successF = function(returnData){
            ajaxManager(returnData);
        };
        data.errorF = function(){
            console.log("fail");
        };
        CommonAjax.ajax(data);
    };
    var ajaxManager = function(returnData){
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

        var $manager = $(managerDom);
        var outIndex,inIndex;
        var liData='';
        for(outIndex = 0;outIndex<data.length;outIndex++){
            var rdata = data[outIndex];
            var ntime = time(Number(rdata.rtime));
            liData += '<li class="message" data-rid="'+ rdata.rid+'"><p class="postImg"><img src=""></p><ul class="showPost"><li class="titleM"><span class="recruitName">' + rdata.rname + '</span><span class="deleteBtn">删除</span></li> <li class="messageText">'+ rdata.rintro +'<a class="aStyleChange" href="123">[详情]</a></li><li class="messageTime" style="text-align: right">'+ntime+'</li></ul></li>'
        }
        $manager.find(".messageWindow").html(liData);
        $(".showMessage").html($manager.html());
        bindEvent();
    };
    var bindEvent = function(){

        $(".messageWindow").on("click",".deleteBtn",function(){
            var isRemove = confirm("删除是不可恢复的！\n\n您确认要删除吗？");
            if(isRemove){
                var rid = $(this).closest("li.message").attr("data-rid");
                var data={};
                data.params = "rid="+rid;
                data.url="data/deleteRecruit.php";
                data.successF = function(returnData){
                    if(returnData.code =="success"){
                        initManager();
                    }else{
                        console.log("删除失败");
                    }
                };
                data.errorF = function(returnData){
                    console.log("error");
                };
                CommonAjax.ajax(data);
            }
        });
        $(".addBtn").on("click",function(){
            recruitAdd.add();
        });
        $(".messageWindow").on("click",".aStyleChange",function(e){
            e.preventDefault();
            var rid = $(this).closest("li.message").attr("data-rid");
            recruitDetail.recruitD(rid);
        })

    };
    return {
        user:initUser,
        manager:initManager

    }
})();
var time = function(time){
    var mydate = new Date(time);
    var str = "" + mydate.getFullYear()+'-';
    var mm = mydate.getMonth()+1;
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
var recruitDetail = (function(){
    var ridNum;
    var dom ='<ul class="recruits"><li class="publishMessage"><img class="publisherImg" src="123.png" alt=""/><span class="publisher">casfs</span><span class="publishTime">asdasd</span></li><li class="jobDescription"><p class="recruitTitle">职位介绍:</p><p class="recruitText" style="margin-left: 40px;"></p></li><li class="jobRequirements"><p class="recruitTitle">职位要求:</p><ol class="requestList" style="margin-left: 40px;"></ol></li><li class="applyPerson"><p class="recruitTitle">申请人信息</p><ul class="applyMessage" style="margin-left: 10px;"></ul></li><li class="applyBtn"><p class="deleteDetail">删除该招聘信息</p> <!-- 管理员显示--><p class="apply">申请</p>  <!-- 用户显示--></li></ul>';
    var init =function(rid){
        ridNum = rid;
        var data = {};
        data.url="data/recruitDetail.php";
        data.params = "rid="+rid;
        data.successF = function(returnData){
            ajaxDetail(returnData);
        };
        data.errorF = function(){
            console.log("error");
        };
        CommonAjax.ajax(data);
    };
    var ajaxDetail = function(returnData){
        console.log(returnData);
        var recruitdetail = returnData.rdata;
        var udata = returnData.udata;
        var redata = returnData.redata;
        var pic = returnData.picpath;
        var apply = returnData.apply;
        var $dom = $(dom);
        dealUser($dom,recruitdetail,udata,pic);
        dealContent($dom,recruitdetail,redata);
        dealApply($dom,apply);
        $(".showMessage").html($dom);
        bindEvent();
    };
    var dealUser = function($dom,rdata,udata,pic){
        var $user = $dom.find(".publishMessage");
        $user.find(".publisherImg").attr("src",pic.pic);
        $user.find(".publisher").text(udata[0].uname);
        var utime = time(Number(rdata.rtime));
        $user.find(".publishTime").text(utime);
    };
    var dealContent = function($dom,recruitData,requestData){
        //职位
        var $jobDom = $dom.find(".jobDescription");
        var $requestDom = $dom.find(".jobRequirements");

        var text = recruitData.rintro;
        $jobDom.find(".recruitText").text(text);
        var lidata = '';
        for(var i in recruitData){
            lidata +='<li>'+ recruitData[i]+'</li>'
        }
        $requestDom.find(".requestList").html(lidata);
    };
    var dealApply = function($dom,data){
        var lidata='';
        for(var i=0;i<data.length;i++){
            lidata+='<li><span class="applyImg"><img src="'+data[i].pic+'" alt=""/></span><span class="applyName" style="display:inline-block;width:50px;text-align: center">'+data[i].tname+'</span><span class="applyPhone">&nbsp;&nbsp;&nbsp;联系电话：'+data[i].tphone+'</span></li>';
        }
        $dom.find(".applyMessage").html(lidata);


    };
    var bindEvent = function(){
        $("p.apply").on("click",function(){
          var data={};
          data.url="data/apply.php";
          var userId = $('.navigation ul').attr("data-id");
          data.params = "rid="+ridNum+"&uid="+userId;
          data.successF = function(returnData){
              console.log(123);
              init(ridNum);
          };
          data.errorF = function(){
              console.log(321);
          };
          CommonAjax.ajax(data);
      });
        $("p.deleteDetail").on("click",function(){
            var isRemove = confirm("删除是不可恢复的！\n\n您确认要删除吗？");
            if(isRemove){
                var rid = ridNum;
                var data={};
                data.params = "rid="+rid;
                data.url="data/deleteRecruit.php";
                data.successF = function(returnData){
                    if(returnData.code =="success"){
                        recruit.manager();
                    }else{
                        console.log("删除失败");
                    }
                };
                data.errorF = function(returnData){
                    console.log("error");
                };
                CommonAjax.ajax(data);
            }
        });
    };
    return {
        recruitD :init
    }
})();
var recruitAdd = (function(){
    var dom = '<div><form action="" class="recruitAdd"><ul><li><label for="jobName">职位名称：</label><input id="jobName" type="text" name="jobName"/></li><li><label for="jobNum">职位人数：</label><input id="jobNum" type="number" name="jobNum" min="1"/></li><li class="floatNeed"><label style="float: left">职位要求：</label><div class="recruitRequest text" style="float: left"><textarea name="jobRequest0" cols="30" rows="2"></textarea><p class="operationRequest addRequest" style="display: inline-block;">+</p><p class="operationRequest delRequest" style="display:none;">-</p></div></li><li class="floatNeed"><label for="jobIntro" style="float: left">职位介绍：</label><div class="text" style="float: left"><textarea name="jobIntro" id="jobIntro" cols="60	" rows="10"></textarea></div></li></ul></form><div class="applyBtn"><p style="position:relative;top:150px;right:30px;">提交</p></div></div>';
    var init = function(){
        console.log(123);
    };
    return{
        add:init
    }
})();