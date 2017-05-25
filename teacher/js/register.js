$("#teacherId").on("blur",function(){
    var data={};
    //提交ajax
    var s=1;
    if(s==1){
        $("#registerBtn").prop("disabled",false);
        console.log(123);
    }else{
        $("#registerBtn").prop("disabled",true);
        console.log(321);
    }
});
$('#registerBtn').on('click',function(){
    var disabled = $(this).prop("disabled");
    console.log(disabled);
    if(!disabled){
        console.log("haha");
        var unumber=$('#unumber').val();
        var uname=$('#uname').val();
        var upwd=$('#upwd').val();
        $.ajax({
            url:'data/useradd.php',
            data:`name=${uname}&number=${unumber}&pwd=${upwd}`,
            success:function(data){
                if (data.code===1){
                    $('p[data-name="showmessage"]').html('注册成功，请<a href="#">返回登录</a>');
                }
            }
        })
    }else{
        console.log("请输入教师Id");
    }

});
$('.submitBtn').on('click','a',function(){
    location.href='login.html';
})