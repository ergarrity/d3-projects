document.addEventListener("DOMContentLoaded", function(){
    let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
    let json;

    const w = 800;
    const h = 400;
    const padding = 60;
    
    const dataset = [];

    // Define chart title
    const title = d3.select("body")
        .append("h1")
        .attr("id", "title")
        .text("Doping in Professional Bicycle Racing")

    // XMLHttpRequest to retrieve JSON data from external URL
    req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
    req.onload = function () {
        json = JSON.parse(req.responseText);

        // Destructure necessary data from JSON object and push to dataset array
        for (element in json) {
            let {Year, Time, Doping} = json[element];

            if (Doping === "") {
                Doping = false;
            } else {
                Doping = true;
            }

            dataset.push({
                "year": Year,
                "time": Time,
                "doping": Doping
            });
        }
    } 
});