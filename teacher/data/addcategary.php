<?php
    header('Content-Type:application/json');

    require('init.php');

    @$departmentName=$_REQUEST['departmentName'];
     @$departmentSchool=$_REQUEST['departmentSchool'];
     @$departmentStuNum=$_REQUEST['departmentStuNum'];
     @$departmentIntro=$_REQUEST['departmentIntro'];
     $sql = "INSERT INTO xt_categary VALUES(NULL,'$departmentName','$departmentSchool','$departmentStuNum','$departmentIntro')";
     $result = mysqli_query($conn,$sql);
     if($result){
        $output=[
             'code'=>1
        ];
     }else{
        $output=[
            'code'=>2
         ];
     }

     echo json_encode($output);