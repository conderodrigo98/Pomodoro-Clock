$(document).ready(function(){
  //set vars
  var sessionL=25;
  var breakL=5;
  var round=1;
  var power=false;
  
  //permision things
  if (Notification.permission!="granted"){
    Notification.requestPermission();
  }
  
  //set parameters
  $(".lengthS-").on("click",function(){
    if(sessionL>25 && power===false){
     sessionL-=5; 
     $("#sessionL").html(sessionL+":00");
    }
  });
  
  $(".lengthSplus").on("click",function(){
    if(sessionL<120 && power===false){
     sessionL+=5; 
     $("#sessionL").html(sessionL+":00");
    }
  });
  
  $(".lengthB-").on("click",function(){
    if(breakL>2 && power===false){
     breakL-=1;
     if (breakL<10){
       $("#breakL").html("0"+breakL+":00");
     }else{
       $("#breakL").html(breakL+":00");
     }
    }
  });
  
  $(".lengthBplus").on("click",function(){
    if(breakL<20 && power===false){
     breakL+=1; 
      if (breakL<10){
       $("#breakL").html("0"+breakL+":00");
     }else{
       $("#breakL").html(breakL+":00");
     }
    }
  });
  
  //start clock
  $("#btnStart").on("click",function(){
    if (power!=true){
      power=true;
      $("#btnStart").addClass("disabled");
      timer(sessionL,breakL); 
    }
          
  });
  
  //reset clock
  $("#btnReset").on("click",function(){
    power=false;
    round=1;
    $("#btnStart").removeClass("disabled");
    $("#minutes").html("25");
    $("#seconds").html("00");
    $("#session").html(round);
  });
  
  //clock function
  function timer (t,b){
    var ti=t;
    t=t*60;
    var clock=setInterval(function(){
      if (t==0){
        console.log(b + " y "+ ti);
        clearInterval(clock);
        var audio = new Audio("https://notificationsounds.com/soundfiles/35051070e572e47d2c26c241ab88307f/file-74_bells-message.mp3");
        audio.play();
        if (b==sessionL){
          var notification = new Notification("Time to work!", {body:"Let's get going. You can do this!", icon:"https://www.gsdfaster.com/media/blog/pomodoro-counter-empty.png"});
          round++;
          $("#session").html(round);
        }else{
          var notification2 =new Notification("Break time!", {body:"Relax...", icon:"https://www.gsdfaster.com/media/blog/pomodoro-counter-empty.png"});
        }
        timer(b,ti);
      }
      if (power==false){clearInterval(clock);}
      var min=t/60;
      var seg=t%60;
      if (min<10 && power){
          $("#minutes").html("0"+Math.floor(min));
      }else if (min>=10 && power){
          $("#minutes").html(Math.floor(min));
      }
      if (seg<10 && power){
          $("#seconds").html("0"+Math.floor(seg));
      }else if(seg>=10 && power){
          $("#seconds").html(Math.floor(seg));
      }
      t-=1;
    }
      ,1000);
    }
  
  
  
});