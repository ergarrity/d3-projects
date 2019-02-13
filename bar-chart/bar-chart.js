
document.addEventListener("DOMContentLoaded", function(){
    let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
    let json, dataset, x;
    
    const w = 800;
    const h = 400;
    const padding = 60;


    //chart title
    const title = d3.select("body")
                    .append("h1")
                    .attr("id", "title")
                    .text("United States GDP");


    //XMLHttpRequest to retrieve JSON data from external url
    req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
    req.onload = function() {
        
        json = JSON.parse(req.responseText);


        //append data points to empty array--creates array of arrays
        dataset = [];
        for (item in json.data) {
            dataset.push(json.data[item]);
        }


        //create svg element that will contain visualization
        const svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("class", "gdp-chart");
        

        //create scales
        const xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, d => Date.parse(d[0])), 
                d3.max(dataset, d => Date.parse(d[0]))
            ])
            .range([padding, w - padding]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, d => d[1])])
            .range([h - padding, padding]);

        //define axes according to scales
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        //append x axis
        svg.append("g")
            .attr("id", "x-axis")
            .attr("transform", "translate(0, " + (h - padding) + ")")
            .call(xAxis);

        //append y axis
        svg.append("g")
            .attr("id", "y-axis")
            .attr("transform", "translate(" + padding + ", 0)")
            .call(yAxis);

        //map data to rect elements
        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("data-date", d => d[0])
            .attr("data-gdp", d => d[1])
            //place elements according to previously defined scales
            .attr("x", d => xScale(Date.parse(d[0])))
            .attr("y", d => yScale(d[1]))
            .attr("height", d => h - padding - yScale(d[1]))
            .attr("width", w/dataset.length)
            .style("fill", "rgb(51, 173, 255)")
    }

});