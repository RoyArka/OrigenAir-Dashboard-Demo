// new Chart(document.getElementById("line-chart"), {
//     type: 'line',
//     data: {
//         labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
//         datasets: [{
//                 data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
//                 label: "Africa",
//                 borderColor: "#3e95cd",
//                 fill: false,
//                 lineTension: 0
//             },
//             {
//                 data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 2000],
//                 // label: "Asia",
//                 label: "Temperature",
//                 borderColor: "#ff0066",
//                 fill: false,
//                 lineTension: 0
//             }, {
//                 data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
//                 // label: "Europe",
//                 label: "Humidity",
//                 borderColor: "#cc0000",
//                 fill: false,
//                 lineTension: 0
//             }, {
//                 data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
//                 // label: "Latin America",
//                 label: "VOC",
//                 borderColor: "#0000cc",
//                 fill: false,
//                 lineTension: 0
//             }, {
//                 data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
//                 // label: "North America",
//                 label: "CO2",
//                 borderColor: "#ffd700",
//                 fill: false,
//                 lineTension: 0
//             }
//         ]
//     },
//     options: {
//         legend: {
//             display: false
//         },
//         title: {
//             display: true,
//             text: 'Line Chart 2'
//         },
//     }
// });

new Chart(document.getElementById("bubble-chart"), {
    type: 'bubble',
    data: {
      labels: "Africa",
      datasets: [
        {
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
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Frequency of Temperature Levels (°C)'
      }, scales: {
        yAxes: [{ 
          scaleLabel: {
            display: true,
            labelString: "Frequency"
          }
        }],
        xAxes: [{ 
          scaleLabel: {
            display: true,
            labelString: "Temperature (°C)"
          }
        }]
      }
    }
});

new Chart(document.getElementById("mixed-chart"), {
    type: 'bar',
    data: {
      labels: ["1900", "1950", "1999", "2050"],
      datasets: [{
          label: "Europe",
          type: "line",
          borderColor: "#8e5ea2",
          data: [408,547,675,734],
          fill: false
        }, {
          label: "Africa",
          type: "line",
          borderColor: "#3e95cd",
          data: [133,221,783,2478],
          fill: false
        }, {
          label: "Europe",
          type: "bar",
          backgroundColor: "rgba(0,0,0,0.2)",
          data: [408,547,675,734],
        }, {
          label: "Africa",
          type: "bar",
          backgroundColor: "rgba(0,0,0,0.2)",
          backgroundColorHover: "#3e95cd",
          data: [133,221,783,2478]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Population growth (millions): Europe & Africa'
      },
      legend: { display: false }
    }
});

new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
        datasets: [{
            label: "Population (millions)",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: [2478, 5267, 734, 784, 433]
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Threshold Monitor'
        },
        rotation: -Math.PI,
        cutoutPercentage: 30,
        circumference: Math.PI,
    }
});

var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

function randomScalingFactor() {
    var randomNum = (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
    console.log("X:" + Date.now());
    console.log("\n Y: " + randomNum);
    return randomNum;
}

function getSensorValue() {
    var originalUrlArray = window.location.href.split("/")
    var sensorId = originalUrlArray[originalUrlArray.length - 1];
    // var sensorApiUrl = "http://127.0.0.1:8000/sensor/api/for/origen-air/" + sensorId;
    var sensorApiUrl = "http://127.0.0.1:8000/sensor/api/for/testorg4/" + sensorId;
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

function onRefresh(chart) {
    chart.config.data.datasets.forEach(function (dataset) {
        dataset.data.push({
            x: Date.now(),
            y: getSensorValue()
        });
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
            text: 'Temperature (°C)'
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
                    labelString: 'Temperature (°C)'
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
        }
    },
    annotation: {
        annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: 50,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 4,
            label: {
                enabled: false,
                content: 'Test label'
            }
        }]
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