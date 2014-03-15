function makeGraph(inside){
  var container = document.createElement("div");
  container.id = 'aaaaaaa';
  container.style.width = "600px";
  container.style.height = "300px";
  inside.append(container);
  container = $('#aaaaaaa');
  var maximum = container.outerWidth() / 2 || 300;
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

  var yaxisLabel = $("<div class='axisLabel yaxisLabel'></div>")
        .text("Sine Wave")
        .appendTo(container);

  function updateGraph(value) {
    series[0].data = addValue(value);
    plot.setData(series);
    plot.draw();
  }

  return {
    addValue:updateGraph
  };
};
