<?php
    header('Content-Type:application/json');

    require('init.php');

    @$rid = $_REQUEST["rid"];
    if($rid){
        $sql="DELETE FROM xt_recruit WHERE rid='$rid'";

        $result = mysqli_query($conn,$sql);

        if ($result){
            $output=[
                "code"=>'success'
            ];
            echo json_encode($output);
        }
    }

