<?php
    error_reporting(0);
    header('Content-Type:application/json');

    require('init.php');

    @$rid = $_REQUEST["rid"];
    $sql="SELECT * FROM xt_recruit WHERE rid='$rid'";
    $result = mysqli_query($conn,$sql);
    $rows = mysqli_fetch_all($result,MYSQLI_ASSOC)[0];

    $unumber = (int)$rows["rfabu"];
    $sql = "SELECT * FROM xt_user WHERE teacherid = '$unumber'";
    $result = mysqli_query($conn,$sql);
    $udata = mysqli_fetch_all($result,MYSQLI_ASSOC);

    $sql = "SELECT pic FROM xt_teacher WHERE tid = '$unumber'";
    $result = mysqli_query($conn,$sql);
    $picpath = mysqli_fetch_all($result,MYSQLI_ASSOC)[0];

    $requestid = $rows["requestid"];
    $sql = "SELECT * FROM xt_request WHERE rid = '$requestid'";
    $result = mysqli_query($conn,$sql);
    $requestdata = mysqli_fetch_all($result,MYSQLI_ASSOC)[0];

    $sql = "SELECT * FROM xt_teacher WHERE recruitID = '$rid'";
    $result = mysqli_query($conn,$sql);
    $apply = mysqli_fetch_all($result,MYSQLI_ASSOC);

    $output=[
        "rdata"=>$rows,
        "udata"=>$udata,
        "redata"=>$requestdata,
        "picpath"=>$picpath,
        "apply"=>$apply
    ];
    echo json_encode($output);


