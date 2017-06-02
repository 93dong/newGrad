$(".navigation").load('data/leftSetting.php',function(){
    //判断登陆状态
    (function(){
        var userName=window.sessionStorage['teacherId'];
        if(!userName){
            location.href='login.html';
        }
        //if (!$('#logo .user').has('span')){
        //	location.href='login.html';
        //}
    })();
    $(".navigation").on("click","li",function(e){
        e.preventDefault();
        $(this).addClass("navsel");
        $(this).siblings("li").removeClass("navsel");
        var titleText = $(this).text();
        $(".title").text(titleText);
        var jump = $(this).children('a').attr("href");
        switch(jump){
            case "homePage":window.location.href='homePage.html';break;
            case "personMessage":pMessage.message();break;
            case "changeMessage":pMessageChange.change();break;
            case "changePwd":pChange.change();break;
            case "showManager":applyPerson.apply();break;
        }
    });
    $("li[data-name='personMessage']").trigger("click");
});
var pMessage = (function(){
    var dom = '<div class="imgShow" style="float: left;margin-left: 100px;margin-top:90px;"><img class="picUser" src="" alt=""/></div><ul class="personMessage" ><li>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</li><li data-name="uname">d</li><li>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族</li><li data-name="unavigation">d</li><li>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</li><li data-name="ugender">d</li><li>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄</li><li data-name="uage">d</li><li>任教年限</li><li data-name="uteayear">d</li><li>联系方式</li><li data-name="uphone">d</li><li>毕业院校</li><li data-name="ugrad">d</li><li>所属院系</li><li data-name="udepartment">d</li></ul>';
    var init = function(){
        var admin = window.sessionStorage["upower"];
        var teacherId = window.sessionStorage["teacherId"];

        var data={};
        data.url = "data/personMessage.php";
        data.params = "teacherId="+teacherId;
        data.successF = function(returnData){
            dealAjax(returnData);
        }
        CommonAjax.ajax(data);
    };
    var dealAjax = function(returnData){
        var data = returnData.data;
        var cate = returnData.cate;
        var $dom = $(dom);
        $dom.find(".picUser").attr("src",data.pic);
        $dom.find("[data-name='uname']").text(data.tname);
        $dom.find("[data-name='unavigation']").text(data.tnation);
        $dom.find("[data-name='ugender']").text(data.tgender);
        $dom.find("[data-name='uage']").text(data.tage);
        $dom.find("[data-name='uteayear']").text(data.tyear);
        $dom.find("[data-name='uphone']").text(data.tphone);
        $dom.find("[data-name='ugrad']").text(data.gradSchool);
        $dom.find("[data-name='udepartment']").text(cate.cname);
        $(".personDetail").html($dom);


    };
    return {
        message:init
    }
})();
var pMessageChange = (function(){
    var dom = '<div class="imgShow" style="float: left;margin-left: 100px;margin-top:90px;"><img class="picUser" src="" alt=""/></div><ul class="userlist"><li>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</li><li><i data-name="tname"></i><input type="text" name="tname" class="modification" autofocus><span class="clickupdate glyphicon glyphicon-pencil"></span></li><li>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：</li><li><i data-name="tnation"></i><input type="text" name="tnation" class="modification" autofocus><span class="clickupdate glyphicon glyphicon-pencil"></span></li><li>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</li><li><i data-name="tgender"></i><input type="text" name="tgender" class="modification" autofocus><span class="clickupdate glyphicon glyphicon-pencil"></span></li><li>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</li><li><i data-name="tage"></i><input type="text" name="tage" class="modification" autofocus><span class="clickupdate glyphicon glyphicon-pencil"></span></li><li>院&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系：</li><li><i data-name="categaryname"></i><input type="text" name="categaryID" class="modification" autofocus><span class="clickupdate glyphicon glyphicon-pencil"></span></li><li>任教年限：</li><li><i data-name="tyear"></i><input type="text" name="tyear" class="modification" autofocus><span class="clickupdate glyphicon glyphicon-pencil"></span></li><li>联系方式：</li><li><i data-name="tphone"></i><input type="text" name="tphone" class="modification" autofocus><span class="clickupdate glyphicon glyphicon-pencil"></span></li><li>毕业院校：</li><li><i data-name="gradSchool"></i><input type="text" name="gradSchool" class="modification" autofocus><span class="clickupdate glyphicon glyphicon-pencil"></span></li></ul><p class="updateBtn">提交</p>';
    var admin = window.sessionStorage["upower"];
    var teacherId = window.sessionStorage["teacherId"];
    var init = function(){
        $(".personDetail").html(dom);
        var data={};
        data.url = "data/personMessage.php";
        data.params = "teacherId="+teacherId;
        data.successF = function(returnData){
            dealAjax(returnData);
        }
        CommonAjax.ajax(data);

    };
    var dealAjax = function(returnData){
        var data = returnData.data;
        var cate = returnData.cate;
        var $dom = $(dom);
        //$dom.find(".picUser").attr("src",data.pic);
        $dom.find(".picUser").attr("src",data.pic);
        $dom.find("[data-name='tname']").text(data.tname);
        $dom.find("[data-name='tnation']").text(data.tnation);
        $dom.find("[data-name='tgender']").text(data.tgender);
        $dom.find("[data-name='tage']").text(data.tage);
        $dom.find("[data-name='tyear']").text(data.tyear);
        $dom.find("[data-name='tphone']").text(data.tphone);
        $dom.find("[data-name='gradSchool']").text(data.gradSchool);
        $dom.find("[data-name='categaryname']").text(cate.cname);
        $(".personDetail").html($dom);
        bindEvent();

    };
    var bindEvent = function(){
        $(".clickupdate").on("click",function(){
            var type=$(this).attr('data-name');
            $(this).siblings('input').css('display','inline-block').siblings('i').css('display','none');
        });
        $(".modification").on("blur",function(){
            var html=$(this).val();
            if(!html){
                $(this).css('display','none').siblings('i').css('display','inline-block');
            }else{
                $(this).siblings('i').html(html).css('display','inline-block');
                $(this).css('display','none');
            }
        });
        $(".updateBtn").on("click",function(){
            var inputs=$('.userlist input');
            var inputlength=inputs.length;
            for(var i=0,sel=[],p=0;i<inputlength;i++){
                var v=inputs[i].value;
                var k=inputs[i].name;
                if (v!==''){
                    sel[p]=[k,v];
                    p++;
                }
            }
            var arr=JSON.stringify(sel);
            var data={};
            data.url="data/update.php";
            data.params = "sel="+arr+"&tid="+teacherId;
            data.successF = function(returnData){
                init()
            };
            data.errorF = function(){
                console.log("error");
            };
            CommonAjax.ajax(data);

        })
    };
    return {
        change:init
    }
})();
var pChange = (function(){
    var dom = '<ul class="changePwd"><li>原密码：</li><li><input class="oldpwd" type="password" style="width:250px;"/></li><li>新密码：</li><li><input type="password" class="newpwd" style="width:250px;"/></li><li>确认密码：</li><li><input class="confirmpwd" type="password" style="width:250px;"/></li></ul><div class="applyBtn" style="position:absolute;bottom:110px;left:500px;"><p class="confirmUpdate">确认修改</p></div>';
    var admin = window.sessionStorage["upower"];
    var teacherId = window.sessionStorage["teacherId"];
    var init = function(){
        $(".personDetail").html(dom);
        bindEvent();
    };
    var bindEvent = function(){
        $(".confirmUpdate").on("click",function(){
            var oldpwd = $(".oldpwd").val();
            var newpwd = $(".newpwd").val();
            var confirmpwd = $(".confirmpwd").val();
            if(newpwd==confirmpwd){
                var data ={};
                data.url="data/login.php";
                data.params = "teacherId="+teacherId+"&oldpwd="+oldpwd+"&newpwd="+newpwd;
                data.successF = function(returnData){
                    var stage = returnData.code;
                    if(stage==4){
                        alert("密码修改成功！请重新登录。");
                        $('.quit').trigger("click");
                    }else if(stage==5){
                        alert("密码输入不正确，请重新输入您的密码。");
                    };
                };
                data.errorF= function(){
                    console.log("err");
                };
                CommonAjax.ajax(data);
            }
            else{
               alert("两次密码输入不一致，请重新输入");
            }

        });

    };

    return {
        change:init
    }
})();
var applyPerson = (function(){
    var dom='<table class="applyList" ><thead><th>图片</th><th>编号</th><th>姓名</th><th>性别</th><th>年龄</th><th>民族</th><th>所在系别</th><th>毕业院校</th><th>联系方式</th><th>操作</th></thead><tbody></tbody></table>';
    var init = function(){
        var data={};
        data.url="data/queryapply.php";
        data.params ='';
        data.successF = function(returnData){
            dealAjax(returnData);
        };
        data.errorF = function(){
            console.error("error");
        };
        CommonAjax.ajax(data);
    };
    var dealAjax = function(returnData){
        var data=returnData.data;
        var tabledata='';
        for(var i=0;i<data.length;i++){
            var tr = '<tr data-index='+ data[i]["tid"]+'>';
            var td=`<td><img src="${data[i]['pic']}" alt=""/></td><td>${data[i]["tid"]}</td><td>${data[i]["tname"]}</td><td>${data[i]["tgender"]}</td><td>${data[i]["tage"]}</td><td>${data[i]["tnation"]}</td><td>${data[i]["categary"]}</td><td>${data[i]["gradSchool"]}</td><td>${data[i]["tphone"]}</td>`;
            tr+=td+'<td  class="operation"><span class="agree">[同意]</span><span class="unagree">[拒绝]</span></td></tr>'
            tabledata+=tr;
        }
        var $dom = $(dom);
        $dom.find("tbody").html(tabledata);
        $(".personDetail").html($dom);
        if($(".applyList tbody td").length==0){
            $(".applyList tbody").html('<td colspan="10">无申请成为管理员的账号</td>');
        }
        bindEvent();
    };
    var bindEvent = function(){
        $(".applyList").on("click",".agree",function(){
            var teacherID = $(this).parents("tr").attr("data-index");
            var agree = 1;
            var data={};
            data.url="data/givepower.php";
            data.params="teacherId="+teacherID+"&agree="+agree;
            data.successF = function(returnData){
                console.log(returnData);
                init();

            };
            data.errorF = function(){
                console.error("error");
            }
            CommonAjax.ajax(data);
        });
        $(".applyList").on("click",".unagree",function(){
            var teacherID = $(this).parents("tr").attr("data-index");
            var agree = 2;
            var data={};
            data.url="data/givepower.php";
            data.params="teacherId="+teacherID+"&agree="+agree;
            data.successF = function(returnData){
                console.log(returnData);
                init();

            };
            data.errorF = function(){
                console.error("error");
            }
            CommonAjax.ajax(data);
        })
    }
    return {
        apply:init
    }
})()