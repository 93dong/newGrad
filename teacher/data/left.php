<?php
    header('Content-Type:text.html');
    session_start();
?>
<?php
	echo('<ul data-power="'.$_SESSION['uPower'].'" data-id="'.$_SESSION['teacherId'].'">')

?>
	<li data-name="homePage"><a href="homePage.html">首页</a></li>
	<li data-name="department"><a href="department.html" >系别信息</a></li>
	<?php
		if($_SESSION['uPower']==0){
		echo('<li class="slideDown navigation" data-name="main" style="margin-left: -1px;width:184px;height:auto;border-right: 0">
              						<a href="main.html">教师管理</a>
              						<ul class="slideList">
              							<li class="slideDetail" id="allPage"  data-name="all"><a href="#" >所有</a></li>
              							<li class="slideDetail" id="searchPage"><a href="#">搜索</a></li>
              							<li class="slideDetail" id="addPage"><a href="#">添加</a></li>
              							<li class="slideDetail" id="updatePage"  data-name="update"><a href="#">修改</a></li>
              						</ul>
              					</li>');
		}
	?>
	<li data-name="recruit"><a href="recruit.html">招聘信息</a></li>
</ul>
