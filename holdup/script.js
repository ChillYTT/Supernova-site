document.getElementById("texttoedit").innerHTML="@ridgewood.k12.nj.us (IP Address " +userip+")."

var ip = userip.toString();
if(ip != "69.74.172.194"){
    document.getElementById("iframestuff").src="/welcome/index.html";
}

$(document).keyup(function(e) {
     if (e.key === "Escape") { 
        window.location.replace("supernova-site.pages.dev/welcome/index.html");
    }
});
