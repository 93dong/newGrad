<?php
    header('Content-Type:application/json');

    require('init.php');
    $tid=$_REQUEST['tid'];
    $arr=$_REQUEST['sel'];
    $sel=json_decode($arr,true);
    $l=count($sel);
    for($i=0;$i<$l;$i++){
        $k=$sel[$i][0];
        $v=$sel[$i][1];
        $sql="UPDATE xt_teacher SET $k = '$v' WHERE tid= $tid";
        $result=mysqli_query($conn,$sql);
    }
    $output=[
        "code"=>$sel
    ];
    echo json_encode($output);