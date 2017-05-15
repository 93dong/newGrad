<?php
    header('Content-Type:text.html');
    @$tid=$_REQUEST['tid'];
?>
<div class="userdetail">
    <div class="imgShow" data-name=<?php echo $tid;?>>
    </div>
    <form id="add" method="post" action="data/add.php" enctype="multipart/form-data">
        <ul>
            <li>
                <label for="tname" >姓名：</label>
            </li>
            <li>
                <input id="tname" type="text" name="name" required minlength="2" autofocus/>
                <span></span>
            </li>
            <li>
                <label for="tnation">民族：</label>
            </li>
            <li>
                <select id="tnation" name="nation">
                    <option value="0" >请选择</option>
                    <option value="汉族" >民族1</option>
                    <option value="维吾尔族" >维吾尔族</option>
                    <option value="傣族" >傣族</option>
                    <option value="苗族" >苗族</option>
                </select>
                <span></span>
            </li>
            <li>
                <label for="gender">性别：</label>
            </li>
            <li id="gender">
                <input  type="radio" name="gender" value="男"/>男
                <input  type="radio" name="gender" value="女"/>女
                <span></span>
            </li>
            <li>
                <label for="tage">年龄：</label>
            </li>
            <li>
                <input id="tage" type="number" name="age" min="18" max="80"/>
                <span></span>
            </li>
            <li>
                <label for="tyear">任教年限：</label>
            </li>
            <li>
                <input id="tyear" type="number" name="year" min="0" max="80"/>
                <span></span>
            </li>
            <li>
                <label for="tphone">联系方式：</label>
            </li>
            <li>
                <input id="tphone" type="text" name="phone" pattern="1[34578]\d{9}" required/>
                <span></span>
            </li>
            <li>
                <label for="tgradSchool">毕业院校：</label>
            </li>
            <li>
                <input id="tgradSchool" type="text" name="gradSchool" required/>
                <span></span>
            </li>
            <li>
                <label for="tcategary">院系：</label>
            </li>
            <li>
                <select name="categaryID" id="tcategary">
                    <option value="0">请选择</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <span></span>
            </li>
            <li>
                <label for="tpic">图片：</label>
            </li>
            <li>
                <input id="tpic" type="file" name="photo" require/>
                <span></span>
            </li>
        </ul>
    </form>
    <p class="submitBtn"><input id="subBtn" type="submit" form="add" value="提交"/></p>
</div>