<?php
    header('Content-Type:application/json');

    require('init.php');

    $sql = "SELECT * FROM xt_user WHERE isapply=1 and upowerID=1";
    $result=mysqli_query($conn,$sql);
    $rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $data=[];
    $p=0;
    for($i=0;$i<count($rows);$i++){
    	$teacher = $rows[$i]["teacherId"];
    	$sql="SELECT * FROM xt_teacher WHERE tid='$teacher'";
    	$result=mysqli_query($conn,$sql);
    	$row = mysqli_fetch_all($result,MYSQLI_ASSOC)[0];
    	$cate = $row["categaryID"];
    	$sql = "SELECT cname FROM xt_categary WHERE cid='$cate'";
    	$result = mysqli_query($conn,$sql);
    	$categary = mysqli_fetch_row($result)[0];
    	$row["categary"]=$categary;
    	$data[$p++]=$row;
    }
    $output=[
    	"data"=>$data
    ];
    echo json_encode($output);
