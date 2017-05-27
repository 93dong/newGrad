<?php
    header('Content-Type:application/json');

       require('init.php');

    $rid=$_REQUEST['rid'];
    $uid=$_REQUEST['uid'];
    $sql = "UPDATE xt_teacher SET recruitID = '$rid' WHERE tid= $uid";
    $result = mysqli_query($conn,$sql);
    $output=[
    	"code"=>1
    ];
    echo json_encode($output);
