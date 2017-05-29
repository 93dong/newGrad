<?php
    header('Content-Type:application/json');

    require('init.php');

    $search='tgender';

    @$categary=$_REQUEST['categary'];
    if($categary===null||$categary===''){
        $categary=0;
    }

    $search2='categaryID';//系别id

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

    @$pageNum=$_REQUEST['pageNum'];
    if ($pageNum===null){
        $pageNum=1;
    }

    $pageSize=8;

    $start=($pageNum-1)*$pageSize;



    if ($categary!=0){
        $sql="SELECT COUNT(*) FROM xt_teacher WHERE $search in('$gender1','$gender2')  AND $search2 in('$categary')";
            $result=mysqli_query($conn,$sql);

            $count=intval(mysqli_fetch_row($result)[0]);

            $count=ceil($count/$pageSize);
        $sql="SELECT xt_teacher.*,xt_categary.cname FROM xt_teacher,xt_categary WHERE xt_teacher.categaryID=xt_categary.cid AND $search in('$gender1','$gender2') AND $search2 in('$categary') order by $condition LIMIT $start,$pageSize";
    }else{
        $sql="SELECT COUNT(*) FROM xt_teacher WHERE $search in('$gender1','$gender2')";
            $result=mysqli_query($conn,$sql);

            $count=intval(mysqli_fetch_row($result)[0]);

            $count=ceil($count/$pageSize);
        $sql="SELECT xt_teacher.*,xt_categary.cname FROM xt_teacher,xt_categary WHERE xt_teacher.categaryID=xt_categary.cid AND $search in('$gender1','$gender2')   order by $condition LIMIT $start,$pageSize";
    }

    $result=mysqli_query($conn,$sql);

    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);

    //ceshi
    $sql="SELECT cname FROM xt_categary WHERE cid='$categary'";
    $result=mysqli_query($conn,$sql);
    $catename=mysqli_fetch_row($result);

    $sql="SELECT * FROM xt_categary";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $output=[
        'count'=>$count,
        'code'=>$rows,
        'sel'=>$row
    ];

    echo json_encode($output);