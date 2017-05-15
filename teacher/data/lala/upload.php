<?
$path='img/';//路径
$phtypes=array(
'img/gif',
'img/jpg',
'img/jpeg',
'img/bmp',
'img/pjpeg',
'img/x-png'
);
?>
<html><body>
<form method="post" enctype="multipart/form-data" name="form1">
<table>
<tr><td>上传图片</td></tr>
<tr><td><input type="file" name="photo" size="20" /></td></tr>
<tr><td><input type="submit" value="上传"/></td></tr>
</table>
允许上传的文件类型为:<?=implode(', ',$phtypes)?></form>
<?php
if($_SERVER['REQUEST_METHOD']=='POST'){

if (!is_uploaded_file($_FILES["photo"]['name'])){
echo "图片不存在";
exit();
}

if(!is_dir('img')){//路径若不存在则创建
mkdir('img');
}

$upfile=$_FILES["photo"];
$pinfo=pathinfo($upfile["name"]);
$name=$pinfo['basename'];//文件名
$tmp_name=$upfile["tmp_name"];
$file_type=$pinfo['extension'];//获得文件类型
$showphpath=$path.$name;

if(in_array($upfile["type"],$phtypes)){
echo "文件类型不符！";
exit();
}
if(move_uploaded_file($tmp_name,$path.$name)){
echo "成功！";
//}
//echo "<img src=\"".$showphpath."\" hight=\"70\" width=\"95\" />";
}
?>
</body>
</html>