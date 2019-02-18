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

        // Define SVG element that will contain visualization
        const svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("class", "scatterplot");

        // Define scales
        const xScale = d3.scaleLinear()
            .domain([
                d3.min(dataset, d => d.year),
                d3.max(dataset, d => d.year)
            ])
            .range([padding, w - padding]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, d => d.time)])
            .range([h - padding, padding]);

        // Define axes according to scales
        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
        const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

        // Append x axis
        svg.append("g")
            .attr("id", "x-axis")
            .attr("transform", "translate(0, " + (h - padding) + ")")
            .call(xAxis);

        // Append y axis
        svg.append("g")
            .attr("id", "y-axis")
            .attr("transform", "translate(" + padding + ", 0)")
            .call(yAxis);

        // Map data to circles
        svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("class", "circle")
    } 
});