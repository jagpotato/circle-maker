const w = 300;
const h = 300;
const svg = d3.select("#draw-area").attr("width", w).attr("height", h);

const r = 10;
const circlePos = [];
const drag = d3.drag()
               .on("drag", dragged);

function dragged(d) {
  d3.select(this)
    .attr("cx", d.x = d3.event.x)
    .attr("cy", d.y = d3.event.y);
}

svg.on("click", function() {
  const mousePos = d3.mouse(this);
  if ( isCircle(mousePos[0], mousePos[1]) === true ) {
    return;
  }
  circlePos.push({x: mousePos[0], y: mousePos[1]});

  redraw();
});

function redraw() {
  svg.selectAll("circle")
     .data(circlePos)
     .enter()
     .append("circle")
     .attr("cx", function(d, i) { return circlePos[i].x; })
     .attr("cy", function(d, i) { return circlePos[i].y; })
     .attr("r", r)
     .attr("fill", "#000000")
     .on("mouseover", function(d) {
       d3.select(this)
         .attr("cursor", "pointer")
         .attr("fill", "#ff0000");
     })
     .on("mouseout", function(d) {
       d3.select(this)
         .attr("cursor", "default")
         .attr("fill", "#000000");
     })
     .on("click", function(d, i) {
       console.log("click");
       // console.log(i);
       // circlePos.splice(i, 1);
       // console.log(circlePos);
       // redraw();
     })
     .call(drag);

  // svg.selectAll("circle")
  //    .data(circlePos)
  //    .exit()
  //    .remove();
}

function isCircle(x, y) {
  for ( let i = 0; i < circlePos.length; i++ ) {
    if ( Math.pow(circlePos[i].x - x, 2) + Math.pow(circlePos[i].y - y, 2) <= Math.pow(r, 2) ) {
      return true;
    }
  }
  return false;
}

function abs(x) {
  if ( x < 0 ) {
    return -x;
  }
  return x;
}
