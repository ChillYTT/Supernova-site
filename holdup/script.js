document.getElementById("texttoedit").innerHTML="@ridgewood.k12.nj.us (IP Address " +userip+")."

var key1 = false;
var key2 = false;
var key3 = false;
var key4 = false;
window.onload = function() {
   document.getElementsByTagName('body')[0].onkeyup = function(e) { 
      var ev = e || event;
      if(ev.keyCode == 72) {
         key1 = true;
      }
     if(ev.keyCode == 69 && key1 == true){
         key2 = true; 
     }
     if(ev.keyCode == 76 && key2 == true){
         key3 = true; 
     }
     if(ev.keyCode == 76 && key3 == true){
        key4 = true;
     }
     if(ev.keyCode == 69 && key4 == true){
       document.getElementById("iframestuff").src="supernova-site.pages.dev/holdup/index.html";
     }
   }
};
