
document.addEventListener("DOMContentLoaded", function(){
    let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
    let json, dataset, x;
    
    const w = 800;
    const h = 400;
    const padding = 60;

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

        const xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, d => Date.parse(d[0])), 
                d3.max(dataset, d => Date.parse(d[0]))
            ])
            .range([padding, w - padding]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, d => d[1])])
            .range([h - padding, padding]);
    }
});