//list of Chart colors
var chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};
var chartColorArray = ["red", "blue", "yellow", "green", "orange", "purple", "grey"]

var color = Chart.helpers.color;

//Functions 
function getSensorValue(sensorId) {
  var originalUrlArray = window.location.href.split("/")
  // var sensorApiUrl = "http://127.0.0.1:8000/sensor/api/for/origen-air/" + sensorId;
  var sensorApiUrl = "http://127.0.0.1:8000/sensor/api/for/bc-transit/" + sensorId;
  var value = 0.0;
  $.ajax({
    async: false,
    url: sensorApiUrl,
    method: "GET",
    data: {},
    success: function (data) {

      value = data.value;

    }
  });
  return value;
}

//RandomScalingFactor Function 
function randomScalingFactor() {
  return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

var refreshTempFlag = false
//Temperature OnRefresh Function
function onRefreshTemp(chart) {
  let sensorDict = getSensorCount("temperature")

  if (refreshTempFlag == false){
    let i = 0;
    for (var key in sensorDict){
      chart.config.data.datasets.push({
          label: sensorDict[key].name,
          backgroundColor: color(chartColors[chartColorArray[i]]).alpha(0.5).rgbString(),
          borderColor: chartColors[chartColorArray[i]],
          fill: false,
          lineTension: 0,
          borderDash: [8, 4],
          data: [],
          id: key,
      });
      i += 1;
      if (i==7)
        i = 0
    }
    refreshTempFlag = true;
  }

  chart.config.data.datasets.forEach(function (dataset) {
    dataset.data.push({
      x: Date.now(),
      y: getSensorValue(dataset.id)
    });
  });
}

//Humidity OnRefresh Function
var refreshHumFlag = false;
function onRefreshHum(chart) {
  let sensorDict = getSensorCount("humidity")

  if (refreshHumFlag == false){
    let i = 0;
    for (var key in sensorDict){
      chart.config.data.datasets.push({
          label: sensorDict[key].name,
          backgroundColor: color(chartColors[chartColorArray[i]]).alpha(0.5).rgbString(),
          borderColor: chartColors[chartColorArray[i]],
          fill: false,
          lineTension: 0,
          borderDash: [8, 4],
          data: [],
          id: key,
      });
      i += 1;
      if (i==7)
        i = 0
    }
    refreshHumFlag = true;
  }

  chart.config.data.datasets.forEach(function (dataset) {
    dataset.data.push({
      x: Date.now(),
      y: getSensorValue(dataset.id)
    });
  });
}

//VOC OnRefresh 
var refreshVocFlag = false;
function onRefreshVOC(chart) {
  let sensorDict = getSensorCount("voc")

  if (refreshVocFlag == false){
    let i = 0;
    for (var key in sensorDict){
      chart.config.data.datasets.push({
          label: sensorDict[key].name,
          backgroundColor: color(chartColors[chartColorArray[i]]).alpha(0.5).rgbString(),
          borderColor: chartColors[chartColorArray[i]],
          fill: false,
          lineTension: 0,
          borderDash: [8, 4],
          data: [],
          id: key,
      });
      i += 1;
      if (i==7)
        i = 0
    }
    refreshVocFlag = true;
  }

  chart.config.data.datasets.forEach(function (dataset) {
    dataset.data.push({
      x: Date.now(),
      y: getSensorValue(dataset.id)
    });
  });
}

//Carbon Dioxide OnRefresh Function
var refreshCo2Flag = false;
function onRefreshCarbdonDioxide(chart) {
  let sensorDict = getSensorCount("co2")

  if (refreshCo2Flag == false){
    let i = 0;
    for (var key in sensorDict){
      chart.config.data.datasets.push({
          label: sensorDict[key].name,
          backgroundColor: color(chartColors[chartColorArray[i]]).alpha(0.5).rgbString(),
          borderColor: chartColors[chartColorArray[i]],
          fill: false,
          lineTension: 0,
          borderDash: [8, 4],
          data: [],
          id: key,
      });
      i += 1;
      if (i==7)
        i = 0
    }
    refreshCo2Flag = true;
  }

  chart.config.data.datasets.forEach(function (dataset) {
    dataset.data.push({
      x: Date.now(),
      y: getSensorValue(dataset.id)
    });
  });
}

//Temperature Gauge
new Chart(document.getElementById("doughnut-chart1"), {
  type: 'doughnut',
  data: {
    datasets: [{
      label: "Population (millions)",
      backgroundColor: ["#03A9F4", "#00C853", "#FFEE58", "#FF5722", "#E53935"],
      data: [1, 1, 1, 1, 1]
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Temperature'
    },
    rotation: -Math.PI,
    cutoutPercentage: 30,
    circumference: Math.PI,
  }
});

//Temperature Chart
new Chart(document.getElementById("line-chart1"), {
  type: 'line',
  data: {
    datasets: []
  },
  options: {
    title: {
      display: true,
      text: 'Sensor Data'
    },
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          duration: 20000,
          refresh: 1000,
          delay: 2000,
          onRefresh: onRefreshTemp
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Temperature (°C)'
        }
      }]
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0
    }
  }
});

