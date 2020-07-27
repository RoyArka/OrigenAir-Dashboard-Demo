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

//Functions Used for Charts 
function randomScalingFactor() {
  var randomNum = (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
  return randomNum;
}

function getSensorType() {
  var originalUrlArray = window.location.href.split("/");
  var sensorId = originalUrlArray[originalUrlArray.length - 1];
  var sensorOrg = originalUrlArray[originalUrlArray.length - 2];
  var sensorApiUrl = "http://127.0.0.1:8000/sensor/api/for/" + sensorOrg + "/" + sensorId;
  var sensorString = ""
  $.ajax({
    async: false,
    url: sensorApiUrl,
    method: "GET",
    data: {},
    success: function (data) {
      var sensorType = data.type;

      if (sensorType.localeCompare("temperature") == 0) {
        sensorString = "Temperature (°C)";
      } else if (sensorType.localeCompare("humidity") == 0) {
        sensorString = "Humidity (%)";
      } else if (sensorType.localeCompare("voc") == 0) {
        sensorString = "VOC (ppm)";
      } else if (sensorType.localeCompare("co2") == 0) {
        sensorString = "CO2 (ppm)";
      }
    }
  });
  return sensorString;
}

function getThresholdValues() {
  var originalUrlArray = window.location.href.split("/");
  var sensorId = originalUrlArray[originalUrlArray.length - 1];
  var sensorOrg = originalUrlArray[originalUrlArray.length - 2];
  var sensorApiUrl = "http://127.0.0.1:8000/sensor/api/for/" + sensorOrg + "/" + sensorId;
  var thresholdValues = [0, 0]
  $.ajax({
    async: false,
    url: sensorApiUrl,
    method: "GET",
    data: {},
    success: function (data) {
      var sensorMin = data.min;
      var sensorMax = data.max;
      thresholdValues = [sensorMin, sensorMax];
    }
  });
  return thresholdValues;
}

function getRecordDayData(minimum, maximum, time = "days", offset = 1, doughnut = true) {
  var originalUrlArray = window.location.href.split("/");
  var sensorId = originalUrlArray[originalUrlArray.length - 1];
  var sensorOrg = originalUrlArray[originalUrlArray.length - 2];
  var recordApiUrl = "http://127.0.0.1:8000/sensor/api/for/" + sensorOrg + "/" + sensorId + "/records/" + time + "/" + offset;
  var recordData = [0, 0, 0];
  var underMin = 0;
  var overMax = 0;
  var inRange = 0;

  $.ajax({
    async: false,
    url: recordApiUrl,
    method: "GET",
    data: {},

    success: function (data) {
      numRecords = Object.keys(data).length;

      if (doughnut) {
        for (var key in data) {
          var val = data[key].value;
          if (val < minimum) {
            underMin += 1;
          } else if (val > maximum) {
            overMax += 1;
          } else {
            inRange += 1;
          }
        }
        recordData = [(underMin / numRecords * 100).toFixed(2), (inRange / numRecords * 100).toFixed(2), (overMax / numRecords * 100).toFixed(2)];
      } else {
        var recordArray = [];
        for (var key in data) {
          var val = data[key].value;
          recordArray.push(val);
        }

        const forLoopMinAvgMax = () => {
          let min = recordArray[0],
            max = recordArray[0],
            avg = recordArray[0]

          for (let i = 1; i < recordArray.length; i++) {
            let value = recordArray[i]
            avg += value
            min = (value < min) ? value : min
            max = (value > max) ? value : max
          }
          avg = avg / recordArray.length
          return [min.toFixed(2), avg.toFixed(2), max.toFixed(2)]
        }
        const [forLoopMin, forLoopAvg, forLoopMax] = forLoopMinAvgMax()

        recordData = [forLoopMin, forLoopAvg, forLoopMax];
      }
    }
  });
  return recordData;
}

function formatMixedChartData(time, type) {
  // Type 0: min
  // Type 1: average
  // Type 2: max

  var dayOneData = getRecordDayData(0, 0, time, 1, false);
  var dayTwoData = getRecordDayData(0, 0, time, 2, false);
  var dayThreeData = getRecordDayData(0, 0, time, 3, false);
  var dayFourData = getRecordDayData(0, 0, time, 4, false);

  var formattedArray = [dayFourData[type], dayThreeData[type], dayTwoData[type], dayOneData[type]];

  return formattedArray;
}

// Update Button of Mixed Chart on Click
function mixedChartToggle() {
  var data = [];
  if (historicalChart.data.labels[0] == "4 Hours ago") {
    data = ["4 Days ago", "3 Days ago", "2 Days ago", "1 Day ago"];
  } else {
    data = ["4 Hours ago", "3 Hours ago", "2 Hours ago", "1 Hour ago"];
  }
  return data;
}

document.getElementById('update').addEventListener('click', function () {
  historicalChart.data.labels = mixedChartToggle();

  if (historicalChart.data.labels[0] == "4 Hours ago") {
    historicalChart.data.datasets[0].data = formatMixedChartData("hours", 1);
    historicalChart.data.datasets[1].data = formatMixedChartData("hours", 0);
    historicalChart.data.datasets[2].data = formatMixedChartData("hours", 1);
    historicalChart.data.datasets[3].data = formatMixedChartData("hours", 2);
  } else {
    historicalChart.data.datasets[0].data = formatMixedChartData("days", 1);
    historicalChart.data.datasets[1].data = formatMixedChartData("days", 0);
    historicalChart.data.datasets[2].data = formatMixedChartData("days", 1);
    historicalChart.data.datasets[3].data = formatMixedChartData("days", 2);
  }
  historicalChart.update();
});

//Get Sensor Value
function getSensorValue() {
  var originalUrlArray = window.location.href.split("/");
  var sensorId = originalUrlArray[originalUrlArray.length - 1];
  var sensorOrg = originalUrlArray[originalUrlArray.length - 2];
  var sensorApiUrl = "http://127.0.0.1:8000/sensor/api/for/" + sensorOrg + "/" + sensorId;
  var value = 0.0;
  $.ajax({
    async: false,
    url: sensorApiUrl,
    method: "GET",
    data: {},
    success: function (data) {
      var sensorValue = $("#sensor-value")[0];
      value = data.value;
      sensorValue.textContent = value;
    }
  });
  return value;
}

var runningAvg = 0.0
var valueArr = []
//Get Sensor AvgValue
function getAvgSensorValue(runningAvg) {
  var newValue = getSensorValue()
  valueArr.push(newValue)
  runningAvg = valueArr.reduce(function (a, b) {
    return a + b;
  }) / valueArr.length
  return runningAvg.toFixed(2);
}

//Main Streaming Chart onRfresh property function 
function onRefresh(chart) {
  chart.config.data.datasets.forEach(function (dataset) {
    if (dataset.id == 'min_threshold') {
      //Sensor Min_Threshold
      dataset.data.push({
        x: Date.now(),
        y: getThresholdValues()[0]
      });
    } else if (dataset.id == 'sensor_value') {
      //Sensor Value
      dataset.data.push({
        x: Date.now(),
        y: getSensorValue()
      });
    } else if (dataset.id == 'avg') {
      //Sensor Avg Value
      dataset.data.push({
        x: Date.now(),
        // y: getAvgSensorValue(runningAvg)
        y: getAvgSensorValue(runningAvg)
      });
    } else if (dataset.id == 'max_threshold') {
      //Sensor Min_Threshold
      dataset.data.push({
        x: Date.now(),
        y: getThresholdValues()[1]
      });
    }
  });
}

//Main Streaming Chart
var color = Chart.helpers.color;
var config = {
  type: 'line',
  data: {
    datasets: [{
        label: 'Min Threshold',
        backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
        borderColor: chartColors.yellow,
        fill: false,
        data: [],
        id: 'min_threshold',
      },
      {
        label: 'Current Value (Linear)',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        fill: false,
        lineTension: 0,
        borderDash: [8, 4],
        data: [],
        id: 'sensor_value',
      },
      {
        label: 'Avg Value (Cubic)',
        backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
        borderColor: chartColors.blue,
        fill: false,
        cubicInterpolationMode: 'monotone',
        data: [],
        id: 'avg',
      },
      {
        label: 'Max Threshold',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false,
        data: [],
        id: 'max_threshold',
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: getSensorType()
    },
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          duration: 20000,
          refresh: 1000,
          delay: 2000,
          onRefresh: onRefresh
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: getSensorType()
        }
      }]
    },
    tooltips: {
      mode: 'nearest',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: false
    },
  }
};

