<?php
    header('Content-Type:application/json');

    require('init.php');

    @$teacherId=$_REQUEST['teacherId'];
	$sql="SELECT COUNT(*) from xt_teacher where tid = '$teacherId'";
	$result=mysqli_query($conn,$sql);
	$count=intval(mysqli_fetch_row($result)[0]);
	if($count>0){
		$output=[
			"code"=>1
		];
	}else{
		$output=[
			"code"=>2
		];
	}
	echo json_encode($output);

