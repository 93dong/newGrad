<?php
    error_reporting(0);
    header('Content-Type:application/json');

    require('init.php');
     @$admin=$_REQUEST['admin'];
     @$teacherId=$_REQUEST['teacherId'];
     if($admin=='1'){
        $sql = "SELECT categaryId FROM xt_teacher WHERE tid='$teacherId'";
        $result=mysqli_query($conn,$sql);
        $departmentId=mysqli_fetch_row($result)[0];
        $sql="SELECT * FROM xt_categary WHERE cid='$departmentId'";


        $result=mysqli_query($conn,$sql);
        $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
     }
     if($admin=='0'){
        $sql="SELECT * FROM xt_categary";
        $result=mysqli_query($conn,$sql);
        $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
     };
     $output=[
                'data'=>$rows
             ];
     echo json_encode($output);

