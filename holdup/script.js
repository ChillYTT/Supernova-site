document.getElementById("texttoedit").innerHTML="@ridgewood.k12.nj.us (IP Address " +userip+")."

setInterval(goToScreen, 1000);

goToScreen(){
  window.location.replace("https://supernova-site.pages.dev/welcome/#home") 
}
