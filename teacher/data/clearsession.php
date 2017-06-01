 <?php
    header('Content-Type:application/json');
    require('init.php');
    @$state=$_REQUEST['state'];
    if ($state==1){
        session_start();
        $_SESSION=array();
        $output=[
            "code"=>1
        ];
    }else{
        $output=[
            "code"=>2
        ];
    }

    echo json_encode($output);

