$('#load').on('click',function(){
  var unumber=$('#unumber').val();
  var upwd=$('#upwd').val();
  var test=$('#test').val().toUpperCase();
  console.log(test);
  $.ajax({
    url:`data/login.php?test=${test}&unumber=${unumber}&upwd=${upwd}`,
    success:function(data){
      var state=data.code;
      console.log(state);
      if(state==1){
        //if ($('#check:checked').length===1){
        //  window.localStorage['uname']=$('#uname').val();
        //  window.localStorage['upwd']=$('#upwd').val();
        //}else{
        //  window.sessionStorage['uname']=$('#uname').val();
        //  window.sessionStorage['upwd']=$('#upwd').val();
        //  window.sessionStorage['upow']=data.power;
        //  alert(window.sessionStorage['upow']);
        //}
        location.href='homePage.html';
      }else{
        $('#warn').css('height','30px');
        if(state===2){
          $('#warn').html('用户名或密码错误请重新输入！');
        }else{
          $('#warn').html('验证码不正确，请重新输入');
        }
      }
    },
    error:function(){
      console.log('err');
    }
  });
});
$('.toregister').on('click','a',function(e){
  e.preventDefault();
  location.href='register.html';
  console.log(1);
});
$('#change').on('click',function(e){
  e.preventDefault();
  $(this).siblings('img').attr('src','data/test.php');
});