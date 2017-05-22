$(".navigation").load('data/leftSetting.php',function(){
    $(".navigation").on("click","li",function(e){
        e.preventDefault();
        $(this).addClass("navsel");
        $(this).siblings("li").removeClass("navsel");
        var titleText = $(this).text();
        $(".title").text(titleText);
        var jump = $(this).children('a').attr("href");
        switch(jump){
            case "homePage":window.location.href='homePage.html';break;
            case "personMessage":console.log("个人信息");break;
            case "changeMessage":console.log("修改信息");break;
            case "changePwd":console.log("修改密码");break;
            case "showManager":console.log("展示管理者");break;
        }
    });
    $("li[data-name='personMessage']").trigger("click");
});