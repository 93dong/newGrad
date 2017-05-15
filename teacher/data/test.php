<?php
    header('Content-Type:image/png');
    $w=80;
    $h=25;
    $img=imagecreatetruecolor($w,$h);
    $c=imagecolorallocate($img,rand(180,240),rand(180,240),rand(180,240));
    imagefilledrectangle($img,0,0,$w,$h,$c);

    $src='ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $code='';
    for($i=0;$i<4;$i++){
        $char=$src[rand(0,strlen($src)-1)];
        $code.=$char;
        $c=imagecolorallocate($img,rand(0,100),rand(50,150),rand(150,240));
        imagettftext($img,rand(16,18),rand(-20,20),20*$i+5,rand(18,$h),$c,'../res/simhei.ttf',$char);
    }
    for($i=0;$i<50;$i++){
        $r=rand(1,3);
        $c=imagecolorallocate($img,rand(50,100),rand(80,100),rand(50,100));
        imagefilledellipse($img,rand(0,$w),rand(0,$h),$r,$r,$c);
    }
    session_start();
    $_SESSION['RegisterVcode']=$code;

    imagepng($img);
    imagedestroy($img);