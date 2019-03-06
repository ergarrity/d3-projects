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

        // Parse time data for defining Y axis
        let timeData = dataset.map(d => d.time)
        let specifier = "%M:%S";
        let parsedData = timeData.map(d => d3.timeParse(specifier)(d));
        console.log(parsedData)

        // Define scales
        const xScale = d3.scaleLinear()
            .domain([
                d3.min(dataset, d => d.year),
                d3.max(dataset, d => d.year)
            ])
            .range([padding, w - padding]);

        const yScale = d3.scaleTime()
            .domain([
                d3.max(parsedData, d => d), 
                d3.min(parsedData, d => d)
            ])
            .range([h-padding, padding])


        console.log(dataset[0])
        console.log(timeData)


        
        // Define axes according to scales
        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
        const yAxis = d3.axisLeft(yScale)
            // .tickValues(parsedData)
            // .tickFormat((d, i) => timeData[i]);
            .ticks(d3.timeSecond.every(15))

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