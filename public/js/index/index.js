/*var t = 1;
var box1 = $(".box1");
var box2 = $(".box2");
var box3 = $(".box3");
$(".icon-prev").click(function(){
  clearInterval(timer);
    switch(t){
        case 4: box1.css("left","-2400px");
                box2.css("left","-2400px");
                box3.css("left","-2400px");
                t--;
                break;
        case 3: box1.css("left","-1200px");
                box2.css("left","-1200px");
                box3.css("left","-1200px");
                t--;
                break;
        case 2: box1.css("left","0px");
                box2.css("left","0px");
                box3.css("left","0px");
                t--;
                break;
        case 1: box1.css("left","-3600px");
                box2.css("left","-3600px");
                box3.css("left","-3600px");
                t=4;
                break;
    }
})
$(".icon-next").click(function(){
  clearInterval(timer);
    switch(t){
        case 1: box1.css("left","-1200px");
                box2.css("left","-1200px");
                box3.css("left","-1200px");
                t++;
                break;
        case 2: box1.css("left","-2400px");
                box2.css("left","-2400px");
                box3.css("left","-2400px");
                t++;
                break;
        case 3: box1.css("left","-3600px");
                box2.css("left","-3600px");
                box3.css("left","-3600px");
                t++;
                break;
        case 4: box1.css("left","0px");
                box2.css("left","0px");
                box3.css("left","0px");
                t=1;
                break;
    }
})
var timer = setInterval(function(){
  switch(t){
    case 1: box1.css("left","-1200px");
            box2.css("left","-1200px");
            box3.css("left","-1200px");
            t++;
            break;
    case 2: box1.css("left","-2400px");
            box2.css("left","-2400px");
            box3.css("left","-2400px");
            t++;
            break;
    case 3: box1.css("left","-3600px");
            box2.css("left","-3600px");
            box3.css("left","-3600px");
            t++;
            break;
    case 4: box1.css("left","0px");
            box2.css("left","0px");
            box3.css("left","0px");
            t=1;
            break;
  }
},3000);*/
var prev = $(".owl-prev");
var next = $(".owl-next");
var i=$(this).attr("data-a")
prev.on("click",function(){
  i++;
  if(i>=8){
      i=7
  }
  move.css("left",-i*width)
  font2.css("top",-i*66)
})
next.on("click",function(){
  i--;
  if(i<=0){
      i=0
  }
  move.css("left",-i*width)
  font2.css("top",-i*66)
})
$(".close").click(function(){
  $(".tab-content").css("height","0");
  $(".tab-content").css("padding-bottom","0");
  $(".tab-content").css("padding-top","0");
  $(".tab-button").css("margin-top","-20px");
})

$(".tab-button>div>a").click(function(){
  var a = $(this);
  $(".tab-content").css("height","254px");
  $(".tab-content").css("padding-bottom","50px");
  $(".tab-content").css("padding-top","50px");
  $(".tab-button").css("margin-top","70px");
})

var width = 880;
var move=$(".tab-box");
var font2=$(".number-box")
var services=$("#services");
services.on("click",".tab-item>a",function(){
    console.log($(this).attr("data-a"))
    i=$(this).attr("data-a")
    move.css("left",-i*width)
    font2.css("top",-i*66)
})


      

