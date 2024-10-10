function init() {
    var w = 600;
    var h = 300;

    var dataset

d3.csv("Unemployment_78-95.csv", function(d) {
    return {

        date: new Date(+d.year, +d.month-1),
        number: +d.number
    };
}).then(function(data) {
    dataset = data;

    lineChart(dataset);
});

function lineChart(dataset) {
    xScale = d3.scaleTime()
                .domain([
                    d3.min(dataset, function(d) {return d.date}),
                    d3.max(dataset, function(d) {return d.date})
                ])
                .range([0,w]);

    yScale = d3.scaleLinear()
                .domain([
                    0,
                    d3.max(dataset, function(d) {return d.number})
                ])
                .range([h,0]);

    line = d3.line()
                .x(function(d) {return xScale(d.date);})
                .y(function(d) {return yScale(d.number);});


    var svg = d3.select(".chart")
                .append("svg")
                .attr("width",w)
                .attr("height",h);

        svg.append("path")
            .datum(dataset)
            .attr("class","line")
            .attr("d",line);
}



}


init()