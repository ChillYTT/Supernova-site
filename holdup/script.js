document.getElementById("texttoedit").innerHTML="@ridgewood.k12.nj.us (IP Address " +userip+")."

var ip = userip.toString();
if(ip != "69.74.172.194"){
    window.location.replace("supernova-site.pages.dev/welcome/index.html")
}

 var started = true;
  var key1 = false;
   var key2 = false;
   var key3 = false;
   var key4 = false;
var key5 = false;
var key6 = false;
document.addEventListener('keydown', (event) => {
  var name = event.key;
  var code = event.code;

   if(event.keyCode == 73 && started){
     key1 = true;
     started = false;
     alert("okay");
   }
   if(event.keyCode == 78 && key1){
     key2 = true;
     key1 = false;
   }
   if(event.keyCode == 86 && key2){
     key3 = true;
     key2 = false;
   }
   if(event.keyCode == 73 && key3){
     key4 = true;
     key3 = false;
   }
  if(event.keyCode == 84 && key4){
    key4 = false;
    key5 = true;
  }
  if(event.keyCode == 69 && key5){
    key5 = false;
    key6 = true;
  }
  if (name === 'Enter' && key6) {
    document.getElementById("iframestuff").src="/welcome/index.html";
  }
}, false);
