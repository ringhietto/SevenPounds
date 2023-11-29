// combining scrollama with svg css animations
// https://brettsnaidero.github.io/svg-animation-slides/#/19

const scroller = scrollama();

let redLine = d3.select("#line_red");
let redlinelength = redLine.node().getTotalLength();
redLine
  .attr("stroke-dasharray", redlinelength)
  .attr("stroke-dashoffset", redlinelength);

let blueLine = d3.select("#line_blue");
let bluelinelength = blueLine.node().getTotalLength();
blueLine
  .attr("stroke-dasharray", bluelinelength)
  .attr("stroke-dashoffset", bluelinelength);

function handleStepProgress(scroll) {
  console.log("prog:", scroll.progress);

  redLine.attr(
    "stroke-dashoffset",
    redlinelength - scroll.progress * redlinelength
  );
  blueLine.attr(
    "stroke-dashoffset",
    bluelinelength - scroll.progress * bluelinelength
  );
}

function init() {
  // 1. setup the scroller with the bare-bones settings
  // this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scroll",
      progress: true,
      debug: false,
      threshold: 1,
    })
    .onStepProgress(handleStepProgress);
}

// kick things off
init();
