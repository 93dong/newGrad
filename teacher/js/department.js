$(".departmentDetail").load('data/department.php',function(){
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
    var admin = window.sessionStorage["upower"];
    var teacherId = window.sessionStorage["teacherId"];
    if(admin==0){
       manager.managerUser();
    }else{
        normal.normalUser();
    }
});
var normal = (function(){
    var normolDom = '<div><h1 class="departmentTitle" data-cid="">计算机系</h1><p class="departmentMessage"><span class="dMessage">长治学院计算机系成立于1995年。现在设有计算机科学与技术、网络工程两个本科专业,在校学生900余人。 计算机系秉承“学以致用,服务社会”的办学理念,坚持科学发展,...</span><a class="toDetail" href="#">[详情]</a></p></div>';
    var admin = window.sessionStorage["upower"];
    var teacherId = window.sessionStorage["teacherId"];
    var init=function(){
        var data={};
        data.url='data/department.php';
        data.params="teacherId="+teacherId+"&admin="+admin;
        data.successF = function(returnData){
            dataAjax(returnData);
            bindEvent.bind();
        };
        data.errorF=function(){
            console.log("error");
        };
        CommonAjax.ajax(data);
        //$(".departmentDetail").html(str);
    };
    var dataAjax = function(returnData){
        var $dom = $(normolDom);
        var data =returnData["data"][0];
            //var s=$dom[0];
        $dom.find(".departmentTitle").text(data.cname);
        $dom.find(".departmentTitle").attr("data-cid",data.cid);
        $dom.find(".dMessage").text(data.cintro);
        $(".departmentDetail").html($dom.html());
    };
    return {
        normalUser:init
    }
})();
var manager = (function(){
    var managerDom='<table class="managerTable" ><thead><th>系别编码</th><th>系别名称</th><th>所属院校</th><th>学生人数</th><th>操作</th></thead><tbody></tbody></table>';
    var admin = window.sessionStorage["upower"];
    var teacherId = window.sessionStorage["teacherId"];
    var init=function(){
        var data={};
        data.url='data/department.php';
        data.params="teacherId="+teacherId+"&admin="+admin;
        data.successF = function(returnData){
            dealAjax(returnData);
            bindEvent.bind();
        };
        data.errorF=function(){
            console.log("error");
        };
        CommonAjax.ajax(data);
        //$(".departmentDetail").html(str);
    };
    var dealAjax = function(returnData){
        var $dom = $(managerDom);
        //var data =returnData["code"];
        var departmentData =returnData.data;
        var outIndex,inIndex;
        for(outIndex=0;outIndex<departmentData.length;outIndex++){
            var trData = '<tr>';
            var department = departmentData[outIndex];
            var tdData = '<td data-name="cid">'+department.cid+'</td>';
            tdData += '<td>'+department.cname+'</td>';
            tdData += '<td>'+department.academy+'</td>';
            tdData += '<td>'+department.stunum+'</td>';
            tdData += '<td><a class="toDetail" href="#">详情</a></td>';
            trData +=tdData+'</tr>';
            $dom.find("tbody").append(trData);
        }
        var operation = '<div class="showMessage"><p class="addBtn">添加</p></div>'
        $(".departmentDetail").html($dom);
        $(".departmentDetail").append(operation);

    };
    return {
        managerUser :init
    }
})();

