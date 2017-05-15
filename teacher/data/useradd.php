<?php
    header('Content-Type:application/json');

    require('init.php');

    @$number=$_REQUEST['number'];
    @$name=$_REQUEST['name'];
    @$pwd=$_REQUEST['pwd'];

    $sql="INSERT INTO xt_user VALUES(NULL,'$number','$name','$pwd','2')";
    $result=mysqli_query($conn,$sql);

    $output=[
        "code"=>1
    ];
    echo json_encode($output);