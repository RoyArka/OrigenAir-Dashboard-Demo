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

            if (doughnut){
              for (var key in data) {
                  var value = data[key].value;
                  if (value < min) {
                      underMin += 1;
                  } else if (value > max) {
                      overMax += 1;
                  } else {
                      inRange += 1;
                  }
              }
              recordData = [(underMin / numRecords * 100).toFixed(2), (inRange / numRecords * 100).toFixed(2), (overMax / numRecords * 100).toFixed(2)];
            } else {
              var recordArray = [];
              for (var key in data){
                var value = data[key].value;
                recordArray.push(value);
                
              }
              
              recordArray.sort();
              var minArray = recordArray[0];
              
              var maxArray = recordArray[recordArray.length - 1];
              
              
              var avgArray = 0;
              // for (int i=0; i<recordArray.length; i++){
              //   avgArray += recordArray[i];
              // }
              // avgArray = avgArray / recordArray.length;
              
              recordData = [minArray, avgArray, maxArray];
              console.log(recordData);
            }

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
        console.log(recordData);
      }
    }
  });
  return recordData;
}
function formatMixedChartData(type){
  // Type 0: min
  // Type 1: average
  // Type 2: max

  var dayOneData = getRecordDayData(0,0,1,false);
  var dayTwoData = getRecordDayData(0,0,2,false);
  var dayThreeData = getRecordDayData(0,0,3,false);
  var dayFourData = getRecordDayData(0,0,4,false);
  
  var formattedArray = [dayFourData[type], dayThreeData[type], dayTwoData[type], dayOneData[type]];
  
  return formattedArray;
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

  let avg = 0.0
  let new_value = getSensorValue()

//Get Sensor AvgValue
function getAvgSensorValue(avg, new_value) {
  avg -= avg/3
  avg += new_value/3
  console.log(avg);
  return avg;
}

//Main Streaming Chart onRfresh property function 
function onRefresh(chart) {
    chart.config.data.datasets.forEach(function (dataset) {
        if (dataset.cubicInterpolationMode){
          dataset.data.push({
            x: Date.now(),
            y: randomScalingFactor()
          })
        } else {
        dataset.data.push({
            x: Date.now(),
            y: getSensorValue()
        });
        }
    });
}

var color = Chart.helpers.color;
var config = {
    type: 'line',
    data: {
        datasets: [{
                label: 'Current Value (Linear)',
                backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
                borderColor: chartColors.red,
                fill: false,
                lineTension: 0,
                borderDash: [8, 4],
                data: []
            },
            {
                label: 'Current Value (Cubic)',
                backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
                borderColor: chartColors.blue,
                fill: false,
                cubicInterpolationMode: 'monotone',
                data: []
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
        annotation: {
			events: ['click'],
			annotations: [{
					drawTime: 'afterDatasetsDraw',
					id: 'max_line',
					type: 'line',
					mode: 'horizontal',
					scaleID: 'y-axis-0',
					value: getThresholdValues()[1],
					borderColor: 'black',
					borderWidth: 1,
					label: {
						backgroundColor: 'red',
						content: 'Max',
						enabled: true
					},
					onClick: function(e) {
						console.log('Annotation', e.type, this);
					}
                },
                {
					drawTime: 'afterDatasetsDraw',
					id: 'min_line',
					type: 'line',
					mode: 'horizontal',
					scaleID: 'y-axis-0',
					value: getThresholdValues()[0],
					borderColor: 'black',
					borderWidth: 1,
					label: {
						backgroundColor: 'red',
						content: 'Min',
						enabled: true
					},
					onClick: function(e) {
						console.log('Annotation', e.type, this);
					}
                }
			]
		}
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

// Time Series Chart
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





