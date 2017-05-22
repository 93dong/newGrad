//判断登陆状态
(function(){
  //var userName=window.sessionStorage['uname']||window.localStorage['uname'];
  //var userPwd=window.sessionStorage['upwd']||window.localStorage['upwd'];
  //if(!userName){
  //  location.href='login.html';
  //}
  if (!$('#logo .user').has('span')){
    location.href='login.html';
  }
})();
//加载首尾，主体
$('#showStage').load('data/all.php',function(){
  fresh=function(){
    $.ajax({
      url:'data/query.php',
      success:function(message){
        var html='';
        var data=message.code;
        $.each(data,function(i,p){
          html+=`
									<li>
									<dl>
										<dt><img src="${p.pic}" alt=""/></dt>
										<dl>
											<ul>
												<li>姓名：<span data-name="name">${p.tname}</span></li>
												<li>系别：<span data-name="categary">${p.cname}</span></li>
												<li class="detail"><a href="#">详情</a></li>
											</ul>
										</dl>
									</dl>
								</li>
								`;
        });

        $('.show').html(html);
        var html1='<li><a href="1">回到首页</a></li>';
        var count=message.count;
        for(var i=1;i<6;i++){
          html1+=`
								<li><a href="${i}">${i}</a></li>
							`;
        }
        html1+=`<li><a href="${count}">最后一页</a></li>`;
        $('.pager').html(html1);
        $('.pager>li:nth-child(2)').addClass('active');

        var sel=message.sel;
        var html=`<li data-name="0">所有<li>`;
        $.each(sel,function(i,p){
          html+=`<li data-name="${p.cid}">${p.cname}</li>`
        });
        $('.selectOpt li div>ul').html(html);
      }
    });
  };
  fresh();
  var total=0;
  function update(pageNum,gender,condition,categaryId){
      if (!gender){
        gender='';
      }
      if (!condition){
        condition='';
      }
      $.ajax({
        url:`data/query.php?pageNum=${pageNum}&gender=${gender}&condition=${condition}&categary=${categaryId}`,
        success:function(message){
          var html='';
          var data=message.code;

          $.each(data,function(i,p){
            html+=`
							<li>
								<dl>
									<dt><img src="${p.pic}" alt=""/></dt>
									<dl>
										<ul>
											<li>姓名：<span data-name="name">${p.tname}</span></li>
											<li>系别：<span data-name="categary">${p.cname}</span></li>
											<li class="detail"><a href="#">详情</a></li>
										</ul>
									</dl>
								</dl>
							</li>`;
          });
          $('.show').html(html);
          total=message.count;

          var html='';
          var html='<li><a href="1">回到首页</a></li>&nbsp;';

          (total>4)&&(pageNum>total-2)&&(html+=`<li><a href="${pageNum-4}">${pageNum-4}</a></li>&nbsp;`);
          (total>3)&&(pageNum>total-1)&&(html+=`<li><a href="${pageNum-3}">${pageNum-3}</a></li>&nbsp;`);
          (total>2)&&(pageNum>2)&&(html+=`<li><a href="${pageNum-2}">${pageNum-2}</a></li>&nbsp;`);
          (total>1)&&(pageNum>1)&&(html+=`<li><a href="${pageNum-1}">${pageNum-1}</a></li>&nbsp;`);
          html+=`<li class="active"><a href="${pageNum}">${pageNum}</a></li>&nbsp;`;
          (total>1)&&(pageNum<total)&&(html+=`<li><a href="${pageNum+1}">${pageNum+1}</a></li>&nbsp;`);
          (total>2)&&(pageNum<total-1)&&(html+=`<li><a href="${pageNum+2}">${pageNum+2}</a></li>&nbsp;`);
          (total>3)&&(pageNum<2)&&(html+=`<li><a href="${pageNum+1}">${pageNum+3}</a></li>&nbsp;`);
          (total>4)&&(pageNum<3)&&(html+=`<li><a href="${pageNum+2}">${pageNum+4}</a></li>&nbsp;`);

          html+=`<li><a href="${total}">最后一页</a></li>`;
          $('ol.pager').html(html);
        }
      })
    }
  $('#showStage').on('click',' ol.pager li a',function(e){
      e.preventDefault();
      $(this).parent('li').addClass('active').siblings('li').removeClass('active');
      pageNum=parseInt($(this).attr('href'));
      var gender=$('.sel li a.curr[data-name="gender"]').attr('href');
      var condition=$('.sel li a.curr[data-name="condition"]').attr('href');
      var categary=$('.selectOpt div ul>li.select').attr('data-name');
      update(pageNum,gender,condition,categary);
    });
  $('#showStage').on('click','.selectOpt li a',function(e){
    e.preventDefault();
    $(this).siblings('div').toggleClass('out');
  });
  $('#showStage').on('click','.sel li a',function(e){
    e.preventDefault();
    $(this).toggleClass('curr');
    $(this).parent('li').siblings('li').children('a').removeClass('curr');
    var gender=$('.sel li a.curr[data-name="gender"]').attr('href');
    var condition=$('.sel li a.curr[data-name="condition"]').attr('href');
    var categary=$('.selectOpt div ul>li.select').attr('data-name');
    update(1,gender,condition,categary);
  });
  $('#showStage').on('click','.pages li>a',function(e){
    e.preventDefault();
    var pageNum=parseInt($('#showStage .pager>li[class="active"]>a').attr('href'));
    if ($(this).attr('href')==='gt'){
      (pageNum<total)&&(pageNum+=1);
    }else if ($(this).attr('href')==='lt'){
      (pageNum>1)&&(pageNum-=1);
    }
    var gender=$('.sel li a.curr[data-name="gender"]').attr('href');
    var condition=$('.sel li a.curr[data-name="condition"]').attr('href');
    var categary=$('.selectOpt div ul>li.select').attr('data-name');
    update(pageNum,gender,condition,categary);
    $(`#showStage .pager>li>a[href=${pageNum}]`).parent('li').addClass('active')
      .siblings('li').removeClass('active');
  });
  $('#showStage').on('click','.selectOpt div ul li',function(){
    $(this).addClass('select').siblings('li').removeClass('select');
    var categaryId=$(this).attr('data-name');
    var gender=$('.sel li a.curr[data-name="gender"]').attr('href');
    var condition=$('.sel li a.curr[data-name="condition"]').attr('href');

    update(1,gender,condition,categaryId);
  });
  $('#showStage').on('mouseleave','.selectOpt div',function(){
    $(this).removeClass('out');
  });
  $('#showstage').on('click','.detail a',function(){
    //$.ajax({
    //  url:'data/detail.php',
    //  success:function(){}
    //})
  });
});
//重构函数
//页面点击

