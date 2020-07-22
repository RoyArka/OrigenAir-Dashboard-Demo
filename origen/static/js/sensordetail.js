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

function getRecordDayData(min, max, days=1, doughnut=true) {
    var originalUrlArray = window.location.href.split("/");
    var sensorId = originalUrlArray[originalUrlArray.length - 1];
    var sensorOrg = originalUrlArray[originalUrlArray.length - 2];
    var recordApiUrl = "http://127.0.0.1:8000/sensor/api/for/" + sensorOrg + "/" + sensorId + "/day/records/" + days;
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

//Mxed Bar & Line Chart
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
        }
    }
});

new Chart(document.getElementById("bubble-chart"), {
    type: 'bubble',
    data: {
        labels: "Africa",
        datasets: [{
            label: ["China"],
            backgroundColor: "rgba(255,221,50,0.2)",
            borderColor: "rgba(255,221,50,1)",
            data: [{
                x: 2169017,
                y: 5.245,
                r: 15
            }]
        }, {
            label: ["Denmark"],
            backgroundColor: "rgba(60,186,159,0.2)",
            borderColor: "rgba(60,186,159,1)",
            data: [{
                x: 258702,
                y: 7.526,
                r: 10
            }]
        }, {
            label: ["Germany"],
            backgroundColor: "rgba(0,0,0,0.2)",
            borderColor: "#000",
            data: [{
                x: 3979083,
                y: 6.994,
                r: 15
            }]
        }, {
            label: ["Japan"],
            backgroundColor: "rgba(193,46,12,0.2)",
            borderColor: "rgba(193,46,12,1)",
            data: [{
                x: 4931877,
                y: 5.921,
                r: 15
            }]
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Frequency of ' + getSensorType()
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Frequency"
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: getSensorType()
                }
            }]
        }
    }
});

function randomScalingFactor() {
    var randomNum = (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
    return randomNum;
}

//Get Sensor value 
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

//Onrefresh sensor value
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

//Main Data Streaming Chart 
var color = Chart.helpers.color;
var config = {
    type: 'line',
    data: {
        datasets: [{
                label: 'Current Value (Linear)',
                backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
                borderColor: chartColors.green,
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
                data: []
            },
            // {
            //     label: 'Min Threshold',
            //     backgroundColor: color(chartColors.yellow).alpha(0.5).rgbString(),
            //     borderColor: chartColors.yellow,
            //     fill: false,
            //     data: []
            // },
            // {
            //     label: 'Max Threshold',
            //     backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
            //     borderColor: chartColors.red,
            //     fill: false,
            //     data: []
            // }
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
document.getElementById('addDataset').addEventListener('click', function () {
    var colorName = colorNames[config.data.datasets.length % colorNames.length];
    var newColor = chartColors[colorName];
    var newDataset = {
        label: 'Dataset ' + (config.data.datasets.length + 1),
        backgroundColor: color(newColor).alpha(0.5).rgbString(),
        borderColor: newColor,
        fill: false,
        lineTension: 0,
        data: []
    };
});