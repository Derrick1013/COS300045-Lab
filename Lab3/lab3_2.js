/* var dataset = [];
var numDataPoints = 50;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
   var newNumber1 = Math.floor(Math.random() * xRange);
   var newNumber2 = Math.floor(Math.random() * yRange);
   dataset.push([newNumber1, newNumber2]);
} */


var dataset = [[2,8], [3,5], [5,17],[6,6], [6,12], [7,20], [8,22], [10,11], [5,12], [6,16]]


console.log(dataset);


var w = 500;
var h = 300;
var padding = 50;  // Increased padding to accommodate axis labels

// Scales for x and y axes
var xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) { return d[0]; })])
    .range([padding, w - padding]);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) { return d[1]; })])
    .range([h - padding, padding]);

var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("transform", "translate(50, 0)");

// Create circles for scatter plot
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

    // Create labels for scatter plot
var xAxis = d3.axisBottom(xScale)
.ticks(5);

var yAxis = d3.axisLeft(yScale)
.ticks(5);


// Create axes
svg.append("g")
    .call(xAxis)
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")");

svg.append("g")
    .call(yAxis)
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)");


    // X-axis label
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", (w / 2) + padding)
    .attr("y", h - 6)
    .text("Tree Age (year)");

// Y-axis label
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", 15)
    .attr("x", -100)
    .text("Tree Height (m)");
