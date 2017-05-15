<?php
    header('Content-Type:application/json');

    require('init.php');

    $tid=$_REQUEST['tid'];

    $sql="SELECT * FROM xt_teacher WHERE tid='$tid'";
    $result=mysqli_query($conn,$sql);

    $row=mysqli_fetch_assoc($result);

    $id=$row['categaryID'];
    $sql="SELECT cname FROM xt_categary WHERE cid=$id";
    $result=mysqli_query($conn,$sql);
    $cateid=mysqli_fetch_assoc($result);

    $output=[
        "code"=>$row,
        "categaryname"=>$cateid
    ];
    echo json_encode($output);