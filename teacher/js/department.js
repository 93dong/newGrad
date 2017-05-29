$(".departmentDetail").load('data/department.php',function(){
//$(".departmentDetail").load(function(){
    var admin = $('.navigation ul').attr("data-power");
    var teacherId = $('.navigation ul').attr("data-id");
    if(admin==0){
       manager.managerUser();
    }else{
        normal.normalUser();

    }
});
var normal = (function(){
    var normolDom = '<div><h1 class="departmentTitle" data-cid="">计算机系</h1><p class="departmentMessage"><span class="dMessage">长治学院计算机系成立于1995年。现在设有计算机科学与技术、网络工程两个本科专业,在校学生900余人。 计算机系秉承“学以致用,服务社会”的办学理念,坚持科学发展,...</span><a class="toDetail" href="#">[详情]</a></p></div>';
    var init=function(){
        var admin = $('.navigation ul').attr("data-power");
        var teacherId = $('.navigation ul').attr("data-id");
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
            var s=$dom[0];
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
    var init=function(){
        var admin = $('.navigation ul').attr("data-power");
        var teacherId = $('.navigation ul').attr("data-id");
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
        alert(1);
        CommonAjax.ajax(data);
        //$(".departmentDetail").html(str);
    };
    var dealAjax = function(returnData){
        var $dom = $(managerDom);
        //var data =returnData["code"];
        var departmentData =returnData.data;
        console.log(departmentData);
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

    }
    return {
        managerUser :init
    }
})();

var departmentDetail = (function(){
    var dom ='<div><ul class="departmentUl"><li>系部名称：</li><li class="departmentName">计算机系</li><li>所属院校：</li><li class="schoolName">长治学院</li><li>教师人数：</li><li><span class="teacherNum">1325</span><a href="main.html">[详情]</a></li><li>详情介绍：</li><li class="departmentIntro">159人</li></ul><ul style="position: absolute;bottom:100px;right:200px"><li class="applyBtn"><p>修改</p><p>删除</p></li></ul></div>';
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
        $detail.find(".departmentName").text(data.cname);
        $detail.find(".schoolName").text(data.academy);
        $detail.find(".departmentIntro").text(data.cintro);
        $detail.find(".teacherNum").text(teacherNum);
        $(".departmentDetail").html($detail);
    };
    return{
        detail:init
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
        })
    };
    return {
        bind:bind
    }
})();