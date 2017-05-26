<?php
    header('Content-Type:application/json');

    require('init.php');

    $sql="SELECT * FROM xt_recruit";

    $result=mysqli_query($conn,$sql);

    $row=mysqli_fetch_all($result,MYSQLI_ASSOC);


    $output=[
        "data" => $row
    ];

    echo json_encode($output);