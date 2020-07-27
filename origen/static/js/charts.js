var chartColors = {
  red: '#F44336',
  orange: '#FF5722',
  yellow: '#FFEE58',
  green: '#00C853',
  blue: '#03A9F4',
  purple: '#7E57C2',
  grey: '#EEEEEE'
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

//used for counting inactive/active sensors
function getSensorStatus() {
  var sensorApiUrl = "http://127.0.0.1:8000/sensor/api/for/testorg/" + sensorId;
  var count = [{},{}];
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

var runningAvgTemp = 0.0
var tempArr = []

function getAvgTempValue(runningAvgTemp) {
  tempChart.config.data.datasets.forEach(function (dataset) {
    newValue = getSensorValue(dataset.id)
    tempArr.push(newValue)
    runningAvgTemp = tempArr.reduce(function (a, b) {
      return a + b;
    }) / tempArr.length
  });
  return runningAvgTemp.toFixed(2);
}

var runningAvgHumid = 0.0
var humidArr = []

function getAvgHumidValue(runningAvgHumid) {
  humidChart.config.data.datasets.forEach(function (dataset) {
    newValue = getSensorValue(dataset.id)
    humidArr.push(newValue)
    runningAvgHumid = humidArr.reduce(function (a, b) {
      return a + b;
    }) / humidArr.length
  });
  return runningAvgHumid.toFixed(2);
}

var runningAvgVoc = 0.0
var vocArr = []

function getAvgVocValue(runningAvgVoc) {
  vocChart.config.data.datasets.forEach(function (dataset) {
    newValue = getSensorValue(dataset.id)
    vocArr.push(newValue)
    runningAvgVoc = vocArr.reduce(function (a, b) {
      return a + b;
    }) / vocArr.length
  });
  return runningAvgVoc.toFixed(2);
}

var runningAvgCo2 = 0.0
var co2Arr = []

function getAvgCo2Value(runningAvgCo2) {
  co2Chart.config.data.datasets.forEach(function (dataset) {
    newValue = getSensorValue(dataset.id)
    co2Arr.push(newValue)
    runningAvgCo2 = co2Arr.reduce(function (a, b) {
      return a + b;
    }) / co2Arr.length
  });
  return runningAvgCo2.toFixed(2);
}

var refreshTempFlag = false
//Temperature OnRefresh Function
function onRefreshTemp(chart) {
  let sensorDict = getSensorCount("temperature")

  if (refreshTempFlag == false) {
    let i = 0;
    for (var key in sensorDict) {
      chart.config.data.datasets.push({
        label: sensorDict[key].name.charAt(0).toUpperCase() + sensorDict[key].name.slice(1),
        backgroundColor: color(chartColors[chartColorArray[i]]).alpha(0.5).rgbString(),
        borderColor: chartColors[chartColorArray[i]],
        fill: false,
        lineTension: 0,
        data: [],
        id: key,
      });
      i += 1;
      if (i == 7)
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

  if (refreshHumFlag == false) {
    let i = 0;
    for (var key in sensorDict) {
      chart.config.data.datasets.push({
        label: sensorDict[key].name.charAt(0).toUpperCase() + sensorDict[key].name.slice(1),
        backgroundColor: color(chartColors[chartColorArray[i]]).alpha(0.5).rgbString(),
        borderColor: chartColors[chartColorArray[i]],
        fill: false,
        lineTension: 0,
        data: [],
        id: key,
      });
      i += 1;
      if (i == 7)
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

  if (refreshVocFlag == false) {
    let i = 0;
    for (var key in sensorDict) {
      chart.config.data.datasets.push({
        label: sensorDict[key].name.charAt(0).toUpperCase() + sensorDict[key].name.slice(1),
        backgroundColor: color(chartColors[chartColorArray[i]]).alpha(0.5).rgbString(),
        borderColor: chartColors[chartColorArray[i]],
        fill: false,
        lineTension: 0,
        data: [],
        id: key,
      });
      i += 1;
      if (i == 7)
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

  if (refreshCo2Flag == false) {
    let i = 0;
    for (var key in sensorDict) {
      chart.config.data.datasets.push({
        label: sensorDict[key].name.charAt(0).toUpperCase() + sensorDict[key].name.slice(1),
        backgroundColor: color(chartColors[chartColorArray[i]]).alpha(0.5).rgbString(),
        borderColor: chartColors[chartColorArray[i]],
        fill: false,
        lineTension: 0,
        data: [],
        id: key,
      });
      i += 1;
      if (i == 7)
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

// amCharts
//Gauge 1 [Temperature]
am4core.ready(function () {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // create chart
  var chart = am4core.create("chartdiv1", am4charts.GaugeChart);
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
  range0.endValue = 20;
  range0.axisFill.fillOpacity = 1;
  range0.axisFill.fill = am4core.color("#003f5c");
  range0.axisFill.zIndex = -1;

  var range1 = axis.axisRanges.create();
  range1.value = 20;
  range1.endValue = 40;
  range1.axisFill.fillOpacity = 1;
  range1.axisFill.fill = am4core.color("#58508d");
  range1.axisFill.zIndex = -1;

  var range2 = axis.axisRanges.create();
  range2.value = 40;
  range2.endValue = 60;
  range2.axisFill.fillOpacity = 1;
  range2.axisFill.fill = am4core.color("#bc5090");
  range2.axisFill.zIndex = -1;

  var range3 = axis.axisRanges.create();
  range3.value = 60;
  range3.endValue = 80;
  range3.axisFill.fillOpacity = 1;
  range3.axisFill.fill = am4core.color("#ff6361");
  range3.axisFill.zIndex = -1;

  var range4 = axis.axisRanges.create();
  range4.value = 80;
  range4.endValue = 100;
  range4.axisFill.fillOpacity = 1;
  range4.axisFill.fill = am4core.color("#ffa600");
  range4.axisFill.zIndex = -1;

  var hand = chart.hands.push(new am4charts.ClockHand());

  // using chart.setTimeout method as the timeout will be disposed together with a chart
  chart.setTimeout(randomValue, 1000);

  function randomValue() {
    hand.showValue(Number(getAvgTempValue(runningAvgTemp)), 1000, am4core.ease.cubicOut);
    chart.setTimeout(randomValue, 1000);
  }

  // title
  var title = chart.titles.create();
  title.text = "Average Temperature";
  title.fontSize = 25;
  title.marginBottom = 30;

  // bottom label
  var label = chart.chartContainer.createChild(am4core.Label);
  label.text = "Temperature (°C)";
  label.align = "center";

});
// end am4core.ready()

//Temperature Chart
var tempChart = new Chart(document.getElementById("line-chart1"), {
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

// amCharts
//Gauge 2 [Humidity]
am4core.ready(function () {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // create chart
  var chart = am4core.create("chartdiv2", am4charts.GaugeChart);
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
  range0.endValue = 20;
  range0.axisFill.fillOpacity = 1;
  range0.axisFill.fill = am4core.color("#003f5c");
  range0.axisFill.zIndex = -1;

  var range1 = axis.axisRanges.create();
  range1.value = 20;
  range1.endValue = 40;
  range1.axisFill.fillOpacity = 1;
  range1.axisFill.fill = am4core.color("#58508d");
  range1.axisFill.zIndex = -1;

  var range2 = axis.axisRanges.create();
  range2.value = 40;
  range2.endValue = 60;
  range2.axisFill.fillOpacity = 1;
  range2.axisFill.fill = am4core.color("#bc5090");
  range2.axisFill.zIndex = -1;

  var range3 = axis.axisRanges.create();
  range3.value = 60;
  range3.endValue = 80;
  range3.axisFill.fillOpacity = 1;
  range3.axisFill.fill = am4core.color("#ff6361");
  range3.axisFill.zIndex = -1;

  var range4 = axis.axisRanges.create();
  range4.value = 80;
  range4.endValue = 100;
  range4.axisFill.fillOpacity = 1;
  range4.axisFill.fill = am4core.color("#ffa600");
  range4.axisFill.zIndex = -1;

  var hand = chart.hands.push(new am4charts.ClockHand());

  // using chart.setTimeout method as the timeout will be disposed together with a chart
  chart.setTimeout(randomValue, 1000);

  function randomValue() {
    hand.showValue(Number(getAvgHumidValue(runningAvgHumid)), 1000, am4core.ease.cubicOut);
    chart.setTimeout(randomValue, 1000);
  }

  // title
  var title = chart.titles.create();
  title.text = "Average Humidity";
  title.fontSize = 25;
  title.marginBottom = 30;

  // bottom label
  var label = chart.chartContainer.createChild(am4core.Label);
  label.text = "Humidity (%)";
  label.align = "center";

});
// end am4core.ready()

//Humidity Chart
var humidChart = new Chart(document.getElementById("line-chart2"), {
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

// amCharts
//Gauge 3 [VOC]
am4core.ready(function () {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // create chart
  var chart = am4core.create("chartdiv3", am4charts.GaugeChart);
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
  range0.endValue = 20;
  range0.axisFill.fillOpacity = 1;
  range0.axisFill.fill = am4core.color("#003f5c");
  range0.axisFill.zIndex = -1;

  var range1 = axis.axisRanges.create();
  range1.value = 20;
  range1.endValue = 40;
  range1.axisFill.fillOpacity = 1;
  range1.axisFill.fill = am4core.color("#58508d");
  range1.axisFill.zIndex = -1;

  var range2 = axis.axisRanges.create();
  range2.value = 40;
  range2.endValue = 60;
  range2.axisFill.fillOpacity = 1;
  range2.axisFill.fill = am4core.color("#bc5090");
  range2.axisFill.zIndex = -1;

  var range3 = axis.axisRanges.create();
  range3.value = 60;
  range3.endValue = 80;
  range3.axisFill.fillOpacity = 1;
  range3.axisFill.fill = am4core.color("#ff6361");
  range3.axisFill.zIndex = -1;

  var range4 = axis.axisRanges.create();
  range4.value = 80;
  range4.endValue = 100;
  range4.axisFill.fillOpacity = 1;
  range4.axisFill.fill = am4core.color("#ffa600");
  range4.axisFill.zIndex = -1;

  var hand = chart.hands.push(new am4charts.ClockHand());

  // using chart.setTimeout method as the timeout will be disposed together with a chart
  chart.setTimeout(randomValue, 1000);

  function randomValue() {
    hand.showValue(Number(getAvgVocValue(runningAvgVoc)), 1000, am4core.ease.cubicOut);
    chart.setTimeout(randomValue, 1000);
  }

  // title
  var title = chart.titles.create();
  title.text = "Average VOC";
  title.fontSize = 25;
  title.marginBottom = 30;

  // bottom label
  var label = chart.chartContainer.createChild(am4core.Label);
  label.text = "VOC (ppm)";
  label.align = "center";

});
// end am4core.ready()

//VOC Chart
var vocChart = new Chart(document.getElementById("line-chart3"), {
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

// amCharts
//Gauge 4 [CO2]
am4core.ready(function () {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // create chart
  var chart = am4core.create("chartdiv4", am4charts.GaugeChart);
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
  range0.endValue = 20;
  range0.axisFill.fillOpacity = 1;
  range0.axisFill.fill = am4core.color("#003f5c");
  range0.axisFill.zIndex = -1;

  var range1 = axis.axisRanges.create();
  range1.value = 20;
  range1.endValue = 40;
  range1.axisFill.fillOpacity = 1;
  range1.axisFill.fill = am4core.color("#58508d");
  range1.axisFill.zIndex = -1;

  var range2 = axis.axisRanges.create();
  range2.value = 40;
  range2.endValue = 60;
  range2.axisFill.fillOpacity = 1;
  range2.axisFill.fill = am4core.color("#bc5090");
  range2.axisFill.zIndex = -1;

  var range3 = axis.axisRanges.create();
  range3.value = 60;
  range3.endValue = 80;
  range3.axisFill.fillOpacity = 1;
  range3.axisFill.fill = am4core.color("#ff6361");
  range3.axisFill.zIndex = -1;

  var range4 = axis.axisRanges.create();
  range4.value = 80;
  range4.endValue = 100;
  range4.axisFill.fillOpacity = 1;
  range4.axisFill.fill = am4core.color("#ffa600");
  range4.axisFill.zIndex = -1;

  var range5 = axis.axisRanges.create();
  range5.value = 100;
  range5.endValue = 1000;
  range5.axisFill.fillOpacity = 1;
  range5.axisFill.fill = am4core.color("#ff0000");
  range5.axisFill.zIndex = -1;

  var hand = chart.hands.push(new am4charts.ClockHand());

  // using chart.setTimeout method as the timeout will be disposed together with a chart
  chart.setTimeout(randomValue, 1000);

  function randomValue() {
    hand.showValue(Number(getAvgCo2Value(runningAvgCo2)), 1000, am4core.ease.cubicOut);
    chart.setTimeout(randomValue, 1000);
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

//Carbon Dioxide Chart
var co2Chart = new Chart(document.getElementById("line-chart4"), {
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
