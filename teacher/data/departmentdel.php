<?php
    error_reporting(0);
    header('Content-Type:application/json');

    require('init.php');
     @$did=$_REQUEST['did'];
     echo($did);
     $sql = "DELETE FROM xt_categary WHERE cid='$did'";
     $result = mysqli_query($conn,$sql);

     $sql = "DELETE FROM xt_teacher WHERE categaryId ='$did'";

     $result = mysqli_query($conn,$sql);
     $output =[
        "code"=>1
     ];
     echo json_encode($output);

