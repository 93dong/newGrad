$("#teacherId").on("blur",function(){
    var value = $("#teacherId").val();
    var data={};
    data.url = 'data/checkId.php';
    data.params = "teacherId="+value;
    data.successF = function(returnData){
        if(returnData.code ===2){
            $("#teacherId").next("span").text("教师Id有误，请重新输入，或联系管理员");
        }else{
            $("#teacherId").next("span").text("教师id正确，请进行以下注册");
            $("#registerBtn").prop("disabled",false);
        }
    };
    data.errorF = function(){
    };
    CommonAjax.ajax(data);

});
$('#registerBtn').on('click',function(){
    var data = $("#adduser").serialize();
    var test=$('#test').val().toUpperCase();
    var check = $("#registerBtn").prop("disabled");
    if(!check){
        $.ajax({
            url:'data/useradd.php',
            data:"test="+test+"&"+data,
            success:function(data){
                if (data.code===1){
                    $('.showmessage').show();
                    $('#adduser').hide();
                }else{
                    $(".testdanger").text("验证码输入错误，请重新输入");
                }
            }
        });
    }else{}
});
$('.submitBtn').on('click','a',function(){
    location.href='login.html';
})