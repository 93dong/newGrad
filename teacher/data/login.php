<?php
    header('Content-Type:application/json');

    require('init.php');
    @$test=$_REQUEST['test'];

    session_start();
    if ($test==$_SESSION['RegisterVcode']){
        @$unumber=$_REQUEST['unumber'] or die('{"code":-1,"mess":"用户名不能为空"}');
        @$upwd=$_REQUEST['upwd'] or die('{"code":-2,"mess":"密码不能为空"}');

        $sql="SELECT unumber,uname,upowerId,teacherId FROM xt_user WHERE unumber='$unumber' AND upwd='$upwd'";
        $result=mysqli_query($conn,$sql);
        $rows=mysqli_fetch_all($result,MYSQLI_ASSOC)[0];
        if ($rows["unumber"]==$unumber){
                $_SESSION['loginName']=$rows["uname"];
                $_SESSION['teacherId']=$rows["teacherId"];
                $_SESSION['uPower']=$rows["upowerId"];
                    $output=[
                        "code"=>1,
                        "data"=>$rows
                    ];
                }else{
                    $output=[
                        "code"=>2
                    ];
                }
    }else if(@$_REQUEST['teacherId']){
        @$teacherId=$_REQUEST['teacherId'];
        @$oldpwd=$_REQUEST['oldpwd'];
        @$newpwd=$_REQUEST['newpwd'];
        $sql = "SELECT * FROM xt_user WHERE teacherId = '$teacherId'";
        $result=mysqli_query($conn,$sql);
        $data =mysqli_fetch_all($result,MYSQLI_ASSOC)[0];
        $old = $data["upwd"];
        if($old == $oldpwd){
            $sql = "UPDATE xt_user SET upwd = '$newpwd' WHERE teacherId='$teacherId'";
            $result=mysqli_query($conn,$sql);
            $output=[
                        "code"=>4
                    ];
        }else{
            $output=[
                        "code"=>5
                    ];
        }

    }else{
       $output=[
                   "code"=>3
               ];
    }
    echo json_encode($output);