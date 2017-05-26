<?php
    error_reporting(0);
    header('Content-Type:application/json');

    require('init.php');
    @$id=$_REQUEST['categaryId'];
    $sql = "SELECT * FROM xt_categary WHERE cid='$id'";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $sql = "SELECT COUNT(*) FROM xt_teacher WHERE categaryID='$id'";
    $result=mysqli_query($conn,$sql);
    $count=intval(mysqli_fetch_row($result)[0]);
     $output=[
                'data'=>$rows,
                'count'=>$count
             ];
     echo json_encode($output);

