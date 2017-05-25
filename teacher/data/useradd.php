<?php
    header('Content-Type:application/json');

    require('init.php');

    @$test=$_REQUEST['test'];
    session_start();
    if ($test==$_SESSION['RegisterVcode']){
        @$teacher=$_REQUEST['teacherId'];
        @$unumber=$_REQUEST['unumber'];
        @$name=$_REQUEST['name'];
        @$pwd=$_REQUEST['pwd'];
        @$admin=$_REQUEST['admin'];

        $sql="INSERT INTO xt_user VALUES(NULL,'$number','$name','$pwd','2')";
        $result=mysqli_query($conn,$sql);
        $output=[
                "code"=>1
            ];
    }else{
        $output=[
                "code"=>2
            ];
    }

    echo json_encode($output);