document.getElementById("texttoedit").innerHTML="@ridgewood.k12.nj.us (IP Address " +userip+")."

var ip = userip.toString();
if(ip != "69.74.172.194"){
    document.getElementById("iframestuff").src="/welcome/index.html";
}

window.onload = function() {
   document.getElementsByTagName('body')[0].onkeyup = function(e) { 
      var ev = e || event;

     if(ev.keyCode == 13){
       document.getElementById("iframestuff").src="/holdup/index.html";
        document.write("You suck");
     }
   }
};
