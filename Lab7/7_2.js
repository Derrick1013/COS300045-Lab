function init() {
    var dataset = [4,10,1,14,3]
    var w = 300;
    var h = 300;

    var outerRadius = w / 2;
    var innerRadius = w / 5;

    var arc = d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius)

    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var pie = d3.pie()

    var svg = d3.select(".chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    var arcs = svg.selectAll("g.arc")
                .data(pie(dataset))
                .enter()
                .append("g")
                .attr("class", "arc")
                .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")

    arcs.append("path")
        .attr("fill", function(d,i) {
            return color(i);
        })
        .attr("d", function(d,i) {
            return arc(d,i);
        })
    
    arcs.append("text")
        .text(function(d) {
            return d.value;
        })
        .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
    }

init()