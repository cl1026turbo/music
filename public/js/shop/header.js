$(function(){
  // $.ajax({
  //   url:"header.html",
  //   type:"get",
  //   success:function(result){
  //     $(result).replaceAll("header");
  //     //动态创建link元素，引入header.css,自动添加到<head>元素中
  //     $(`<link rel="stylesheet" href="css/header.css">`).appendTo("head");
      var n=sessionStorage.getItem("uname");
      if(n){
        //登录成功
        var str=`欢迎${n} | <a href="logout.html">退出</a>`
        //获取显示元素
        var msg=document.getElementById("msg");
        msg.innerHTML=str;
      } 
})



