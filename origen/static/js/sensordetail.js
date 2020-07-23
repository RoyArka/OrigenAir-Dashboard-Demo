var chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

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
  var recordData = [20, 40, 30];
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
          return [min, avg, max]
        }
        const [forLoopMin, forLoopAvg, forLoopMax] = forLoopMinAvgMax()

        recordData = [forLoopMin.toFixed(2), forLoopAvg.toFixed(2), forLoopMax.toFixed(2)];
        console.log(recordData);
      }
    }
  });
  return recordData;
}

function formatMixedChartData(type) {
  // Type 0: min
  // Type 1: average
  // Type 2: max

  var dayOneData = getRecordDayData(0, 0, "days", 1, false);
  var dayTwoData = getRecordDayData(0, 0, "days", 2, false);
  var dayThreeData = getRecordDayData(0, 0, "days", 3, false);
  var dayFourData = getRecordDayData(0, 0, "days", 4, false);

  var formattedArray = [dayFourData[type], dayThreeData[type], dayTwoData[type], dayOneData[type]];

  return formattedArray;
}

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

new Chart(document.getElementById("mixed-chart"), {
  type: 'bar',
  data: {
    labels: ["Day 4", "Day 3", "Day 2", "Day 1"],
    datasets: [{
      label: "Average",
      type: "line",
      borderColor: "#4bc076",
      data: formatMixedChartData(1),
      fill: false
    }, {
      label: "Min",
      type: "bar",
      backgroundColor: "rgba(255, 205, 86, 0.7)",
      data: formatMixedChartData(0),
    }, {
      label: "Average",
      type: "bar",
      backgroundColor: "rgba(54, 163, 235, 0.7)",
      data: formatMixedChartData(1),
    }, {
      label: "Max",
      type: "bar",
      backgroundColor: "rgba(255, 99, 132, 0.7)",
      data: formatMixedChartData(2),
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

// TIME SERIES CHART

//   new Chart(document.getElementById("timeseries-chart"), {
//     type: 'bar',
//     data: {
//         labels: ["Day 4", "Day 3", "Day 2", "Day 1"],
//         datasets: [{
//             label: "Average",
//             type: "line",
//             borderColor: "#4bc076",
//             data: formatMixedChartData(1),
//             fill: false
//         }, {
//             label: "Min",
//             type: "bar",
//             backgroundColor: "rgba(255, 205, 86, 0.7)",
//             data: formatMixedChartData(0),
//         }, {
//             label: "Average",
//             type: "bar",
//             backgroundColor: "rgba(54, 163, 235, 0.7)",
//             data: formatMixedChartData(1),
//         }, {
//             label: "Max",
//             type: "bar",
//             backgroundColor: "rgba(255, 99, 132, 0.7)",
//             data: formatMixedChartData(2),
//         }]
//     },
//     options: {
//         title: {
//             display: true,
//             text: 'Historical ' + getSensorType() + ' Levels'
//         },
//         legend: {
//             display: false
//         },
//         scales: {
//             yAxes: [{
//                 scaleLabel: {
//                     display: true,
//                     labelString: getSensorType()
//                 }
//             }],
//             xAxes: [{
//                 // type: 'time',
//                 distribution: 'series',
//                 scaleLabel: {
//                     display: true,
//                     labelString: 'Days'
//                 }
//             }]
//         }
//     }
//   });


function randomScalingFactor() {
  var randomNum = (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
  return randomNum;
}

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


//Get Sensor AvgValue
function getAvgSensorValue (minimum, maximum, time = "days", offset = 1, doughnut = true) {
  var originalUrlArray = window.location.href.split("/");
  var sensorId = originalUrlArray[originalUrlArray.length - 1];
  var sensorOrg = originalUrlArray[originalUrlArray.length - 2];
  var days = 2;
  var recordApiUrl = "http://127.0.0.1:8000/sensor/api/for/" + sensorOrg + "/" + sensorId + "/records/" + days + "/" + offset;
  var recordData = [20, 40, 30];
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
          return [min, avg, max]
        }
        const [forLoopMin, forLoopAvg, forLoopMax] = forLoopMinAvgMax()

        recordData = [forLoopAvg];
        console.log(recordData);
      }
    }
  });
  return recordData;
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
        y: getAvgSensorValue()
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

// SHADY CODE

function generateData() {
    var unit = document.getElementById('unit').value;

    function unitLessThanDay() {
        return unit === 'second' || unit === 'minute' || unit === 'hour';
    }

    function beforeNineThirty(date) {
        return date.hour() < 9 || (date.hour() === 9 && date.minute() < 30);
    }

    // Returns true if outside 9:30am-4pm on a weekday
    function outsideMarketHours(date) {
        if (date.isoWeekday() > 5) {
            return true;
        }
        if (unitLessThanDay() && (beforeNineThirty(date) || date.hour() > 16)) {
            return true;
        }
        return false;
    }

    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    function randomBar(date, lastClose) {
        var open = randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
        var close = randomNumber(open * 0.95, open * 1.05).toFixed(2);
        return {
            t: date.valueOf(),
            y: close
        };
    }

    var date = moment('Jan 01 1990', 'MMM DD YYYY');
    var now = moment();
    var data = [];
    var lessThanDay = unitLessThanDay();
    for (; data.length < 600 && date.isBefore(now); date = date.clone().add(1, unit).startOf(unit)) {
        if (outsideMarketHours(date)) {
            if (!lessThanDay || !beforeNineThirty(date)) {
                date = date.clone().add(date.isoWeekday() >= 5 ? 8 - date.isoWeekday() : 1, 'day');
            }
            if (lessThanDay) {
                date = date.hour(9).minute(30).second(0);
            }
        }
        data.push(randomBar(date, data.length > 0 ? data[data.length - 1].y : 30));
    }

    return data;
}

var ctx = document.getElementById('chart1').getContext('2d');
ctx.canvas.width = 1000;
ctx.canvas.height = 300;

var color = Chart.helpers.color;
var cfg = {
    data: {
        datasets: [{
            label: 'CHRT - Chart.js Corporation',
            backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
            borderColor: window.chartColors.red,
            data: generateData(),
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
        }]
    },
    options: {
        animation: {
            duration: 0
        },
        scales: {
            xAxes: [{
                type: 'time',
                distribution: 'series',
                offset: true,
                ticks: {
                    major: {
                        enabled: true,
                        fontStyle: 'bold'
                    },
                    source: 'data',
                    autoSkip: true,
                    autoSkipPadding: 75,
                    maxRotation: 0,
                    sampleSize: 100
                },
                afterBuildTicks: function(scale, ticks) {
                    var majorUnit = scale._majorUnit;
                    var firstTick = ticks[0];
                    var i, ilen, val, tick, currMajor, lastMajor;

                    val = moment(ticks[0].value);
                    if ((majorUnit === 'minute' && val.second() === 0)
                            || (majorUnit === 'hour' && val.minute() === 0)
                            || (majorUnit === 'day' && val.hour() === 9)
                            || (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1)
                            || (majorUnit === 'year' && val.month() === 0)) {
                        firstTick.major = true;
                    } else {
                        firstTick.major = false;
                    }
                    lastMajor = val.get(majorUnit);

                    for (i = 1, ilen = ticks.length; i < ilen; i++) {
                        tick = ticks[i];
                        val = moment(tick.value);
                        currMajor = val.get(majorUnit);
                        tick.major = currMajor !== lastMajor;
                        lastMajor = currMajor;
                    }
                    return ticks;
                }
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Closing price ($)'
                }
            }]
        },
        tooltips: {
            intersect: false,
            mode: 'index',
            callbacks: {
                label: function(tooltipItem, myData) {
                    var label = myData.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += parseFloat(tooltipItem.value).toFixed(2);
                    return label;
                }
            }
        }
    }
};

var chart = new Chart(ctx, cfg);

document.getElementById('update').addEventListener('click', function() {
    var type = document.getElementById('type').value;
    var dataset = chart.config.data.datasets[0];
    dataset.type = type;
    dataset.data = generateData();
    chart.update();
});