$('#allPage').on('click',function(e){
  e.preventDefault();
  $(this).addClass('navsel').siblings('li').removeClass('navsel');
  $('#showStage').load('data/all.php',function(){
    fresh();
  });
});
$('#addPage').on('click',function(e){
  e.preventDefault();
  $(this).addClass('navsel').siblings('li').removeClass('navsel');
  $('#showStage').load('data/pageadd.php',function(){
    $.ajax({
      url:'data/query.php',
      success:function(data){
        var opt=data.sel;
        var html='<option value="0" >请选择</option>';
        $.each(opt,function(i,p){
          html+=`<option value="${p.cid}" >${p.cname}</option>`;
        });
        $('#tcategary').html(html);
      }
    });
    $('#tname').focus(function(){
      var msg='用户名可以是英文，汉字'
      $(this).siblings('span').html(msg);
    });
    $('#tname').blur(function(){
      if(this.validity.valueMissing){
        var msg='<img src="img/s_cancel.png" alt=""/>用户名不能为空';
        $(this).siblings('span').html(msg)
          .addClass('danger');
        this.setCustomValidity(msg);
      }else if(this.validity.tooShort){
        var msg='<img src="img/s_cancel.png" alt=""/>用户名不能少于2位';
        $(this).siblings('span').html(msg)
          .addClass('danger');
        this.setCustomValidity(msg);
      }else{
        var msg='<img src="img/s_success.png" alt=""/>';
        $(this).siblings('span').html(msg)
          .addClass('danger');
        this.setCustomValidity('');
      }
    });
    $('#tnation').blur(function(){
      if($('#tnation').val()==0){
        $('#tnation').siblings('span').html('<img src="img/s_cancel.png" alt=""/>民族一栏不能为空');
      }else{
        $('#tnation').siblings('span').html('<img src="img/s_success.png" alt=""/>');
      }
    });
    $('#tgender').blur(function(){
      if($('#tnation').val()==0){
        $('#tnation').siblings('span').html('<img src="img/s_cancel.png" alt=""/>民族一栏不能为空');
      }else{
        $('#tnation').siblings('span').html('<img src="img/s_success.png" alt=""/>');
      }
    });
    $('#tage').focus(function(){
      var msg='年龄必须介于18~80之间';
      $(this).siblings('span').html(msg);
      if($('#tnation').val()==0){
        $('#tnation').siblings('span').html('<img src="img/s_cancel.png" alt=""/>民族一栏不能为空');
      }else{
        $('#tnation').siblings('span').html('<img src="img/s_success.png" alt=""/>');
      }
      if($('#gender').children('input:checked').length===0){
        $('#gender').children('span').html('<img src="img/s_cancel.png" alt=""/>民族一栏不能为空');
      }else{
        $('#gender').children('span').html('<img src="img/s_success.png" alt=""/>');
      }
//				inputFocus(msg)
    });
    $('#tage').blur(function(){
      if(this.validity.rangeUnderflow){
        var msg='<img src="img/s_cancel.png" alt=""/>年龄不能小于18';
        $(this).siblings('span').html(msg)
          .addClass('danger');
        this.setCustomValidity(msg);
      }else if(this.validity.rangeOverflow){
        var msg='<img src="img/s_cancel.png" alt=""/>年龄不能大于80';
        $(this).siblings('span').html(msg)
          .addClass('danger');
        this.setCustomValidity(msg);
      }else if(this.value===''){
        var msg='<img src="img/s_cancel.png" alt=""/>年龄不能为空';
        $(this).siblings('span').html(msg)
          .addClass('danger');
        this.setCustomValidity(msg);
      }else{
        var msg='<img src="img/s_success.png" alt=""/>';
        $(this).siblings('span').html(msg)
          .addClass('danger');
        this.setCustomValidity('');
      }
    });
    $('#tyear').focus(function(){
      var msg='任教年限必须介于18~80之间';
      $(this).siblings('span').html(msg);
      if($('#tnation').val()==0){
        $('#tnation').siblings('span').html('<img src="img/s_cancel.png" alt=""/>任教年限不能为空');
      }else{
        $('#tnation').siblings('span').html('<img src="img/s_success.png" alt=""/>');
      }
    });
    $('#tyear').blur(function(){
      if(this.validity.rangeUnderflow){
        var msg='<img src="img/s_cancel.png" alt=""/>任教年限不能小于0';
        $(this).siblings('span').html(msg)
          .addClass('danger');
        this.setCustomValidity(msg);
      }else if(this.validity.rangeOverflow){
        var msg='<img src="img/s_cancel.png" alt=""/>任教年限不能大于80';
        $(this).siblings('span').html(msg)
          .addClass('danger');
        this.setCustomValidity(msg);
      }else if(this.value===''){
        var msg='<img src="img/s_cancel.png" alt=""/>任教年限不能为空';
        $(this).siblings('span').html(msg)
          .addClass('danger');
        this.setCustomValidity(msg);
      }else{
        var msg='<img src="img/s_success.png" alt=""/>';
        $(this).siblings('span').html(msg)
          .addClass('danger');
        this.setCustomValidity('');
      }
    });
    $('#tphone').focus(function(){
      var msg='联系方式为11位数字';
      $(this).siblings('span').html(msg);
    });
    $('#tphone').blur(function(){
      if(this.validity.patternMismatch){
        var msg='<img src="img/s_cancel.png" alt=""/>格式不正确请重新输入';
        $(this).siblings('span').html(msg)
          .addClass('danger');
        this.setCustomValidity(msg);
      }else if(this.validity.valueMissing){
        var msg='<img src="img/s_cancel.png" alt=""/>不能为空';
        $(this).siblings('span').html(msg)
          .addClass('danger');
        this.setCustomValidity(msg);
      }else{
        var msg='<img src="img/s_success.png" alt=""/>';
        $(this).siblings('span').html(msg).addClass('danger');
        this.setCustomValidity('');
      }
    });
    $('#tgradSchool').focus(function(){
      $(this).siblings('span').html('请输入毕业院校');
    });
    $('#tgradSchool').blur(function(){
      if(this.validity.valueMissing){
        $(this).siblings('span').html('<img src="img/s_cancel.png">毕业院校不能为空');
      }
    });
    $('#tcategary').blur(function(){
      if($('#tcategary').val()==0){
        $('#tcategary').siblings('span').html('<img src="img/s_cancel.png" alt=""/>系部不能为空');
      }else{
        $('#tcategary').siblings('span').html('<img src="img/s_success.png" alt=""/>');
      }
    });
    /*实现图片预览*/
    $(document).ready(function(){
      $('#tpic').change(function(){
        var fil=this.files;
        for(var i=0;i<fil.length;i++){
          reads(fil[i]);
        }
      });
    });
    function reads(fil){
      var reader=new FileReader();
      reader.readAsDataURL(fil);
      reader.onload=function(){
        $('.imgShow').html(`<img src="${reader.result}" alt=""/>`);
      }
    }

  })
});
$('#updatePage').on('click',function(e){
  e.preventDefault();
  $(this).addClass('navsel').siblings('li').removeClass('navsel');
  var total=0;
  function updatedetail(pageNum){
    $.ajax({
      url:`data/query.php?pageNum=${pageNum}`,
      success:function(message){
        var data=message.code;
        var updatehtml=`<h2>教师列表</h2>
				<table>
					<thead>
						<tr>
							<th>请选择</th>
							<th>图片</th>
							<th>编号</th>
							<th>姓名</th>
							<th>性别</th>
							<th>年龄</th>
							<th>民族</th>
							<th>所在系别</th>
							<th>毕业院校</th>
							<th>联系方式</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>`;
        $.each(data,function(i,p){
          updatehtml+=`<tr>
							<td><input type="checkbox" value="${p.tid}"/></td>
							<td class="headimg"><img src="${p.pic}" alt=""/></td>
							<td>${p.tid}</td>
							<td>${p.tname}</td>
							<td>${p.tgender}</td>
							<td>${p.tage}</td>
							<td>${p.tnation}</td>
							<td>${p.cname}</td>
							<td>${p.gradSchool}</td>
							<td>${p.tphone}</td>
							<td class="searchdetail"><a href="${p.tid}">修改</a></td>
						</tr>`;
        });
        updatehtml+=`</tbody></table>`;
        updatehtml+=`<div class="jump">
					<p>未选中任何选项删除，请重新选择！</p>
					<a href="#">确定</a>
				</div>`;
        updatehtml+=`<div class="central">
					<ul class="operate">
					  <li><input type="checkbox" class="checkall"/>全选/取消全选</li>
						<li><a href="delete">删除</a></li>
					</ul>
					<ol class="pager" data-name="update">
					</ol>
				</div>`;
        $('#showStage').html(updatehtml);
        total=message.count;

        var html='';
        var html='<li><a href="1">回到首页</a></li>&nbsp;';

        (total>4)&&(pageNum>total-2)&&(html+=`<li><a href="${pageNum-4}">${pageNum-4}</a></li>&nbsp;`);
        (total>3)&&(pageNum>total-1)&&(html+=`<li><a href="${pageNum-3}">${pageNum-3}</a></li>&nbsp;`);
        (total>2)&&(pageNum>2)&&(html+=`<li><a href="${pageNum-2}">${pageNum-2}</a></li>&nbsp;`);
        (total>1)&&(pageNum>1)&&(html+=`<li><a href="${pageNum-1}">${pageNum-1}</a></li>&nbsp;`);
        html+=`<li class="active"><a href="${pageNum}">${pageNum}</a></li>&nbsp;`;
        (total>1)&&(pageNum<total)&&(html+=`<li><a href="${pageNum+1}">${pageNum+1}</a></li>&nbsp;`);
        (total>2)&&(pageNum<total-1)&&(html+=`<li><a href="${pageNum+2}">${pageNum+2}</a></li>&nbsp;`);
        (total>3)&&(pageNum<2)&&(html+=`<li><a href="${pageNum+1}">${pageNum+3}</a></li>&nbsp;`);
        (total>4)&&(pageNum<3)&&(html+=`<li><a href="${pageNum+2}">${pageNum+4}</a></li>&nbsp;`);

        html+=`<li><a href="${total}">最后一页</a></li>`;
        $('ol.pager').html(html);
      }
    })
  }
  $.ajax({
    url:'data/query.php',
    success:function(message){
      updatedetail(1);
    }
  });
  $('#showStage').on('click','.jump a',function(e){
    e.preventDefault();
    $(this).parent('div').removeClass('jumpout');
  });
  $('#showStage').on('click','ol.pager[data-name="update"] li a',function(e){
    e.preventDefault();
    $(this).parent('li').addClass('active').siblings('li').removeClass('active');
    pageNum=parseInt($(this).attr('href'));
    updatedetail(pageNum);
  });
  $('#showStage').on('click','tbody [type="checkbox"]',function(){
    var check=$("tbody [type='checkbox']:checked");
    if(check.length==$("tbody [type='checkbox']").length){
      $(".operate [type='checkbox']").prop("checked",true)
    }else{
      $(".operate [type='checkbox']").prop("checked",false)
    }
  });
  $('#showStage').on('click','.operate [type="checkbox"]',function(){
    $("tbody [type='checkbox']").prop("checked",$(this).prop("checked"))
  });
  $('#showStage').on('click','.operate a[href="delete"]',function(e){
    e.preventDefault();
    var page=$('.pager li.active').children('a').attr('href');
    var checkID=$('tbody input');
    var tid=[];
    for( var i in checkID){
      if(checkID[i].checked){
        tid.push(parseInt(checkID[i].value));
      }
    }
    if(tid.length>0){
      $.ajax({
        url:`data/delete.php`,
        data:`tid1=${tid[0]}&tid2=${tid[1]}&tid3=${tid[2]}&tid4=${tid[3]}&tid5=${tid[4]}&tid6=${tid[5]}&tid7=${tid[6]}&tid8=${tid[7]}`,
        success:function(code){
          updatedetail(page);
        }
      });
    }else{
      $('.jump').addClass('jumpout');
    }
    //$.ajax({
    //  //tid1=${tid[0]}&tid2=${tid[1]}&tid3=${tid[2]}&tid4=${tid[3]}&tid5=${tid[4]}&tid6=${tid[5]}&tid7=${tid[6]}&tid8=${tid[8]}
    //  url:`data/delete.php?tid1=${tid[0]}&tid2=${tid[1]}&tid3=${tid[2]}&tid4=${tid[3]}&tid5=${tid[4]}&tid6=${tid[5]}&tid7=${tid[6]}&tid8=${tid[7]}`,
    //  success:function(){
    //    update(page);
    //  },
    //  error:function(){
    //    console.log(error);
    //  }
    //})
    //var xhr=new XMLHttpRequest();
    //xhr.onreadystateresponse=function(){
    //  if (xhr.readyState===4)
    //  {
    //    if (xhr.status===200)
    //    {
    //      doResponse();
    //    }
    //  }
    //}
    //xhr.open('GET',`data/delete.php?tid1=${tid[0]}&tid2=${tid[1]}&tid3=${tid[2]}&tid4=${tid[3]}&tid5=${tid[4]}&tid6=${tid[5]}&tid7=${tid[6]}&tid8=${tid[7]}`,true);
    //xhr.send(null);
    //function doResponse(){
    //  console.log('error');
    //}
  });
  $('#showStage').on('click','tbody .searchdetail a',function(e){
    e.preventDefault();

    var dnum=$(this).attr('href');
    $.ajax({
      url:`data/detail.php?tid=${dnum}`,
      success:function(data){
        var detail=data.code;
        var categaryname=data.categaryname.cname;
        var html=`<div class="userdetail">
					<div class="imgShow">
					<img src="${detail.pic}" alt=""/>
					</div>
					<form id="updatedetail" method="post" action="data/add.php" enctype="multipart/form-data">
					<ul class="detaillist">
            <li>姓名：</li>
            <li>
            <i>${detail.tname}</i>
            <input type="text" name="tname" class="modification" autofocus>
            <span class="clickupdate glyphicon glyphicon-pencil"></span>
            </li>
            <li>民族：</li>
            <li>
              <i>${detail.tnation}</i>
              <input type="text" name="tnation" class="modification" autofocus>
              <span class="clickupdate glyphicon glyphicon-pencil"></span>
            </li>
            <li>性别：</li>
            <li>
              <i>${detail.tgender}</i>
              <input type="text" name="tgender" class="modification" autofocus>
              <span class="clickupdate glyphicon glyphicon-pencil"></span>
            </li>
            <li>年龄：</li>
            <li>
              <i>${detail.tage}</i>
              <input type="text" name="tage" class="modification" autofocus>
              <span class="clickupdate glyphicon glyphicon-pencil"></span>
            </li>
            <li>院系：</li>
            <li>
              <i>${categaryname}</i>
              <input type="text" name="categaryID" class="modification" autofocus>
              <span class="clickupdate glyphicon glyphicon-pencil"></span>
            </li>
            <li>任教年限：</li>
            <li>
              <i>${detail.tyear}</i>
              <input type="text" name="tyear" class="modification" autofocus>
              <span class="clickupdate glyphicon glyphicon-pencil"></span>
            </li>
            <li>联系方式：</li>
            <li>
              <i>${detail.tphone}</i>
              <input type="text" name="tphone" class="modification" autofocus>
              <span class="clickupdate glyphicon glyphicon-pencil"></span>
            </li>
            <li>毕业院校：</li>
            <li>
              <i>${detail.gradSchool}</i>
              <input type="text" name="gradSchool" class="modification" autofocus>
              <span class="clickupdate glyphicon glyphicon-pencil"></span>
            </li>
						</ul>
					</form>
				</div>
				<p class="affirmBtn"><input id="submitupdate" type="button" value="提交"/></p>`;
        $('#showStage').html(html);
      }
    });
    $('#showStage').on('click','.clickupdate',function(){
      var type=$(this).attr('data-name');
      $(this).siblings('input').css('display','inline-block').siblings('i').css('display','none');
    });
    //$('#showStage').on('click',':not(.clickupdate)',function(){
    //  $('.clickupdate').siblings('input').css('display','none').siblings('i').css('display','inline-block');
    //});
    $('#showStage').on('blur','.modification',function(){
      var html=$(this).val();
      if(!html){
        $(this).css('display','none').siblings('i').css('display','inline-block');
      }else{
        $(this).siblings('i').html(html).css('display','inline-block');
        $(this).css('display','none');
      }
    });
    $('#showStage').on('click','#submitupdate',function(){
      var inputs=$('.detaillist input');
      var inputlength=inputs.length;
      for(var i=0,sel=[],p=0;i<inputlength;i++){
        var v=inputs[i].value;
        var k=inputs[i].name;
        if (v!==''){
          sel[p]=[k,v];
          p++;
        }
      }
      console.log(sel);
      var arr=JSON.stringify(sel);
      console.log(arr);
      $.ajax({
        url:`data/update.php`,
        data:{sel:arr,tid:dnum},
        success:function(data){
          $('#showStage').html('<h1>修改成功</h1><a class="back" href="#">返回</a>');
          $('#showStage').on('click','.back',function(){
            location.href='main.html';
          })
        }
      })
    })
  })
});
$('#searchPage').on('click',function(e){
  e.preventDefault();
  $(this).addClass('navsel').siblings('li').removeClass('navsel');
  var html=`<form class="find">
					<span>请选择您要搜索的类型：</span>
					<select name="condition">
						<option value="tname">姓名</option>
						<option value="tage">年龄</option>
						<option value="tnation">民族</option>
						<option value="tyear">任教年限</option>
						<option value="tphone">联系方式</option>
					</select><br>
					<div>
						<input type="text" name="find"/>
						<ul class="findresult"></ul>
					</div>
					<input type="button" value="查询"/>
				</form>`;
  $('#showStage').html(html);
  //var oldvalue=$('')
  $('#showStage').on('change','select[name="condition"]',function(){
    $('.findresult').css('display','none');
    $('input[name="find"]').val('');
  });
  $('#showStage').on('keyup','.find input[name="find"]',function(){
    var condition=$('.find select').val();
    var search=$('.find input[name="find"]').val();
    $.ajax({
      url:`data/search.php?condition=${condition}&search=${search}`,
      success:function(data){
        var html='';
        var name=condition;
        var message=data.code;
        for(var i=0;i<message.length;i++){
          switch (condition){
            case 'tname':html+=`<li data-name="${message[i].tid}">${message[i].tname}</li>`;break;
            case 'tage':html+=`<li data-name="${message[i].tid}">${message[i].tage}</li>`;break;
            case 'tnation':html+=`<li data-name="${message[i].tid}">${message[i].tnation}</li>`;break;
            case 'tyear':html+=`<li data-name="${message[i].tid}">${message[i].tyear}</li>`;break;
            case 'tphone':html+=`<li data-name=${message[i].tid}>${message[i].tphone}</li>`;break;
          }
        }
        $('.findresult').html(html).css('display','block');
      }
    });

  });
  $('#showStage').on('click','.findresult>li',function(){
    e.preventDefault();

    var dnum=$(this).attr('data-name');
    $.ajax({
      url:`data/detail.php?tid=${dnum}`,
      success:function(data){
        var detail=data.code;
        var categaryname=data.categaryname.cname;
        var html=`<div class="userdetail">
					<div class="imgShow">
					<img src="${detail.pic}" alt=""/>
					</div>
					<form id="updatedetail" method="post" action="data/add.php" enctype="multipart/form-data">
					<ul class="detaillist">
            <li>姓名：</li>
            <li>
            <i>${detail.tname}</i>
            <input type="text" name="tname" class="modification" autofocus>
            </li>
            <li>民族：</li>
            <li>
              <i>${detail.tnation}</i>
              <input type="text" name="tnation" class="modification" autofocus>
            </li>
            <li>性别：</li>
            <li>
              <i>${detail.tgender}</i>
              <input type="text" name="tgender" class="modification" autofocus>
            </li>
            <li>年龄：</li>
            <li>
              <i>${detail.tage}</i>
              <input type="text" name="tage" class="modification" autofocus>
            </li>
            <li>院系：</li>
            <li>
              <i>${categaryname}</i>
              <input type="text" name="categaryID" class="modification" autofocus>
            </li>
            <li>任教年限：</li>
            <li>
              <i>${detail.tyear}</i>
              <input type="text" name="tyear" class="modification" autofocus>
            </li>
            <li>联系方式：</li>
            <li>
              <i>${detail.tphone}</i>
              <input type="text" name="tphone" class="modification" autofocus>
            </li>
            <li>毕业院校：</li>
            <li>
              <i>${detail.gradSchool}</i>
              <input type="text" name="gradSchool" class="modification" autofocus>
            </li>
						</ul>
					</form>
				</div>
				<p class="affirmBtn"><a id="returnmain" href="#">返回</a></p>`;
        $('#showStage').html(html);
      }
    });
    $('#showStage').on('click','.affirmBtn #returnmain',function(e){
      e.preventDefault();
      location.href='main.html';
    })
  });
  $('#showStage').on('click','.find input[type="button"]',function(){
    var condition=$('.find select').val();
    var search=$('.find input[name="find"]').val();
      $.ajax({
        url:`data/search.php?condition=${condition}&search=${search}`,
        success:function(data){

        }
      })
  });



});

//detail=function(tid){
//  $.ajax({
//    url:`data/search.php?condition=tid&search=${tid}`,
//    success:function(data){
//
//
//    }
//  })
//}
$(".slideDown").mouseup(function(event) {
  $(this).children('.slideList').slideToggle();
});