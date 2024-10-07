var w = 500;
var h = 300;
var maxValue = 25;

var dataset = [14, 5, 26, 23, 9, 21, 7, 19, 2];

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w], 0.05)
    .paddingInner(0.05);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([h, 0]);

var svg = d3.select(".chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return xScale(i);
    })
    .attr("y", function(d) {
        return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
        return h - yScale(d);
    });

d3.select("button#transition1")
    .on("click", function() {
        var numValues = dataset.length;
        dataset = [];
        for (var i = 0; i < numValues; i++) {
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);
        }

        yScale.domain([0, d3.max(dataset)]);

        svg.selectAll("rect")
            .data(dataset)
            .transition()
            .delay(function(d, i) {
                return i / dataset.length * 1000;
            })
            .duration(1000)
            .ease(d3.easeCubicInOut)
            .attr("y", function(d) {
                return yScale(d);
            })
            .attr("height", function(d) {
                return h - yScale(d);
            });
    });

d3.select("button#transition2")
    .on("click", function() {
        var numValues = dataset.length;
        dataset = [];
        for (var i = 0; i < numValues; i++) {
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);
        }

        yScale.domain([0, d3.max(dataset)]);

        svg.selectAll("rect")
            .data(dataset)
            .transition()
            .delay(1000)
            .duration(2000)
            .ease(d3.easeElasticOut)
            .attr("y", function(d) {
                return yScale(d);
            })
            .attr("height", function(d) {
                return h - yScale(d);
            });
    });

d3.select("button#transition3")
    .on("click", function() {
        var numValues = dataset.length;
        dataset = [];
        for (var i = 0; i < numValues; i++) {
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);
        }

        yScale.domain([0, d3.max(dataset)]);

        svg.selectAll("rect")
            .data(dataset)
            .transition()
            .delay(function(d, i) {
                return i * 100;
            })
            .duration(500)
            .ease(d3.easeCircleIn)
            .attr("y", function(d) {
                return yScale(d);
            })
            .attr("height", function(d) {
                return h - yScale(d);
            });
    });