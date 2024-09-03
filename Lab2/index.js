d3.csv("pet_ownership.csv").then(function(data) {
    console.log(data);
    var pets2019 = [];
    var pets2021 = [];
    data.forEach(data => {
        pets2019.push([data.animal, data.pets2019]);
        pets2021.push([data.animal, data.pets2021]);
    });
    drawChart(pets2019, "#pets2019_fig");
    drawChart(pets2021, "#pets2021_fig");
});

function drawChart(dataset, id) {
        var w = 500;
        var h = 100;

        var svg = d3.select(id)
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function(d, i) {
                return i * (w / dataset.length);
            })
            .attr("y", function(d) {
                return h - (d[1] * 4);
            })
            .attr("width", function(d) {
                padding = 1;
                return (w / dataset.length) - padding;
            })
            .attr("height", function(d) {
                return d[1] * 4;
            })
            .style("fill", function(d) {
                if (d[1] > 10) {
                    return "red";
                }
            })

        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function(d) {
                return d[0];
            })
            .attr("x", function(d, i) {
                return i * (w / dataset.length) + (w / dataset.length - padding) / 2;
            })
            .attr("y", function(d) {
                return h - (d[1] * 4);
            })
            .style("fill", "white")
}