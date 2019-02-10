document.addEventListener("DOMContentLoaded", function(){
    let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
    let json;

    req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
    req.onload = function() {
        json = JSON.parse(req.responseText);
        console.log(json);
    }
})