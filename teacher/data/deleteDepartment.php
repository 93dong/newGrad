<?php
    error_reporting(0);
    header('Content-Type:application/json');

    require('init.php');
     @$cid=$_REQUEST['cid'];
     @$clear=$_REQUEST['clear'];
    $sql="DELETE FROM xt_categary WHERE cid='$cid'";
    $result=mysqli_query($conn,$sql);
     $output=[
                'code'=>1
             ];
     if(@$_REQUEST['clear']){
        $sql="DELETE FROM xt_categary WHERE categary='$cid'";
     }
     echo json_encode($output);

