  var container = $("#graph");

  // Determine how many data points to keep based on the placeholder's initial size;
  // this gives us a nice high-res plot while avoiding more than one point per pixel.

  var maximum = container.outerWidth() / 2 || 300;

  //

  var data = [];

  function addValue(value) {

    if (data.length === maximum) {
      data = data.slice(1);
    }
    data.push(value);
    // zip the generated y values with the x values

    var res = [];
    for (var i = 0; i < data.length; ++i) {
      res.push([i, data[i]]);
    }

    return res;
  }

  //

  var series = [{
    data: [],
    lines: {
      fill: true
    }
  }];

  //

  var plot = $.plot(container, series, {
    grid: {
      borderWidth: 1,
      minBorderMargin: 20,
      labelMargin: 10,
      backgroundColor: {
        colors: ["#fff", "#e4f4f4"]
      },
      margin: {
        top: 8,
        bottom: 20,
        left: 20
      },
      markings: function(axes) {
        var markings = [];
        var xaxis = axes.xaxis;
        for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
          markings.push({ xaxis: { from: x, to: x + xaxis.tickSize }, color: "rgba(232, 232, 255, 0.2)" });
        }
        return markings;
      }
    },
    yaxis: {
      tickFormatter: function() {
        return "";
      },
      min: 0,
      max: 200
    },
    xaxis: {
      tickFormatter: function() {
        return "";
      },
      min: 0,
      max: 300
    },
    legend: {
      show: true
    }
  });

  // Create the demo X and Y axis labels

  var yaxisLabel = $("<div class='axisLabel yaxisLabel'></div>")
        .text("Sine Wave")
        .appendTo(container);

  // Since CSS transforms use the top-left corner of the label as the transform origin,
  // we need to center the y-axis label by shifting it down by half its width.
  // Subtract 20 to factor the chart's bottom margin into the centering.

  yaxisLabel.css("margin-top", yaxisLabel.width() / 2 - 20);

  // Update the random dataset at 25FPS for a smoothly-animating chart

  function updateGraph(value) {
    series[0].data = addValue(value);
    plot.setData(series);
    plot.draw();
  }