// Humidity Gauge 
new Chart(document.getElementById("doughnut-chart2"), {
  type: 'doughnut',
  data: {
    datasets: [{
      label: "Population (millions)",
      backgroundColor: ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"],
      data: [1, 1, 1, 1, 1]
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Humidity'
    },
    rotation: -Math.PI,
    cutoutPercentage: 30,
    circumference: Math.PI,
    responsive: true,
    maintainAspectRatio: false
  }
});

//Humidity Chart
new Chart(document.getElementById("line-chart2"), {
  type: 'line',
  data: {
    datasets: []
  },
  options: {
    title: {
      display: true,
      text: 'Sensor Data'
    },
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          duration: 20000,
          refresh: 1000,
          delay: 2000,
          onRefresh: onRefreshHum
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Humidity (%)'
        }
      }]
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0
    }
  }
});

// VOC Gauge 
new Chart(document.getElementById("doughnut-chart3"), {
  type: 'doughnut',
  data: {
    datasets: [{
      label: "Population (millions)",
      backgroundColor: ["#54478C", "#0DB39E", "#83E377", "#EFEA5A", "#F29E4C"],
      data: [1, 1, 1, 1, 1]
    }]
  },
  options: {
    title: {
      display: true,
      text: 'VOC'
    },
    rotation: -Math.PI,
    cutoutPercentage: 30,
    circumference: Math.PI,
    responsive: true,
    maintainAspectRatio: false
  }
});

//VOC Chart
new Chart(document.getElementById("line-chart3"), {
  type: 'line',
  data: {
    datasets: []
  },
  options: {
    title: {
      display: true,
      text: 'Sensor Data'
    },
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          duration: 20000,
          refresh: 1000,
          delay: 2000,
          onRefresh: onRefreshVOC
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'VOC (ppm)'
        }
      }]
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0
    }
  }
});

// Carbon Dioxide Gauge
new Chart(document.getElementById("doughnut-chart4"), {
  type: 'doughnut',
  data: {
    datasets: [{
      label: "Population (millions)",
      backgroundColor: ["#fff4a0", "#a8c162", "#488f31", "#f9a160", "#de425b"],
      data: [1, 1, 1, 1, 1]
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Carbon Dioxide'
    },
    rotation: -Math.PI,
    cutoutPercentage: 30,
    circumference: Math.PI,
    responsive: true,
    maintainAspectRatio: false
  }
});

//Carbon Dioxide Chart
new Chart(document.getElementById("line-chart4"), {
  type: 'line',
  data: {
    datasets: []
  },
  options: {
    title: {
      display: true,
      text: 'Sensor Data'
    },
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          duration: 20000,
          refresh: 1000,
          delay: 2000,
          onRefresh: onRefreshCarbdonDioxide
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'CO2 (ppm)'
        }
      }]
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0
    }
  }
});



function getSensorCount(desiredType) {
  // var originalUrlArray = window.location.href.split("/");
  // var sensorOrg = originalUrlArray[originalUrlArray.length - 1];
  var sensorApiUrl = "http://127.0.0.1:8000/sensor/api/for/bc-transit";
  var typeCount = [{}, {}, {}, {}]
  $.ajax({
    async: false,
    url: sensorApiUrl,
    method: "GET",
    data: {},
    success: function (data) {
      for (var key in data) {
        var sensor_type = data[key].type;
        if (sensor_type == "temperature")
          typeCount[0][key] = data[key]
        else if (sensor_type == "humidity")
          typeCount[1][key] = data[key]
        else if (sensor_type == "voc")
          typeCount[2][key] = data[key]
        else if (sensor_type == "co2")
          typeCount[3][key] = data[key]
      }
    }
  });
  if (desiredType == "temperature")
    return typeCount[0]
  else if (desiredType == "humidity")
    return typeCount[1]
  else if (desiredType == "voc")
    return typeCount[2]
  else if (desiredType == "co2")
    return typeCount[3]
}






