function init() {
    var w = 600;
    var h = 300;
    var padding = 50;

    var dataset

    d3.csv("Unemployment_78-95.csv", function (d) {
        return {

            date: new Date(+d.year, +d.month - 1),
            number: +d.number
        };
    }).then(function (data) {
        dataset = data;

        lineChart(dataset);
    });

    function lineChart(dataset) {
        xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, function (d) { return d.date }),
                d3.max(dataset, function (d) { return d.date })
            ])
            .range([0 + padding, w]);

        yScale = d3.scaleLinear()
            .domain([
                0,
                d3.max(dataset, function (d) { return d.number })
            ])
            .range([h - padding, 0]);

        area = d3.area()
                .x(function(d) {
                    return xScale(d.date);
                })
                .y0(function() {
                    return yScale.range()[0];
                })
                .y1(function(d) {
                    return yScale(d.number);
                })

        //line = d3.line()
        //    .x(function (d) { return xScale(d.date); })
        //    .y(function (d) { return yScale(d.number); });

        var xAxis = d3.axisBottom(xScale)

        var yAxis = d3.axisLeft(yScale)
        
        var svg = d3.select(".chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        svg.append("path")
            .datum(dataset)
            .attr("class", "line")
            .attr("d", area)
            .style("fill", "slategrey");

        svg.append("g")
            .call(xAxis)
            .attr("class", "axis")
            .attr("transform", "translate(0," + (h - padding) + ")");

        svg.append("g")
            .call(yAxis)
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + ",0)");

        svg.append("line")
            .attr("class", "line halfMilMark")
            .attr("x1", padding)
            .attr("y1", yScale(500000))
            .attr("x2", w)
            .attr("y2", yScale(500000))
            .style("stroke-dasharray", "5")//dashed array for line
            .style("stroke", "red");

        svg.append('text')
        .attr("class", "halfMilLabel")
        .attr("x", padding + 10)
        .attr("y", yScale(500000) - 7)
        .text("Half a million unemployed")
    }



}


init()