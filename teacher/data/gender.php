 <?php
//gender year
header('Content-Type:application/json');

require('init.php');

$search='tgender';
@$gender1=$_REQUEST['gender'];
$gender2='';
if ($gender1===null||$gender1===''){
    $gender1='女';
    $gender2='男';
}
if ($gender1==1){
    $gender1='女';
    $gender2='';
}else if($gender1==2){
    $gender1='男';
    $gender2='';
}

@$condition=$_REQUEST['condition'];
if ($condition===null||$condition===''){
    $condition='tid';
}else if($condition==3){
    $codition='tyear';
}else if($condition==4){
    $condition='tage';
}

$sql="SELECT * FROM xt_teacher WHERE $search in('$gender1','$gender2') order by $condition";

$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,MYSQLI_ASSOC);

$output=[
    'data'=>$rows
];
echo json_encode($output);