// amCharts
//Gauge 1 [Temperature]
am4core.ready(function () {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // create chart
  var chart = am4core.create("chartdiv", am4charts.GaugeChart);
  chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
  chart.logo.disabled = true;

  chart.innerRadius = -25;

  var axis = chart.xAxes.push(new am4charts.ValueAxis());
  axis.min = 0;
  axis.max = 100;
  axis.strictMinMax = true;
  axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
  axis.renderer.grid.template.strokeOpacity = 0.3;

  var colorSet = new am4core.ColorSet();

  var range0 = axis.axisRanges.create();
  range0.value = 0;
  range0.endValue = 5;
  range0.axisFill.fillOpacity = 1;
  range0.axisFill.fill = colorSet.getIndex(9);
  range0.axisFill.zIndex = -1;

  var range1 = axis.axisRanges.create();
  range1.value = 5;
  range1.endValue = 95;
  range1.axisFill.fillOpacity = 1;
  range1.axisFill.fill = colorSet.getIndex(16);
  range1.axisFill.zIndex = -1;

  var range2 = axis.axisRanges.create();
  range2.value = 95;
  range2.endValue = 100;
  range2.axisFill.fillOpacity = 1;
  range2.axisFill.fill = colorSet.getIndex(9);
  range2.axisFill.zIndex = -1;

  var hand = chart.hands.push(new am4charts.ClockHand());

  // using chart.setTimeout method as the timeout will be disposed together with a chart
  chart.setTimeout(randomValue, 2000);

  function randomValue() {
    hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
    chart.setTimeout(randomValue, 2000);
  }

  // title
  var title = chart.titles.create();
  title.text = "Average CO2";
  title.fontSize = 25;
  title.marginBottom = 30;

  // bottom label
  var label = chart.chartContainer.createChild(am4core.Label);
  label.text = "CO2 (ppm)";
  label.align = "center";

});
// end am4core.ready()

// amChart Example Line
new Chart(document.getElementById("line-chart5"), {
  type: 'line',
  data: {
    datasets: [{
        label: '1 (Linear)',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false,
        data: [],
        lineTension: 0,
        borderDash: [8, 4],
        id: '1',
      },
      {
        label: '2 (Cubic)',
        backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
        borderColor: chartColors.blue,
        fill: false,
        cubicInterpolationMode: 'monotone',
        data: [],
        id: '2',
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Sensor Data'
    },
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          duration: 20000,
          refresh: 1000,
          delay: 2000,
          onRefresh: onRefreshCarbdonDioxide
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'CO2 (ppm)'
        }
      }]
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0
    }
  }
});










// //Gauge 2 [Humidity]
// am4core.ready(function () {

//   // Themes begin
//   am4core.useTheme(am4themes_animated);
//   // Themes end

//   // create chart
//   var chart = am4core.create("chartdiv2", am4charts.GaugeChart);
//   chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
//   chart.logo.disabled = true;

//   chart.innerRadius = -25;

//   var axis = chart.xAxes.push(new am4charts.ValueAxis());
//   axis.min = 0;
//   axis.max = 100;
//   axis.strictMinMax = true;
//   axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
//   axis.renderer.grid.template.strokeOpacity = 0.3;

//   var colorSet = new am4core.ColorSet();

//   var range0 = axis.axisRanges.create();
//   range0.value = 0;
//   range0.endValue = 5;
//   range0.axisFill.fillOpacity = 1;
//   range0.axisFill.fill = colorSet.getIndex(9);
//   range0.axisFill.zIndex = -1;

//   var range1 = axis.axisRanges.create();
//   range1.value = 5;
//   range1.endValue = 95;
//   range1.axisFill.fillOpacity = 1;
//   range1.axisFill.fill = colorSet.getIndex(16);
//   range1.axisFill.zIndex = -1;

//   var range2 = axis.axisRanges.create();
//   range2.value = 95;
//   range2.endValue = 100;
//   range2.axisFill.fillOpacity = 1;
//   range2.axisFill.fill = colorSet.getIndex(9);
//   range2.axisFill.zIndex = -1;

//   var hand = chart.hands.push(new am4charts.ClockHand());

//   // using chart.setTimeout method as the timeout will be disposed together with a chart
//   chart.setTimeout(randomValue, 2000);

//   function randomValue() {
//     hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
//     chart.setTimeout(randomValue, 2000);
//   }

