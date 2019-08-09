//为data-toggle="brandlist"绑定单击事件:
$("[data-toggle=brandlist]")
.click(function(){
  var $d=$(this);
  //如果按钮上的文字是“收起”
  if($d.html()==="收起︿"){
//找到>4位置的，且不是最后一个的li
$("ul>li:gt(4)").hide();//都隐藏
//顺便将按钮的文字改为“展开”
$(this).html("展开﹀")
}else{
//找到ul下所有li，全部显示
$("ul>li").show();
//顺便将按钮的文字给为“收起"
$(this).html("收起︿")
}
})
//点击点赞
//1.查找触发事件元素
var $zan=$("#zan");
//选择器
//document.getElementById("btn1");
var i=0;
//2.绑定事件处理函数
//btn1.addEventListener(
// "click",
$zan.click(
function(){
//3.查找要修改的元素
var $zan1=$(this);
//坑:this->dom
//4.修改元素
// btn.innerHTML=
$zan1.html(`(${++i})`);
//函数库
}
)
