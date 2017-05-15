/**
 * Created by Administrator on 2017/2/10.
 */
$('.show').load('data/all.php',function(){
  $.ajax({
    url:'data/query.php',
    success:function(message){
      var html=`
        <header>
					<ul class="sel">
						<li><a href="1" data-name="gender">女</a></li>
						<li><a href="2" data-name="gender">男</a></li>
					</ul>
					<ul class="sel">
						<li><a href="3" data-name="condition">教龄</a></li>
						<li><a href="4" data-name="condition">年龄</a></li>
					</ul>
					<ul class="selectOpt">
						<li>
							<a href="#">系别</a>
							<div class="fade">
								<ul>
								</ul>
							</div>
						</li>
					</ul>
					<ol class="pages">
						<li><a href="lt">&lt;</a></li>
						<li><a href="gt">&gt;</a></li>
					</ol>
				</header>
				<div class="central">
				  <ul class="show">`;
      var data=message.data;
      $.each(data,function(i,p){
        html+=`
									<li>
									<dl>
										<dt><img src="${p.pic}" alt=""/></dt>
										<dl>
											<ul>
												<li>姓名：<span data-name="name">${p.tname}</span>${p.tid}</li>
												<li>系别：<span data-name="categary">${p.categaryID}</span></li>
											</ul>
										</dl>
									</dl>
								</li>
								`;
      });
      html+=`</ul><ol class="pager"><li><a href="1">回到首页</a></li>`;
      var count=message.count;
      for(var i=1;i<6;i++){
        html+=`
								<li><a href="${i}">${i}</a></li>
							`;
      }
      html+=`<li><a href="${count}">最后一页</a></li></ol></div>`;
      $('#showStage').html(html);
      $('.pager>li:nth-child(2)').addClass('active');

      var sel=message.sel;
      var html='';
      $.each(sel,function(i,p){
        html+=`<li data-name="${p.cid}">${p.cname}</li>`
      });
      $('.selectOpt li div>ul').html(html);
    }
  })
});
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
      var data=message.data;

      $.each(data,function(i,p){
        html+=`
							<li>
								<dl>
									<dt><img src="${p.pic}" alt=""/></dt>
									<dl>
										<ul>
											<li>姓名：<span data-name="name">${p.tname}</span>${p.tid}</li>
											<li>系别：<span data-name="categary">${p.categaryID}</span></li>
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
      console.log(1);
    }
  })
}

$('.selectOpt').on('click','li a',function(e){
  e.preventDefault();
  $(this).siblings('div').toggleClass('out');

});
$('.sel').on('click','li a',function(e){
  e.preventDefault();
  $(this).toggleClass('curr');
  $(this).parent('li').siblings('li').children('a').removeClass('curr');
  var gender=$('.sel li a.curr[data-name="gender"]').attr('href');
  var condition=$('.sel li a.curr[data-name="condition"]').attr('href');
  var categary=$('.selectOpt div ul>li.select').attr('data-name');
  update(1,gender,condition,categary);
});

$('.central').on('click','ol.pager li a',function(e){
  e.preventDefault();
  $(this).parent('li').addClass('active').siblings('li').removeClass('active');
  pageNum=parseInt($(this).attr('href'));
  var gender=$('.sel li a.curr[data-name="gender"]').attr('href');
  var condition=$('.sel li a.curr[data-name="condition"]').attr('href');
  var categary=$('.selectOpt div ul>li.select').attr('data-name');
  update(pageNum,gender,condition,categary);
});
$('#showStage .pages').on('click','li>a',function(e){
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
$('.selectOpt div ul').on('click','li',function(){
  $(this).addClass('select');
  var categaryId=$(this).attr('data-name');
  var gender=$('.sel li a.curr[data-name="gender"]').attr('href');
  var condition=$('.sel li a.curr[data-name="condition"]').attr('href');

  update(1,gender,condition,categaryId);
});
$('.selectOpt div').on('mouseleave',function(){
  $(this).removeClass('out');
});