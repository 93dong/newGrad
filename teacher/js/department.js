//$(".departmentDetail").load('data/department.php',function(){
$(".departmentDetail").load(function(){
    var str='';
    var power = $('.navigation ul').attr("data-power");
    if(power==0){
        normal.normalUser();
    }else{
        manager.managerUser();
    }
});
var normal = (function(){

    var init=function(){
        var str='<table class="departmentList" ><thead><th>系部名称</th><th>所属院系</th><th>学生人数</th><th>教师人数</th><th>操作</th></thead><tbody><tr><td>计算机系</td><td>长治学院</td><td>159人</td><td>561人</td><td  class="operation">详情</td></tr></tbody></table>';
        $(".departmentDetail").html(str);
    };
    return {
        normalUser:init
    }
})();
var manager = (function(){

    var init=function(){
        var str='<h1 class="departmentTitle">计算机系</h1><p class="departmentMessage"><span class="dMessage">长治学院计算机系成立于1995年。现在设有计算机科学与技术、网络工程两个本科专业,在校学生900余人。 计算机系秉承“学以致用,服务社会”的办学理念,坚持科学发展,...</span><a href="123">[详情]</a></p>';
        $(".departmentDetail").html(str);
    }
    return {
        managerUser :init
    }
})()