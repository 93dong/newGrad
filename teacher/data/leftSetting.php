<?php
    header('Content-Type:text.html');
    session_start();
?>
<?php
	echo('<ul data-power="'.$_SESSION['uPower'].'" data-id="'.$_SESSION['teacherId'].'">');
?>
	<li><a href="homePage">首页</a></li>
	<li class="navsel" data-name="personMessage"><a href="personMessage" >个人信息</a></li>
	<li data-name="changeMessage"><a href="changeMessage">修改个人信息</a></li>
	<li data-name="changePwd"><a href="changePwd">修改密码</a></li>
	<?php
			if($_SESSION['uPower']==0){
			echo('<li data-name="showManager"><a href="showManager">申请人员</a></li>');
			}
		?>
</ul>
