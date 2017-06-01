 <?php
    header('Content-Type:application/json');

    require('init.php');

    @$test=$_REQUEST['test'];
    session_start();
    if ($test==$_SESSION['RegisterVcode']){
        @$teacherId=$_REQUEST['teacherId'];
        @$unumber=$_REQUEST['unumber'];
        @$name=$_REQUEST['name'];
        @$pwd=$_REQUEST['pwd'];
        @$admin=$_REQUEST['admin'];
        if ($admin===null||$admin===''){
            $admin=2;
        }
        $sql="INSERT INTO xt_user VALUES(NULL,'$unumber','$name','$pwd','1','$teacherId','$admin')";
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