window.onload = function () {
  var ctx = document.getElementById('myChart').getContext('2d');
  window.myChart = new Chart(ctx, config);
};

var colorNames = Object.keys(chartColors);

//Threshold monitor doughnut-chart
new Chart(document.getElementById("doughnut-chart"), {
  type: 'doughnut',
  data: {
    labels: [
      'Below Min',
      'In Range',
      'Above Max',
    ],
    datasets: [{
      label: "",
      backgroundColor: ["#ffcd56", "#36a3eb", "#ff6384"],
      data: getRecordDayData(getThresholdValues()[0], getThresholdValues()[1])
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Threshold Monitor - Last 24 Hours (%)'
    },
    rotation: -Math.PI,
    cutoutPercentage: 30,
    circumference: Math.PI,
  }
});

//Historical Chart
var historicalChart = new Chart(document.getElementById("mixed-chart"), {
  type: 'bar',
  data: {
    labels: ["4 Days ago", "3 Days ago", "2 Days ago", "1 Day ago"],
    datasets: [{
      label: "Average",
      type: "line",
      backgroundColor: "#4bc076",
      borderColor: "#4bc076",
      data: formatMixedChartData("days", 1),
      fill: false
    }, {
      label: "Min",
      type: "bar",
      backgroundColor: "rgba(255, 205, 86, 0.7)",
      borderColor: chartColors.yellow,
      data: formatMixedChartData("days", 0),
    }, {
      label: "Average",
      type: "bar",
      backgroundColor: "rgba(54, 163, 235, 0.7)",
      borderColor: chartColors.blue,
      data: formatMixedChartData("days", 1),
    }, {
      label: "Max",
      type: "bar",
      backgroundColor: "rgba(255, 99, 132, 0.7)",
      borderColor: chartColors.red,
      data: formatMixedChartData("days", 2),
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Historical ' + getSensorType() + ' Levels'
    },
    options: {
      title: {
        display: true,
        text: 'Recent ' + getSensorType() + ' Levels'
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: getSensorType()
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Days'
          }
        }]
      },
    }
  }
});