var departmentDetail = (function(){
    var dom ='<div><ul class="departmentUl"><li>系部名称：</li><li><i class="departmentName"></i><input type="text" name="cname" class="modification" autofocus><span class="clickupdate glyphicon glyphicon-pencil"></span></li><li>所属院校：</li><li><i class="schoolName"></i><input type="text" name="academy" class="modification" autofocus><span class="clickupdate glyphicon glyphicon-pencil"></span></li><li>教师人数：</li><li><span class="teacherNum">1325</span><a class="jumpdetail" href="main.html">[详情]</a></li><li>详情介绍：</li><li><i class="departmentIntro"></i><input type="text" name="cintro" class="modification" autofocus><span class="clickupdate glyphicon glyphicon-pencil"></span></li></ul><ul class="manageroperation" style="position: absolute;bottom:100px;right:200px"></ul></div>';
    var admin = window.sessionStorage["upower"];
    var teacherId = window.sessionStorage["teacherId"];
    var init = function(categaryId){
        var data={};
        data.url='data/departmentDetail.php';
        data.params = "categaryId="+categaryId;//系别id
        data.successF = function(returnData){
            ajax(returnData);
            bindEvent.bind();
        };
        data.errorF = function(returnData){
            console.log("error");
        };
        CommonAjax.ajax(data);
    };
    var ajax = function(returnData){
        var data = returnData.data;
        var teacherNum = returnData.count;
        var $detail = $(dom);
        data = data[0];
        $detail.find(".departmentUl").attr("data-id",data.cid);
        $detail.find(".departmentName").text(data.cname);
        $detail.find(".schoolName").text(data.academy);
        $detail.find(".departmentIntro").text(data.cintro);
        $detail.find(".teacherNum").text(teacherNum);
        if(admin==0){
            $detail.find(".manageroperation").append('<li class="applyBtn"><p class="update">修改</p><p class="delete">删除</p></li>');
        }
        $(".departmentDetail").html($detail);
    };
    var bind = function(){

    };
    return{
        detail:init
    }
})();
var departmentAdd = (function(){
    var dom='<form id="departmentadd" action="get"><ul><li><label for="departmentName">系别名称</label></li><li><input form="departmentadd" id="departmentName" name="departmentName" type="text"/></li><li><label for="departmentSchool">所属院校</label></li><li><input form="departmentadd"  id="departmentSchool" name="departmentSchool" type="text"/></li><li><label for="departmentStuNum">学生人数</label></li><li><input form="departmentadd" id="departmentStuNum" name="departmentStuNum" type="text"/></li><li><label for="departmentIntro">系别介绍</label></li><li><textarea form="departmentadd" id="departmentIntro" name="departmentIntro" cols="50" rows="10"></textarea></li></ul></form><div class="applyBtn"><p class="addDepartment">提交</p></div>';
    var init=function(){
        var $dom = $(dom);
        $(".departmentDetail").html($dom);
        bindEvent();
    };
    var bindEvent = function(){
        $(".applyBtn").on("click",".addDepartment",function(){
            var data={};
            data.url="data/addcategary.php";
            data.params = $("#departmentadd").serialize();
            data.successF = function(returnData){
                if(returnData.code==1){
                    manager.managerUser();
                }
            };
            data.errorF = function(){
                console.error("cuola");
            };
            CommonAjax.ajax(data);
        });
    };
    return{
        add:init
    }
})();
var bindEvent=(function(){
    var bind = function(){
        $(".toDetail").on("click",function(e){
            e.preventDefault();
            var parent = $(this).parent("td");
            console.log(parent.length);
            var categaryId;
            if(parent.length!==0){
                console.log("true");//manager
                categaryId = Number($(this).parent().siblings("td[data-name='cid']").html());

            }else{
                console.log("false");//user
                categaryId = Number($(this).parent("p").siblings("h1").attr("data-cid"))

            }
            console.log(typeof categaryId);
            departmentDetail.detail(categaryId);
            //departmentDetail.detail(categaryId);
        });
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
        $(".manageroperation").on("click",".update",function(){
            var cid=$(".departmentUl").attr("data-id");
            var inputs=$('.departmentUl input');
            var inputlength=inputs.length;
            for(var i=0,sel=[],p=0;i<inputlength;i++){
                var v=inputs[i].value;
                var k=inputs[i].name;
                if (v!==''){
                    sel[p]=[k,v];
                    p++;
                }
            }
            if(sel.length==0){
                alert("无修改项需修改");
                return;
            }
            var arr=JSON.stringify(sel);
            var data={};
            data.url="data/update.php";
            data.params = "sel="+arr+"&cid="+cid+"&update=1";
            data.successF = function(returnData){
               console.log(returnData);
                alert("修改成功");
            };
            data.errorF = function(){
                console.log("error");
            };
            CommonAjax.ajax(data);
        });
        $(".manageroperation").on("click",".delete",function(){
            var isdelete = confirm("是否确认删除此系别信息并将相关教师系别信息清空？");
            if(isdelete){
                var isclear = confirm("是否确认清除相关教师系别信息");
                var data={};
                data.url="data/deleteDepartment.php";
                var cid= $(".departmentUl").attr("data-id");
                data.params = "cid="+cid;
                data.successF = function(returnData){
                    console.log(returnData);
                    alert(1);
                };
                data.errorF = function(){
                    console.log(123);
                };
                CommonAjax.ajax(data);
                if(isclear){
                    conosle.log("清楚相关教师所属系别信息");
                }else{
                    console.log("具体操作逻辑还在思考中");
                }
                //删除系别表中该系别信息，同时修改教师表
            }else{
                console.log(2);
            }
        });
        $(".jumpdetail").on("click",function(e){
            e.preventDefault();
            var categaryId=$(".departmentUl").attr("data-id");
            window.sessionStorage["categaryId"]=categaryId;
            location.href='main.html';
        });
        $(".showMessage").on("click",".addBtn",function(){
                departmentAdd.add();
        });
        //$(".applyBtn").on("click",".update",function(){console.log(123)});
        //$(".applyBtn").on("click",".delete",function(){
        //    console.log(321);
        //});
    };
    return {
        bind:bind
    }
})();