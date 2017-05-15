<?php
    header('Content-Type:application/json');

    require('init.php');

    $tid1=$_REQUEST['tid1'];
    @$tid2=$_REQUEST['tid2'];
//    ($tid2==null||$tid2==='')&&$tid2='';
    @$tid3=$_REQUEST['tid3'];
//    ($tid3==null||$tid3==='')&&$tid3='';
    @$tid4=$_REQUEST['tid4'];
//    ($tid4==null||$tid4==='')&&$tid4='';
    @$tid5=$_REQUEST['tid5'];
//    ($tid5==null||$tid5==='')&&$tid5='';
    @$tid6=$_REQUEST['tid6'];
//    ($tid6==null||$tid6==='')&&$tid6='';
    @$tid7=$_REQUEST['tid7'];
//    ($tid7==null||$tid7==='')&&$tid7='';
    @$tid8=$_REQUEST['tid8'];
//    ($tid8==null||$tid8==='')&&$tid8='';


    $sql="DELETE FROM xt_teacher WHERE tid in('$tid1','$tid2','$tid3','$tid4','$tid5','$tid6','$tid7','$tid8')";

    $result=mysqli_query($conn,$sql);

    if ($result){
        $output=[
            "code"=>'success'
        ];
        echo json_encode($output);
    }
