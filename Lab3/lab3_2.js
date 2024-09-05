var dataset = [];
var numDataPoints = 50;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
   var newNumber1 = Math.floor(Math.random() * xRange);
   var newNumber2 = Math.floor(Math.random() * yRange);
   dataset.push([newNumber1, newNumber2]);
}

console.log(dataset);

var w = 500;
var h = 300;
var padding = 30;  // Increased padding to accommodate axis labels

var xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) { return d[0]; })])
    .range([padding, w - padding]);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) { return d[1]; })])
    .range([h - padding, padding]);

var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return xScale(d[0]);
    })
    .attr("cy", function(d) {
        return yScale(d[1]);
    })
    .attr("r", 5)
    .style("fill", "red");

var xAxis = d3.axisBottom(xScale)
.ticks(5);

var yAxis = d3.axisLeft(yScale)
.ticks(5);

svg.append("g")
    .call(xAxis)
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")");

svg.append("g")
    .call(yAxis)
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)");