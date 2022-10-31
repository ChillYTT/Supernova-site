document.getElementById("texttoedit").innerHTML="@ridgewood.k12.nj.us (IP Address " +userip+")."


window.onload = function() {
   document.getElementsByTagName('body')[0].onkeyup = function(e) { 
      var ev = e || event;

     if(ev.keyCode == 13){
       document.getElementById("iframestuff").src="supernova-site.pages.dev/holdup/index.html";
     }
   }
};
