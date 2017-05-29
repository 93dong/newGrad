<?php
    header('Content-Type:application/json');

    require('init.php');

    @$jobname=$_REQUEST['jobname'];
    @$jobnum=$_REQUEST['jobnum'];
    @$jobrequest0=$_REQUEST['jobrequest0'];
    if(@$_REQUEST['jobrequest1']){
        @$jobrequest1=$_REQUEST['jobrequest1'];
    }else{
       @$jobrequest1='';
    };
    if(@$_REQUEST['jobrequest2']){
        @$jobrequest2=$_REQUEST['jobrequest2'];
    }else{
          @$jobrequest2='';
    };
    if(@$_REQUEST['jobrequest3']){
        @$jobrequest3=$_REQUEST['jobrequest3'];
    }else{
           @$jobrequest3='';
    };
    if(@$_REQUEST['jobrequest4']){
        @$jobrequest4=$_REQUEST['jobrequest4'];
    }else{
           @$jobrequest4='';
    };

    $jobintro=$_REQUEST['jobintro'];
    $id = $_REQUEST['id'];
    $time = $_REQUEST['time'];


	$sql = "INSERT INTO xt_request VALUES(NULL,'$jobrequest0','$jobrequest1','$jobrequest2','$jobrequest3','$jobrequest4')";
	$result = mysqli_query($conn,$sql);

	$resquestid = mysqli_insert_id($conn);
	echo ($resquestid);

	$sql = "SELECT * FROM xt_user WHERE teacherId='$id'";
	$result = mysqli_query($conn,$sql);
	$userdata = mysqli_fetch_all($result,MYSQLI_ASSOC)[0];
	$teacherid = $userdata["teacherId"];

	$sql = "INSERT INTO xt_recruit VALUES(NULL,'$jobname','$time','$teacherid','$jobintro','$jobnum','$resquestid')";
	$result = mysqli_query($conn,$sql);
	$rid = mysqli_insert_id($conn);
	if($rid!=0){
	    $output=[
	        "code"=>1
	    ];
	}else{
	    $output=[
	        "code"=>2
	    ];
	}
        echo json_encode($output);