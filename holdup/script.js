document.getElementById("texttoedit").innerHTML="@ridgewood.k12.nj.us (IP Address " +userip+")."

var ip = userip.toString();
if(ip != "69.74.172.194"){
    document.getElementById("iframestuff").src="/welcome/index.html";
}

document.body.addEventListener('keypress', function(e) {
     if (e.keyCode == 27) { 
        window.location.replace("supernova-site.pages.dev/welcome/index.html");
    }
});
