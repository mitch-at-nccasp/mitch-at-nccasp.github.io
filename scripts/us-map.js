var svg = d3.select("svg");
svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "lavender");

var path = d3.geoPath();

var gradeColors = {
    "A+": d3.rgb(250, 250, 250),
    "A": d3.rgb(250, 250, 250),
    "A-": d3.rgb(250, 250, 250),
    "B+": d3.rgb(255, 153, 153),
    "B": d3.rgb(250, 100, 100),
    "B-": d3.rgb(250, 100, 100),
    "C+": d3.rgb(200, 53, 53),
    "C": d3.rgb(200, 53, 53),
    "C-": d3.rgb(200, 53, 53),
    "D+": d3.rgb(200, 0, 0),
    "D": d3.rgb(152, 50, 50),
    "D-": d3.rgb(152, 50, 50),
    "F": d3.rgb(152, 0, 0)
}

d3.json("https://mitch-at-nccasp.github.io/data/topology/us-10m.v1.json", function(error, us) {
  if (error) throw error;
  svg.append("g")
    .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
    .attr("d", path)
    .style("fill", function(d) {
        var grade = gradesMapping[idsMapping[d.id]]
        if(grade) {
            return gradeColors[grade["grade"]]
        } else {
            return d3.rgb(255, 255, 255)
        }

    })
    .style("hover", function(d) {
        return d3.rgb(100, 100, 255, .5);
    })
    .on("click", onStateClick);

  svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
  svg.append("path").attr("class", "state-borders").attr("d", path(topojson.feature(us, us.objects.nation)));

});

function onStateClick(d) {
    state = idsMapping[d.id]
    grade = gradesMapping[state]
    if(grade) {
        console.log("state clicked: " + state + " " + grade.grade)
    }
}