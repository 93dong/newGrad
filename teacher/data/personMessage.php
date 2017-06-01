<?php
    header('Content-Type:application/json');

    require('init.php');

    $teacherId=$_REQUEST['teacherId'];

    $sql = "SELECT * FROM xt_teacher WHERE tid='$teacherId'";

    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_all($result,MYSQLI_ASSOC)[0];

	$id=$row["categaryID"];
	$sql = "SELECT * FROM xt_categary WHERE cid='$id'";
	$result=mysqli_query($conn,$sql);
    $categary=mysqli_fetch_all($result,MYSQLI_ASSOC)[0];
    $output = [
    	"data"=>$row,
    	"cate"=>$categary
    ];
    echo json_encode($output);
