<?php
    header('Content-Type:text.html');

    require('init.php');

    $name=$_REQUEST['name'] or die('{"msg":"用户名不能为空"}');
    $nation=$_REQUEST['nation'] or die('{"msg":"民族不能为空"}');
    $gender=$_REQUEST['gender'] or die('{"msg":"性别不能为空"}');
    $age=$_REQUEST['age'] or die('{"msg":"年龄不能为空"}');
    $phone=$_REQUEST['phone'] or die('{"msg":"联系方式不能为空"}');
    $gradSchool=$_REQUEST['gradSchool'] or die('{"msg":"毕业院校不能为空"}');
    $year=$_REQUEST['year'] or die('{"msg":"任教年限不能为空"}');
    $categaryID=$_REQUEST['categaryID'] or die('{"msg":"所属系别不能为空"}');

    if(@!$picpath){
		$picpath='img/lingwan.jpg';
    }

    $sql="INSERT INTO xt_teacher VALUES(NULL,'$name','$nation','$gender','$age','$picpath','$phone','$gradSchool','$year','$categaryID')";
				
    $result=mysqli_query($conn,$sql);
		

		$id=mysqli_insert_id($conn);

		if(is_uploaded_file($_FILES['photo']['tmp_name'])){
        $pictype=$_FILES['photo']['type'];
        switch ($pictype){
            case 'image/pjpeg':$pictype='pjpeg';
            break;
            case 'image/jpeg':$pictype='jpeg';
            break;
            case 'image/png':$pictype='png';
            break;
        }
        $picname=$id.'.'.$pictype;
        $widname=iconv('utf-8','gbk',$picname);
        $size=$_FILES['photo']['size'];

        if(move_uploaded_file($_FILES['photo']['tmp_name'], '../img/'.$widname)){
           $message='success';
           $picpath='img/'.$picname;
        }else{
            $message='error';
        }
    }

    $sql="UPDATE xt_teacher SET pic='$picpath' WHERE tid='$id'";
		$result=mysqli_query($conn,$sql);
		$state='添加成功';
    $statemessage='<a id="Return" href="#">返回主页</a>';
    if (!$result){
         $state='添加失败';
         $statemessage='<a id="Return" href="#">返回主页</a>';
    }
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>Document</title>
		<link rel="stylesheet" href="../css/common.css">
		<link rel="stylesheet" href="../css/header.css">
		<link rel="stylesheet" href="../css/footer.css">
		<link rel="stylesheet" href="../css/main.css"/>

	</head>
	<body>
		<header id="header"></header>
		<div id='main'>
			<!-- 异步加载-->
			<div class='tmessage'>
				<ul>
					<li><img src="../<?php echo $picpath?>" alt=""/></li>
					<li>姓名：<span><?php echo $name?></span></li>
					<li>性别：<span><?php echo $gender?></span></li>
					<li>年龄：<span></span><?php echo $age?></li>
					<li>院系：<span><?php echo $categaryID?></span></li>
					<li>任教年限：<span></span><?php echo $year?></li>
					<li>联系方式：<span><?php echo $phone?></span></li>
				</ul>
			</div>
			<div id="showStage" class="subject">
				<h3 class='addSuccess'>
					<?php
					   echo $state;
					?>
				</h3>
				<p class='reMain'>
					<?php echo $statemessage?>
				</p>
			</div>
		</div>
		<footer id="footer"></footer>
		<script src="../js/jquery-1.11.3.js"></script>
		<script src="../js/head.js"></script>

		<script>
		    $('#header').load('header.php',function(){
            	var fonts=[
            	{"i":0,"cnt":"我校坚持以人为本，坚持科学发展观，在领域内，坚持实事求是，不虚假，不做作。"}
            	];
            	var fChange={
            		INTERVAL:50000,//定时器时间
            		WAIT:2000,//一次性定时器的时间
            		LIWIDTH:0,//Li的宽
            		timer:null,//定时器序号
            		$UL:null,//ul
            		init(){
            			this.$UL=$("#change>ul");
            			this.LIWIDTH=parseFloat($("#change").css("width"));//1300
            			this.updateView();
            			this.autoMove();
            		},
            		autoMove(){
            			var timer=setTimeout(this.Move.bind(this),this.WAIT);
            		},
            		Move(){
            			clearTimeout(this.timer);
            			this.timer=null;
            			this.$UL.animate({left:-1*this.LIWIDTH},this.INTERVAL,function(){
            				fonts=fonts.concat(fonts.splice(0,1));
            				this.updateView();
            				this.$UL.css("left",this.LIWIDTH);
            				this.autoMove();
            			}.bind(this));
            		},
            		updateView(){
            			for (var i=0,lis="";i<fonts.length;i++)
            			{
            				lis+=`<li>${fonts[i].cnt}</li>`
            			}
            			this.$UL.html(lis).css("width",this.LIWIDTH*fonts.length);
            		}
            	}
            	fChange.init();
            });
            $('#Return').on('click',function(e){
                e.preventDefault();
                console.log('1');
                location.href='../main.html';
            })
		</script>
		<script src="../js/main.js"></script>
	</body>
</html>

