var svg = d3.select("svg");

var path = d3.geoPath();

d3.json("https://mitch-at-nccasp.github.io/data/topology/us-10m.v1.json", function(error, us) {
  if (error) throw error;

  svg.append("g")
      .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("d", path)
      .on("click", onStateClick);

  svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
});

function onStateClick(d) {
    console.log("state clicked: " + idsMapping[d.id])
}