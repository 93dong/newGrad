 <?php
    header('Content-Type:application/json');

    require('init.php');

    @$condition=$_REQUEST['condition'];
    @$search=$_REQUEST['search'];

    $sql="SELECT * FROM xt_teacher WHERE $condition LIKE '%$search%' order by $condition";

    $result=mysqli_query($conn,$sql);

    $row=mysqli_fetch_all($result,MYSQLI_ASSOC);

    $output=[
        "code"=>$row
    ];

    echo json_encode($output);