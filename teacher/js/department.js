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
    var normolDom = '<h1 class="departmentTitle">计算机系</h1><p class="departmentMessage"><span class="dMessage">长治学院计算机系成立于1995年。现在设有计算机科学与技术、网络工程两个本科专业,在校学生900余人。 计算机系秉承“学以致用,服务社会”的办学理念,坚持科学发展,...</span><a href="123">[详情]</a></p>';
    var init=function(){
        var admin = $('.navigation ul').attr("data-power");
        var teacherId = $('.navigation ul').attr("data-id");
        var data={};
        data.url='data/department.php';
        data.params="teacherId="+teacherId+"&admin="+admin;
        data.successF = function(returnData){
            console.log(returnData["data"]);
        };
        data.errorF=function(){
            console.log("error");
        };
        CommonAjax.ajax(data);
        //$(".departmentDetail").html(str);
    };
    var ajax = function(returnData){
        var dom = normolDom;
        var data =returnData["code"];
    }
    return {
        normalUser:init
    }
})();
var manager = (function(){

    var init=function(){
        var admin = $('.navigation ul').attr("data-power");
        var teacherId = $('.navigation ul').attr("data-id");
        var data={};
        data.url='data/department.php';
        data.params="teacherId="+teacherId+"&admin="+admin;
        data.successF = function(returnData){
            console.log(returnData["data"]);
        };
        data.errorF=function(){
            console.log("error");
        };
        CommonAjax.ajax(data);
        //$(".departmentDetail").html(str);
    };
    var ajax = function(returnData){
        var dom = normolDom;
        var data =returnData["code"];
    }
    return {
        managerUser :init
    }
})();