在说到ajax上传文件，之前的文章也有说过（详见：JS学习32：html5拖拽图片批量ajax无刷新进度上传）。ajax上传的时候，需要获得input:file选择的文件（可能为多个文件），获取其文件列表为：

// input标签的files属性
document.querySelector("#fileId").files
// 返回的是一个文件列表数组
获得的文件列表，然后遍历插入到表单数据当中。即：

// 获得上传文件DOM对象
var oFiles = document.querySelector("#fileId");


// 实例化一个表单数据对象
var formData = new FormData();



// 遍历图片文件列表，插入到表单数据中
for (var i = 0, file; file = oFiles[i]; i++) {
    // 文件名称，文件对象
    formData.append(file.name, file);
}
获得表单数据之后，就可以用ajax的POST上传。

// 实例化一个AJAX对象
var xhr = new XMLHttpRequest();
xhr.onload = function() {
    alert("上传成功！");
}
xhr.open("POST", "upload.php", true);

// 发送表单数据
xhr.send(formData);
上传到服务器之后，获取到文件列表为：

Array
(
    [jpg_jpg] => Array
        (
            [name] => jpg.jpg
            [type] => image/jpeg
            [tmp_name] => D:\xampp\tmp\phpA595.tmp
            [error] => 0
            [size] => 133363
        )

    [png_png] => Array
        (
            [name] => png.png
            [type] => image/png
            [tmp_name] => D:\xampp\tmp\phpA5A6.tmp
            [error] => 0
            [size] => 1214628
        )

)
在服务端循环遍历这个数组就可以上传文件了。