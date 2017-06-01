<?php
    header('Content-Type:application/json');

    require('init.php');

    @$teacherId=$_REQUEST['teacherId'];
    @$agree=$_REQUEST["agree"];
    if(@$agree==1){
        $sql = "UPDATE xt_user set upowerID=0,isapply=0 WHERE teacherId='$teacherId'";
        $result=mysqli_query($conn,$sql);
        $output=[
            "code"=>1
        ];
    }else{
        $sql="UPDATE xt_user set isapply=0 WHERE teacherId='$teacherId'";
        $result=mysqli_query($conn,$sql);
                $output=[
                    "code"=>2
                ];
    }

    echo json_encode($output);