var i=0;
var LIWIDTH=1100;
var DURATION=500;
var LICOUNT=4;
var ulImgs=document.getElementById("ul-imgs");
var ulIdxs=document.getElementById("ul-idxs")
var lis=ulIdxs.children;
function moveTo(to){
  if(to==undefined){
    to=i+1;
  }
  if(i==0){
    if(to>i){
      ulImgs.className="transition";
    }else{
      ulImgs.className="";
      ulImgs.style.marginLeft=-LIWIDTH*LICOUNT+"px";
      setTimeout(function(){
        moveTo(LICOUNT-1);
      },100);
      return;
    }
  }
  i=to;
  ulImgs.style.marginLeft=-i*LIWIDTH+"px";
  for(var li of lis){
    li.className=""
  }
  console.log(i);
  if(i==LICOUNT){
    i=0;
    setTimeout(function(){
      ulImgs.className="";
      ulImgs.style.marginLeft=0;
    },DURATION)
  }
  lis[i].className="active";
}
var btnLeft=document.getElementById("btn-left");
var btnRight=document.getElementById("btn-right");
var canClick=true;
btnRight.onclick=function(){
  move(1)
}
function move(n){
  if(canClick){
    console.log(i+n);
    moveTo(i+n);
    canClick=false;
    setTimeout(function(){
      canClick=true;
    },DURATION+100);
  }
}
btnLeft.onclick=function(){
  move(-1);
}
var interval=3000;//每次轮播之间间隔3秒
var timer=setInterval(function(){
  moveTo()
},3000);
var banner=document.getElementById("banner");
banner.onmouseover=function(){
  clearInterval(timer);
}
banner.onmouseout=function(){
  timer=setInterval(function(){
    moveTo()
  },3000);
};



(function(){
  //向localhost:3000/index发送请求，获得数据
  $.ajax({
    url:"http://localhost:3000/index",
    type:"get",//请求类型
    //无请求参数
    dataType:"json"//返回值类型
  })//.then中的函数会在请求结束后，自动执行
  //        open(result)
  //               ↓
  .then(function(result){
    console.log(result);
    //先取出结果数组中第一个商品
    var p1=result[0];
    //将p1的属性，填充进HTML片段中
    var html=`
    <div>
      <a href="${p1.href}" class="cover f-pr f-blk j-statistics">
        <img src="${p1.pic}" alt="" class="f-img">
        <span class="spec f-pa">
          <span class="origin f-pa">￥${p1.price}</span>
          <span class="cut f-pa">
            <del>￥179</del>
          </span>
        </span>
      </a>
      <div class="cnt f-tc">
        <h3 class="f-thide2">
          <span class="tag tag-red">
            <em>特价</em>
          </span>
          <a href="#" target="_blank">${p1.title}</a>
        </h3>
        <p class="txt f-thide">
          ￥<em>${p1.price}</em>
        </p>
      </div>
    </div>`;
    //放回页面中原位置:
    document.getElementById("p1")
            .innerHTML=html;

    //从结果集合中取出第二个商品
    var p2=result[1];
    //将p2的属性填充到HTML片段中:
    var html=`<div>
      <a href="${p2.href}" class="cover f-pr f-blk j-statistics">
        <img src="${p2.pic}" alt="" class="f-img">
        <span class="spec f-pa">
          <span class="origin f-pa">￥${p2.price}</span>
          <span class="cut f-pa">
            <del>￥79</del>
          </span>
        </span>
      </a>
      <div class="cnt f-tc">
        <h3 class="f-thide2">
          <span class="tag tag-red">
            <em>特价</em>
          </span>
          <a href="#" target="_blank">${p2.title}</a>
        </h3>
        <p class="txt f-thide">
          ￥<em>${p2.price}</em>
        </p>
      </div>
    </div>`;
    //放回原位置去
    document.getElementById("p2")
            .innerHTML=html;
  //从集合中拿出第三个商品
  var p3=result[2];
  //将p3的属性填充到html片段中
  var html=`
  <div>        
    <a href="${p3.href}" class="cover f-pr f-blk j-statistics">
      <img src="${p3.pic}" alt="" class="f-img">
      <span class="spec f-pa">
        <span class="origin f-pa">￥${p3.price}</span>
        <span class="cut f-pa">
          <del>￥89</del>
        </span>
      </span>
    </a>
    <div class="cnt f-tc">
      <h3 class="f-thide2">
        <span class="tag tag-red">
          <em>特价</em>
        </span>
        <a href="#" target="_blank">${p3.title}</a>
      </h3>
      <p class="txt f-thide">
      ￥<em>${p3.price}</em>
      </p>
    </div>
</div>`
//放回原位置去
document.getElementById("p3").innerHTML=html;
//先取出结果数组中第四个商品
var p4=result[3];
//将p1的属性，填充进HTML片段中
var html=`
<div>
  <a href="${p4.href}" class="cover f-pr f-blk j-statistics">
    <img src="${p4.pic}" alt="" class="f-img">
    <span class="spec f-pa">
      <span class="origin f-pa">￥${p4.price}</span>
      <span class="cut f-pa">
        <del>￥179</del>
      </span>
    </span>
  </a>
  <div class="cnt f-tc">
    <h3 class="f-thide2">
      <span class="tag tag-red">
        <em>特价</em>
      </span>
      <a href="#" target="_blank">${p4.title}</a>
    </h3>
    <p class="txt f-thide">
      ￥<em>${p4.price}</em>
    </p>
  </div>
</div>`;
//放回页面中原位置:
document.getElementById("p4")
        .innerHTML=html;

//从结果集合中取出第二个商品
var p5=result[4];
//将p2的属性填充到HTML片段中:
var html=`<div>
  <a href="${p5.href}" class="cover f-pr f-blk j-statistics">
    <img src="${p5.pic}" alt="" class="f-img">
    <span class="spec f-pa">
      <span class="origin f-pa">￥${p5.price}</span>
      <span class="cut f-pa">
        <del>￥79</del>
      </span>
    </span>
  </a>
  <div class="cnt f-tc">
    <h3 class="f-thide2">
      <span class="tag tag-red">
        <em>特价</em>
      </span>
      <a href="#" target="_blank">${p5.title}</a>
    </h3>
    <p class="txt f-thide">
      ￥<em>${p5.price}</em>
    </p>
  </div>
</div>`;
//放回原位置去
document.getElementById("p5")
        .innerHTML=html;
//从集合中拿出第三个商品
var p6=result[5];
//将p3的属性填充到html片段中
var html=`
<div>        
<a href="${p6.href}" class="cover f-pr f-blk j-statistics">
  <img src="${p6.pic}" alt="" class="f-img">
  <span class="spec f-pa">
    <span class="origin f-pa">￥${p6.price}</span>
    <span class="cut f-pa">
      <del>￥89</del>
    </span>
  </span>
</a>
<div class="cnt f-tc">
  <h3 class="f-thide2">
    <span class="tag tag-red">
      <em>特价</em>
    </span>
    <a href="#" target="_blank">${p6.title}</a>
  </h3>
  <p class="txt f-thide">
  ￥<em>${p6.price}</em>
  </p>
</div>
</div>`
//放回原位置去
document.getElementById("p6").innerHTML=html;
});
})()