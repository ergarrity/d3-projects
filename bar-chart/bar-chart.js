document.addEventListener("DOMContentLoaded", function(){
    let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
    let json, dataset, x;

    //XMLHttpRequest to retrieve JSON data from external url
    req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
    req.onload = function() {
        json = JSON.parse(req.responseText);

        dataset = [];
        for (item in json.data) {
            dataset.push(json.data[item]);
        }
    }
});