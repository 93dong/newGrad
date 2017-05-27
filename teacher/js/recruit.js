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

        });

    };
    return {
        user:initUser,
        manager:initManager

    }
})();
var recruitDetail = (function(){
    var dom ='<ul class="recruits"><li class="publishMessage"><img class="publisherImg" src="123.png" alt=""/><span class="publisher">casfs</span><span class="publishTime">asdasd</span></li><li class="jobDescription"><p class="recruitTitle">职位介绍:</p><p class="recruitText" style="margin-left: 40px;"></p></li><li class="jobRequirements"><p class="recruitTitle">职位要求:</p><dl style="margin-left: 40px;"><dt class="jobName">前端工程师</dt><dd class="jobNeed">会js</dd></dl></li><li class="applyPerson"><p class="recruitTitle">申请人信息</p><ul class="applyMessage" style="margin-left: 10px;"><li><span class="applyImg"><img src="123456.png" alt=""/></span><span class="applyName">dsadsadas</span><span class="applyDepartment">dsadasdsa</span><span class="applyTime">dasdasdas</span></li><li><span class="applyImg"><img src="123456.png" alt=""/></span><span class="applyName">dsadsadas</span><span class="applyDepartment">dsadasdsa</span><span class="applyTime">dasdasdas</span></li><li><span class="applyImg"><img src="123456.png" alt=""/></span><span class="applyName">dsadsadas</span><span class="applyDepartment">dsadasdsa</span><span class="applyTime">dasdasdas</span></li></ul></li><li class="applyBtn"><p class="deleteDetail">删除该招聘信息</p> <!-- 管理员显示--><p class="apply">申请</p>  <!-- 用户显示--></li></ul>';
    var init =function(rid){
        var data = {};
        data.url="data/recruitDetail.php";
        data.params = "rid="+rid;
        data.successF = function(returnData){
            ajaxDetail(returnData);
        };
        data.errorF = function(){
            console.log("error");
        };
    };
    var ajaxDetail = function(returnData){
        var recruitdetail = returnData.rdata;
        var udata = returnData.udata;
        var redata = returnData.redata;
        var pic = returnData.picpath;
        var dom = $(dom);
    }
    return {
        recruitD :init
    }
})();