<?php
	header('Content-Type:text.html');
	?>

	<div id="logo">
		<span>师资管理系统</span>
		<ul>
			<li class="user"><?php
				session_start();
				if(!@$_SESSION['loginName']){
					echo '<a href="login">登录</a>/<a href="register">注册</a>';
				}else{
					echo '欢迎回来:<span>'.$_SESSION['loginName'].'</span>';
				}
			?>
			</li>
			<li class="personCenter"><a href="settings.html">个人中心</a></li>
			<li class="quit"><a href="#">退出</a></li>
		</ul>
	</div>
	<div id="change">
		<ul>
		</ul>
	</div>		