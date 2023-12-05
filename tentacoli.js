const svg = d3.select('#svg1');

let svg = d3.select('#svg1')
    .attr('width', 400)
    .attr('height', 400)
    .style('background-color', 'black');

svg.append('line')
    .style("stroke", "lightgreen")
    .style("stroke-width", 10)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 200)
    .attr("y2", 200);

console.log(svg);