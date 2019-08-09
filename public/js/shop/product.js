$(()=>{
	function getObj(){
		var arr1 = decodeURI(window.location.search).slice(1).split('&'),
		arr2 = [], obj = {};
		for(var item of arr1){
			var arr2 = item.split('=');
			obj[arr2[0]] = arr2[1];
		}
		return obj;
	}
  //	定义一个变量 保存商品id
	let gid = getObj().gid;
	// 加载详情页
	loadProduct();
	function loadProduct(){
		var query = location.search.slice(1);
		$.get('data/product/getProductById.php',query).then(data=>{
			var {data,imgs,spec,attrs,rec} = data;
			// 加载详情页标题
			$('head>title').html(data.title);

			// 加载导航条
			$('#goods').html(data.title).attr({
				'data-gid':data.goods_id,
				'title':data.title
			});

			// 加载详情页右上部分
			$('.proinfo>.tit').html(data.title);
			$('.proinfo>.subtitle').html(data.subtitle);
			$('.proinfo .price-num>span').html(data.price);
			$('.proinfo .mj>span:last').html(data.activity);
			$('.tip-details').html(`${data.is_seven==1?'':'不'}支持七天无理由退货`);
			$('[data-opr=buy]>a').attr('data-gid',data.goods_id);
			var html = "";
			for(var p of spec){
				html += `<a href="product.html?gid=${p.goods_id}"
				${p.goods_id==data.goods_id?'class=curr':''}>${p.spec}</a>`
			}
			$('.spec-show').html(html);

			// 加载放大镜
			var html = "";
			for(var p of imgs){
				html += `<li class="item">
								<img data-md="${p.md}" data-lg="${p.lg}" src="${p.sm}">
							</li>`;
			}
			$('[data-img=show]').css('width',64*imgs.length).html(html)
									  .children(':first').addClass('hover');
			$('[data-img=md]').attr('src',imgs[0].md);
			$('[data-img=lg]').attr('src',imgs[0].lg);

			// 加载商品介绍
			$('.intros .brand').html(`<li title="${attrs.brand}">品牌：<a href="#">${attrs.brand}</a></li>`);
			$('.intros .param2').html(
				  `<li title="${attrs.goods_name}">商品名称：${attrs.goods_name}</li>
	    			<li title="${attrs.goods_no}">商品编号：${attrs.goods_no}</li>
	            <li title="${attrs.weight}kg">商品毛重：${attrs.weight}kg</li>
	           	<li title="${attrs.production}">商品产地：${attrs.production}</li>
	            <li title="${attrs.gas_ccm}">气态污染物CCM：${attrs.gas_ccm}</li>
	            <li title="${attrs.purify_energy}">净化能效：${attrs.purify_energy}</li>
	            <li title="${attrs.gas_cada}">气态净化CADR：${attrs.gas_cada}</li>
	            <li title="${attrs.solid_ccm}">固态污染物CCM：${attrs.solid_ccm}</li>
	            <li title="${attrs.function}">功能：${attrs.function}</li>
	            <li title="${attrs.solid_cada}">固态净化CADR：${attrs.solid_cada}</li>
	            <li title="${attrs.type}">类别：${attrs.type}</li>`);
			$('.intros .goodsdetail').html(`<img src="${attrs.intro_pic}">`);

			// 详情页热门推荐加载
			var html = '';
			for(var p of rec){
				html += `<a href="product.html?gid=${p.goods_id}">
								<img src="${p.md}" title="${p.title}">
								<div><strong>¥${p.price}</strong></div>
							</a>`;
			}
			$('.rec .wrap').html(html)

			if(sessionStorage.getItem('#comment') == 'true'){
				sessionStorage.removeItem('#comment');
				$('li[rel="#tab-comment"]').click();
				let height = $('.intro>.box-bar>.tab').offset().top;
				$('html,body').animate({'scrollTop':height},300,'swing')
			}
		});
	}
	// 加载商品评论
	function loadComment(pno=1){
		$.get('data/product/getComment.php',{gid,pno}).then(output=>{
			var {data,pno,pageCount} = output;
			// 加载评论
			var html = '';
			for(var item of data){
				html += `<div class="item">
								<div class="userinfo">${item.uname}</div>
								<div class="itemDetail">
									<div class="comment-star ${item.star}"></div>
									<p>${item.article}</p>`;
				if(item.src){
					var srcList = item.src.split(';');
					html += `<ul class="picList clear">`;
					for(var src of srcList){
						html += `<li><img src="${src}" alt=""><b class="photo-arrow"></b></li>`;
					}
					html += `</ul><div class="photo-view" style="width:0;height:0;display:none"><img src="" alt="" /></div>`;
				}
				html += `</div>
								<div class="date clear">
									<div class="thumbup" data-id="${item.id}" title="${item.praiseNum}">
										<i class="iconfont icon-thumbup"></i>${item.praiseNum}
									</div>
									<p class="time">${item.ctime}</p>
								</div>
							</div>`;
			}
			$('#tab-comment .content').html(html);
			var html = '';
			if(pno !== 1){
				html += `<a href="javascript:;" class="prev" data-page="${pno-1}">上一页</a>`;
			}
			for(var i=1;i<=pageCount;i++){
				html += `<a href="javascript:;" data-page="${i}" 
							${pno==i?'class=curr':''}>${i}</a>`;
			}
			if(pno !== pageCount){
				html += `<a href="javascript:;" class="next" data-page="${pno+1}">下一页</a>`;
			}
			$('#tab-comment .pages').html(html);
			$('.hf').removeClass('hf-on').html(`<h3>发表评论：</h3>
							<span class="notLogin">（您没有登录，请<a href="javascript:;"> 登录 </a>后再进行评论）</span>
							<textarea type="text" class="hf-text" autocomplete="off" maxlength="200" placeholder="评论…"></textarea>
							<div class="give-star">
								<strong>为商品打call吧:</strong>
								<span>
									<i></i><i></i><i></i><i></i><i></i>
								</span>
								<strong class="reminder">（不对商品打个call吗）</strong>
							</div>
							<button type="button" class="hf-btn">发送</button>
							<span class="hf-nub">0/200</span>
							<div id="pic_upload" class="pic_upload">
								<a href="javascript:;" class="upbtn">上传图片</a>
								<div id="preList" class="preList">
									<a href="javascript:;" class="closeList">×</a>
									<h3>本地上传</h3>
									<p class="num"></p>
									<ul class="drag_pic_list clear">
										<!-- <li>**</li> -->
										<li class="add" title="未选择任何文件"><span>＋</span></li>
									</ul>
								</div>
								<input name="file" id="uploadInput" style="display:none" type="file" accept="image/*" multiple/>
							</div>`);
		})
	}

	// 商品购买操作
	$(()=>{
		// 商品数量加减
		var $input = $('[data-opr=number]>input');
		$('[data-opr=number]').on('click','a:not(.disabled)',function(){
			var number = $input.val(),
				 $reduce = $('[data-opr=number]>.reduce');
			$(this).is('.add')?number++:number--;
			number>1?$reduce.removeClass('disabled'):$reduce.addClass('disabled');
			$input.val(number);
		});
		// 购买操作
		$('[data-opr=buy]').on('click','.buynow,.addcart',function(){
			$.get('data/user/isLogin.php').then(data=>{
				if(data.ok==0){
					$('.ui-mask').show().animate({'opacity':1},200)
					$('[data-msg=notLogin]').show().parent().show();
				}else{
					let number = $input.val();
					$.get('data/cart/addCart.php',{gid,number}).then(data=>{
						var {isSuccess,totalNum} = data;
						if(isSuccess == 'Y'){
							if($(this).is('.addcart')){
								// 显示弹窗提示
								$input.val(1).prev().addClass('disabled');
								$('.ui-mask').show().animate({'opacity':1},200)
								$('[data-msg=addSuccess]').show().parent().show();
								// 更新侧边栏购物车数量
								$('.tool-bar .cart-num').html(totalNum);
								// 更新Cookie中商品数量
								setCookie('cart_num',totalNum,5);
							}else{
								location = 'cart.html'
							}
						}
					});
				}
			});
		});

		// 弹窗单击事件（关闭/跳转登录页）
		$('.ui-dialog').on('click','.close',function(){
			$('.ui-mask').animate({'opacity':0},200,()=>$('.ui-mask').hide()).prev().hide();
		}).on('click','.msg>a',()=>{
			var href = location.href;
			location = 'login.html?back=' + encodeURIComponent(href);
		})
	});
	// 放大镜
	$(()=>{
		var $ul = $('[data-img=show]'),$shadow = $('.img-shadow'),
		    $largeImg=$('[data-img=lg]'),WIDTH=64,moved=0;
		$('[data-img=move]').on('mouseenter','img',function(){
			$(this).parent().addClass('hover').siblings().removeClass('hover');
			$('[data-img=md]').attr('src',$(this).data('md'));
			$('[data-img=lg]').attr('src',$(this).data('lg'));
		})
		.on('click','a.prev:not(.disabled)',()=>move(-1))
		.on('click','a.next:not(.disabled)',()=>move(1));
		function move(dir){
			moved+=dir;
			$ul.css('transform',`translate(${-WIDTH*moved}px)`);
			// 判断按钮状态
			if(moved==0)
				$('[data-img=move]>.prev').addClass('disabled');
			else
				$('[data-img=move]>.prev').removeClass('disabled');
			if(moved+5==$ul.children().length)
				$('[data-img=move]>.next').addClass('disabled');
			else
				$('[data-img=move]>.next').removeClass('disabled');
		}
		$('[data-img=cover]').hover(
			()=>$shadow.show().next().show(),
			()=>$shadow.hide().next().hide()
		).on('mousemove',e=>{
			var offsetX = e.offsetX,offsetY = e.offsetY;
			var left = offsetX-190/2,top=offsetY-190/2;
			left=left<0?0:left>190?190:left;
			top=top<0?0:top>190?190:top;
			$shadow.css({'left':left,'top':top});
			$largeImg.css({'left':-left*30/19,'top':-top*30/19});
		})
	});
	// 商品评价/商品介绍..TAB标签 绑定事件
	$('[data-tab=show]').on('click','li',function(){
		var val = $(this).attr('rel');
		if(val == '#tab-comment'){
			loadComment();
		}
		$(this).addClass('curr').siblings().removeClass('curr');
		$(val).addClass('curr').siblings().removeClass('curr');
	});
	
	// 商品评论区事件绑定
		// 商品评论分页
		$('#tab-comment').on('click','.pages a:not(.curr)',function(){
			var pno = $(this).data('page');
			loadComment(pno);
		})
		// 评论区图片点击放大
		.on('click','.picList img',function(){
			console.log(this)
			if(!$(this).parent().is('.curr')){
				$(this).parent().addClass('curr')
						 .siblings().removeClass('curr')
 				$(this).parent().parent().next().children('img').attr('src',$(this).attr('src'))
						 .parent().show().animate({'width':350,'height':350},400)
			}else{
				$(this).parent().removeClass('curr')
						 .parent().next().hide().animate({'width':0,'height':0})
			}
			
		}).on('click','.photo-view',function(){
			$(this).hide().animate({'width':0,'height':0})
					 .prev().children().removeClass('curr');
		})
		// 点赞事件
		.on('click','.thumbup',function(){
			// 先判断用户是否登录
			$.get('data/user/isLogin.php').then(data=>{
				// data.ok==0,则没有登录
				if(data.ok==0){
					alert('请登录')
				}else{
					// 请求数据库，查询是否已经点过赞
					var id = $(this).data('id');
					$.get('data/product/isPraised.php',{id}).then(res=>{
						// 如果已经对这条评论点过赞
						if(res.code == 0){
							console.log(1)
							alert('只能点赞一次呦');
						}else{
							// 否则
							var num = parseInt($(this).attr('title'));
							$(this).attr('title',num).html(`已点赞(${num+1})`).addClass('praised');
						}
					})
				}
			})
		})

		// 发表评论区事件绑定
		// 定义一个数组，用于临时接收用户上传的图片
		var filearr = new Array();

		$('.hf').on('focus','.hf-text',function(){
			// 文本框焦点事件
			$.get('data/user/isLogin.php').then(data=>{
				if(data.ok==0){
					$(this).prop('readonly',1).parent().addClass('hf-err');
				}else{
					$(this).parent().addClass('hf-on');
				}
			})
		}).on('blur','.hf-text',function(){
			// 文本框失去焦点时，如果文本框中没有输入内容，则恢复其父元素的原始样式
			$(this).val().length==0?$(this).parent().removeClass('hf-on'):''
		}).on('keyup','.hf-text',function(){
			// 键盘事件
			var $btn = $('.hf-btn');
			var len = $(this).val().length;
			$btn.next().html(len+'/200');
			if(len > 0)
				$btn.addClass('hf-btn-on');
			else
				$btn.next().removeClass('hf-btn-on');
		}).on('click','.notLogin>a',()=>{
			// 未登录状态下，点击'登录'按钮进行页面跳转，登录成功后返回当前页
			sessionStorage.setItem('#comment',true);
			location.href = 'login.html?back=' + location.href;
		})
		// 星级评级鼠标移入事件，当前处于第几颗星则显示几颗星为红色
		.on('mouseenter','.give-star>span>i',function(){	
			var i = $(this).index() + 1;
			// $(this).parent()[0].className = `star${i}`;
			$(this).parent().removeClass().addClass(`star${i}`);
		})
		// 星级评级鼠标移出事件，获取当前绑定元素 data-clickd='?'的值，进行判断
		.on('mouseleave','.give-star>span',function(){	
			var num = $(this).data('click');
			if(num == undefined){
				$(this).removeClass();
			}else{
				$(this).removeClass().addClass(`star${num}`);
			}
		})
		// 星级评级鼠标点击事件，获取当前元素的位置并+1作为 i 保存
		.on('click','.give-star i',function(){		
			var i = $(this).index() + 1;
			// 根据i的取值给父元素span添加对应的样式
			$(this).parent().removeClass().addClass(`star${i}`)
					 .data('click',i)
					 .next().hide()
					 .next().val(i);
		})
		// 上传图片事件
		.on('click','.upbtn,li.add',function(){
			// $("#uploadInput").remove();
			var uploadFile = '<input name="file" id="uploadInput" style="display:none" type="file" accept="image/*" multiple/>';
			   $('#pic_upload').append($(uploadFile));
			   $('#uploadInput').click()
		}).on('change','#uploadInput',function(){
			console.log(this.files)
			console.log('执行了upload')
			$('#preList').show();
			var files = this.files, len = files.length,
				 count = 0, html = '';
			var numLimit = 6 - filearr.length;
			for(var i=0;i < len; i++){
				if(files[i].size/1024 > 200){
					alert('图片'+files[i].name+'大小超过200KB，请重新选择')
					break;			
				}
				else if(count >= numLimit){
					break;
				}else{
					count++;
					filearr.push(files[i]);
					console.log(files[i])
					var reader = new FileReader();
					reader.readAsDataURL(files[i]);
					reader.onload=function(){
						$('#preList .add').before(`<li>
									<img src="${this.result}">
									<a href="javascript:;" class="deleteImg">×</a>
								</li>`);
					}
					
				}
				checkPicNum();
			}
			$(this).remove()
		}).on('click','.deleteImg',function(){
			var index = $(this).parent().index();
			$(this).parent().remove();
			filearr.splice(index,1);
			checkPicNum();
		})
		// 图片上传右上角单击关闭
		.on('click','.closeList',function(){
			$(this).parent().hide();
			filearr.length = 0;
			$('.drag_pic_list li:not(.add)').remove();
		})
		// 发送评论
		.on('click','.hf-btn',function(){
		   // 发送评论点击操作
			var article = $(this).prev().prev().val();
			var star =$(this).prev().children('span').attr('class');
			// 判断article 评论的内容如果为空，则不能提交
			if(article.trim().length == 0){
				$(this).parent().removeClass('hf-on');
			}else if(!star){
				// 判断star 如果没有打星，则不能提交
				$(this).prev().children('.reminder').show();
				var i = 0, count = 0;;
				var timer = setInterval(()=>{
					if(i >= 6) i = 0;
					$('.give-star>span').removeClass().addClass(`star${i}`);
					i++;
					count++;
					if(count > 12){
						clearInterval(timer);
						timer = null;
						$('.give-star>span').removeClass()
					}
				},80);
			}else{
				var formData = new FormData();
				formData.append('gid',$('#goods').attr('data-gid'));
				formData.append('ctime',getTime());
				formData.append('article',article);
				formData.append('star',star);
				if(filearr.length>0){
					for(var file of filearr){
						formData.append('files[]',file);
					}
				}
			
				$.ajax({
			      url:"data/product/addComment.php",  //发送的URL
			      type:"POST",        //类型
			      data:formData,      //将数据发送
			      contentType: false,     //需要使用
			      processData: false,     //需要使用
			      success:function(data){
			      	console.log(data)
			         //发送成功后需要执行的动作
			         if(data == 'Y'){
			         	alert('评论成功');
			         	filearr.length = 0;
			         	loadComment();
			         }
			      }
			   });
			}
		})
		// 获取当前时间,并返回一个日期字符串
		function getTime(){
			var t=new Date();
			var y=t.getFullYear();
			var m=t.getMonth()+1;
			var d=t.getDate();
			var h=t.getHours();
			var mi=t.getMinutes();
			var s=t.getSeconds();
			m=m<10?"0"+m:m;
			d=d<10?"0"+d:d;
			h=h<10?"0"+h:h;
			mi=mi<10?"0"+mi:mi;
			s=s<10?"0"+s:s;
			return y+"-"+m+"-"+d+" "+h+":"+mi+':'+s;
		}
		function checkPicNum(){
			var len = filearr.length;
			if(len < 6){
				$('#preList .num').html(`共<output>${len}</output>张，还能上传<output>${6-len}</output>张`);
				$('.drag_pic_list .add').show();
			}else{
				$('#preList .num').html(`最多选择<output>6</output>张图片上传`);
				$('.drag_pic_list .add').hide();
			}

		}
	// 如果标签页已经浮动起来，当再次点击时回到标签页最顶部
	$('.box-bar').on('click','.fixed li',function(){
		var top = $('.intro').offset().top;
		$(window).scrollTop(top);
	});
	// 绑定页面滚动事件
	$(()=>{
		var $tab = $('.intro>.box-bar>.tab');
		$(window).scroll(()=>{
			var scrollTop = $(window).scrollTop(),
				  tabHeight = $('.intro').offset().top;
			// 显示或隐藏详情页中的商品介绍/评价 固定条
			if(scrollTop >= tabHeight){
				$tab.addClass('fixed');
				$('.bg-fixed').show();
			}else{
				$tab.removeClass('fixed');
				$('.bg-fixed').hide();
			}
		})
	});
				
});