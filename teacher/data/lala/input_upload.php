<?php
    if(is_uploaded_file($_FILES['upfile']['tmp_name']))
    {
    $name='haha.jpg';
      if(move_uploaded_file($_FILES['upfile']['tmp_name'], 'E:/img/'.$name))
      {
        echo "1";
      }
      else
      {
        echo "2";
      }
    }




    $path='../img/';//路径
        $phtypes=array(
            'img/gif',
            'img/jpg',
            'img/jpeg',
            'img/bmp',
            'img/pjpeg',
            'img/x-png'
        );

        if($_SERVER['REQUEST_METHOD']=='POST'){
            if (!is_uploaded_file($_FILES["pic"]['tmp_name'])){
            echo "图片不存在";
            exit();
            }

            if(!is_dir('img')){//路径若不存在则创建
                mkdir('img');
            }

            $upfile=$_FILES["pic"];
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
            }
    //            echo "<img src=\"".$showphpath."\" hight=\"70\" width=\"95\" />";
        };

    //    $output=[
    //        'msg'=>'添加成功'
    //    ];
    //    echo json_encode($output);