var w = 500;
var h = 300;

var projection = d3.geoMercator()
                    .center([145, -36.5])
                    .translate([w / 2, h / 2])
                    .scale(2800);

var path = d3.geoPath()
             .projection(projection);

var svg = d3.select('.chart')
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("fill", "grey")

//d3.json("./LGA_VIC.json").then(function(json) {
//    svg.selectAll("path")
//    .data(json.features)
//    .enter()
//    .append("path")
//    .attr("d", path);
//})

var color = d3.scaleQuantize()
            .range(['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c'])

d3.csv('./VIC_LGA_unemployment.csv').then(function(data) {
    color.domain([
        d3.min(data, function(d) {return d.unemployed;}),
        d3.max(data, function(d) {return d.unemployed;})
    ])
    console.log(data)
    d3.json("./LGA_VIC.json").then(function(json) {
        for (let i = 0; i < data.length; i++) {
            var dataState = data[i].LGA;
            var dataValue = parseFloat(data[i].unemployed);
            //console.log(json.features.length);
            for (let j = 0; j < json.features.length; j++) {
                //console.log(json.features[j])
                var jsonState = json.features[j].properties.LGA_name;
                if (dataState == jsonState) {
                    json.features[j].properties.value = dataValue;
                    //console.log(dataState)
                    break;
                }
            }
        }

        svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", function(d) {
            var value = d.properties.value;
            //console.log(value)
            if (value) {
                return color(value)
            } else {
                return "#ccc"
            }
        })

        d3.csv("./VIC_city.csv").then(function(data) {
            console.log(data)
            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d){
                    console.log(projection([d.lon, d.lat]))
                    return projection([d.lon, d.lat])[0];
                })
                .attr("cy", function(d){
                    return projection([d.lon, d.lat])[1];
                })
                .attr("r", 5)
                .style("fill", "red");
        })
    })
})



//d3.json("./LGA_VIC.json").then(function(json) {
//    svg.selectAll("path")
//    .data(json.features)
//    .enter()
//    .append("path")
//    .attr("d", path);
//})