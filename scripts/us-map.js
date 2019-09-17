var svg = d3.select("svg");
svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "lavender");

var path = d3.geoPath();

var gradeColors = [d3.rgb(250, 250, 250), d3.rgb(255, 210, 210), d3.rgb(255, 150, 150), d3.rgb(255, 80, 80), d3.rgb(255, 0, 0)];

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
            var colorIndex = Math.min((grade["grade"]).charCodeAt(0) - "A".charCodeAt(0), 4)
            return gradeColors[colorIndex]
        } else {
            return d3.rgb(255, 255, 255)
        }

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