//   // title
//   var title = chart.titles.create();
//   title.text = "Average Humidity";
//   title.fontSize = 25;
//   title.marginBottom = 30;

//   // bottom label
//   var label = chart.chartContainer.createChild(am4core.Label);
//   label.text = "Humidity (%)";
//   label.align = "center";

// }); // end am4core.ready()

// // Gauge 3 [VOC]
// am4core.ready(function () {

//   // Themes begin
//   am4core.useTheme(am4themes_animated);
//   // Themes end

//   // create chart
//   var chart = am4core.create("chartdiv3", am4charts.GaugeChart);
//   chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
//   chart.logo.disabled = true;

//   chart.innerRadius = -25;

//   var axis = chart.xAxes.push(new am4charts.ValueAxis());
//   axis.min = 0;
//   axis.max = 100;
//   axis.strictMinMax = true;
//   axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
//   axis.renderer.grid.template.strokeOpacity = 0.3;

//   var colorSet = new am4core.ColorSet();

//   var range0 = axis.axisRanges.create();
//   range0.value = 0;
//   range0.endValue = 5;
//   range0.axisFill.fillOpacity = 1;
//   range0.axisFill.fill = colorSet.getIndex(9);
//   range0.axisFill.zIndex = -1;

//   var range1 = axis.axisRanges.create();
//   range1.value = 5;
//   range1.endValue = 95;
//   range1.axisFill.fillOpacity = 1;
//   range1.axisFill.fill = colorSet.getIndex(16);
//   range1.axisFill.zIndex = -1;

//   var range2 = axis.axisRanges.create();
//   range2.value = 95;
//   range2.endValue = 100;
//   range2.axisFill.fillOpacity = 1;
//   range2.axisFill.fill = colorSet.getIndex(9);
//   range2.axisFill.zIndex = -1;

//   var hand = chart.hands.push(new am4charts.ClockHand());

//   // using chart.setTimeout method as the timeout will be disposed together with a chart
//   chart.setTimeout(randomValue, 2000);

//   function randomValue() {
//     hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
//     chart.setTimeout(randomValue, 2000);
//   }

//   // title
//   var title = chart.titles.create();
//   title.text = "Average VOC";
//   title.fontSize = 25;
//   title.marginBottom = 30;

//   // bottom label
//   var label = chart.chartContainer.createChild(am4core.Label);
//   label.text = "VOC (ppm)";
//   label.align = "center";

// }); // end am4core.ready()

// // Gauge 4 [CO2]
// am4core.ready(function () {

//   // Themes begin
//   am4core.useTheme(am4themes_animated);
//   // Themes end

//   // create chart
//   var chart = am4core.create("chartdiv4", am4charts.GaugeChart);
//   chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
//   chart.logo.disabled = true;

//   chart.innerRadius = -25;

//   var axis = chart.xAxes.push(new am4charts.ValueAxis());
//   axis.min = 0;
//   axis.max = 100;
//   axis.strictMinMax = true;
//   axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
//   axis.renderer.grid.template.strokeOpacity = 0.3;

//   var colorSet = new am4core.ColorSet();

//   var range0 = axis.axisRanges.create();
//   range0.value = 0;
//   range0.endValue = 5;
//   range0.axisFill.fillOpacity = 1;
//   range0.axisFill.fill = colorSet.getIndex(9);
//   range0.axisFill.zIndex = -1;

//   var range1 = axis.axisRanges.create();
//   range1.value = 5;
//   range1.endValue = 95;
//   range1.axisFill.fillOpacity = 1;
//   range1.axisFill.fill = colorSet.getIndex(16);
//   range1.axisFill.zIndex = -1;

//   var range2 = axis.axisRanges.create();
//   range2.value = 95;
//   range2.endValue = 100;
//   range2.axisFill.fillOpacity = 1;
//   range2.axisFill.fill = colorSet.getIndex(9);
//   range2.axisFill.zIndex = -1;

//   var hand = chart.hands.push(new am4charts.ClockHand());

//   // using chart.setTimeout method as the timeout will be disposed together with a chart
//   chart.setTimeout(randomValue, 2000);

//   function randomValue() {
//     hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
//     chart.setTimeout(randomValue, 2000);
//   }

//   // title
//   var title = chart.titles.create();
//   title.text = "Average CO2";
//   title.fontSize = 25;
//   title.marginBottom = 30;

//   // bottom label
//   var label = chart.chartContainer.createChild(am4core.Label);
//   label.text = "CO2 (ppm)";
//   label.align = "center";

// }); // end am4core.ready()