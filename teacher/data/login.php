<?php
    header('Content-Type:application/json');

    require('init.php');
    @$test=$_REQUEST['test'];

    session_start();
    if ($test==$_SESSION['RegisterVcode']){
        @$unumber=$_REQUEST['unumber'] or die('{"code":-1,"mess":"用户名不能为空"}');
        @$upwd=$_REQUEST['upwd'] or die('{"code":-2,"mess":"密码不能为空"}');

        $sql="SELECT uname,upowerId,teacherId FROM xt_user WHERE unumber='$unumber' AND upwd='$upwd'";
        $result=mysqli_query($conn,$sql);
        $rows=mysqli_fetch_row($result);
        if ($rows[1]==$unumber){
        $_SESSION['loginName']=$rows[0];
        $_SESSION['teacherId']=$rows[2];
        $_SESSION['uPower']=$rows[1];
            $output=[
                "code"=>1,
                "data"=>$rows;
            ];
        }else{
            $output=[
                "code"=>2
            ];
        }
    }else{
        $output=[
            "code"=>3
        ];
    }
    echo json_encode($output);