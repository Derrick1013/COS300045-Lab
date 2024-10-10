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
    .attr("height", h)
    .attr("fill", "slategrey");

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
    })
    .on("mouseover", function(event, d) {
        d3.select(this)
        .transition()
        .attr("fill", "orange")

        var xPosition = parseFloat(d3.select(this).attr("x"))
        var yPosition = parseFloat(d3.select(this).attr("y"))

        svg.append("text")
            .attr("id", "tooltip")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .attr("x", xPosition + (xScale.bandwidth() / 2))
            .attr("y", yPosition + 15)
            .text(d);
    })
    .on("mouseout", function() {
        d3.select(this)
        .transition()
        .attr("fill", "slategrey")

        d3.select("#tooltip").remove()
    });



    d3.select("button#add")
    .on("click", function() {
        var newNumber = Math.floor(Math.random() * maxValue);
        dataset.push(newNumber);
        xScale.domain(d3.range(dataset.length));

        var bars = svg.selectAll("rect")
            .data(dataset)

        var barsEnter = bars.enter()
            .append("rect")
            .attr("x", w)
            .attr("y", function(d) {
                return yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                return h - yScale(d);
            });

        bars.merge(barsEnter)
            .transition()
            .duration(500)
            .attr("x", function(d, i) {
                return xScale(i);
            })
            .attr("width", xScale.bandwidth());

            
            svg.selectAll("rect")
            .on("mouseover", function(event, d) {
                d3.select(this)
                .transition()
                .attr("fill", "orange")
        
                var xPosition = parseFloat(d3.select(this).attr("x"))
                var yPosition = parseFloat(d3.select(this).attr("y"))
        
                svg.append("text")
                    .attr("id", "tooltip")
                    .attr("fill", "black")
                    .attr("text-anchor", "middle")
                    .attr("x", xPosition + (xScale.bandwidth() / 2))
                    .attr("y", yPosition + 15)
                    .text(d);
            })
            .on("mouseout", function() {
                d3.select(this)
                .transition()
                .attr("fill", "slategrey")
        
                d3.select("#tooltip").remove()
            });

    });

d3.select("button#remove")
    .on("click", function() {
        dataset.pop();
        xScale.domain(d3.range(dataset.length));

        var bars = svg.selectAll("rect")
            .data(dataset);

        bars.exit()
            .transition()
            .duration(500)
            .attr("x", w)
            .remove();

        bars.transition()
            .duration(500)
            .attr("x", function(d, i) {
                return xScale(i);
            })
            .attr("width", xScale.bandwidth());
    });