//Get sensor_type
function getSensorType(){
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
            if (sensorType.localeCompare("voc") == 0){
                sensorString = "VOC (PPM)";
            }
        }
    });
    return sensorString;
}
//Get threshold_min & threshold_max
function getThresholdValues(){
    var originalUrlArray = window.location.href.split("/");
    var sensorId = originalUrlArray[originalUrlArray.length - 1];
    var sensorOrg = originalUrlArray[originalUrlArray.length - 2];
    var sensorApiUrl = "http://127.0.0.1:8000/sensor/api/for/" + sensorOrg + "/" + sensorId;
    var thresholdValues = [0,0]
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

//Get Doughnut Chart Data
function getDoughnutData(min, max){
    var originalUrlArray = window.location.href.split("/");
    var sensorId = originalUrlArray[originalUrlArray.length - 1];
    var sensorOrg = originalUrlArray[originalUrlArray.length - 2];
    var recordApiUrl = "http://127.0.0.1:8000/sensor/api/for/" + sensorOrg + "/" + sensorId + "/last/day/records";
    var recordData = [20,40,30];
    var under_min = 0;
    var over_max = 0;
    var in_range = 0;

    $.ajax({
        async: false,
        url: recordApiUrl,
        method: "GET",
        data: {},
        
        success: function (data) {
           num_records = Object.keys(data).length-1;

           for (var key in data){
            var value = data[key].value;
            if (value < min){
                under_min += 1;
            } else if (value > max){
                over_max += 1;
            } else {
                in_range += 1;
            } 
          }
          recordData = [(under_min/num_records * 100).toFixed(2), (in_range/num_records * 100).toFixed(2), (over_max/num_records * 100).toFixed(2)];
        }
    });

    return recordData;
}

//Bubble Chart
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
        text: 'Frequency of ' + getSensorType()
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
            labelString: getSensorType()
          }
        }]
      }
    }
});

//Mxed Bar & Line Chart
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

//Threshold Min, Max, Avg Chart (Doughnut Chart)
new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
        labels:[
            'Below Min',
            'In Range',
            'Above Max',
        ],
        datasets: [{
            label: "Population (millions)",
            backgroundColor: ["#ffcd56", "#36a3eb", "#ff6384"],
            data: getDoughnutData(getThresholdValues()[0], getThresholdValues()[1])
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

// function onRefresh(chart) {
//     chart.config.data.datasets.forEach(function (dataset) {
//         dataset.data.push({
//             x: Date.now(),
//             y: getSensorValue()
//         });
//     });
// }

//Onrefresh sensor value
function onRefresh(chart) {
    chart.config.data.datasets.forEach(function (dataset) {
        console.log(1);
        // console.log(dataset);
        // console.log(config.data.datasets[0] + "3 hours of sleep is good");
        dataset.data.push({
            x: Date.now(),
            y: getSensorValue()
        });
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
            // {
            //     label: 'Current Value (Cubic)',
            //     backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
            //     borderColor: chartColors.blue,
            //     fill: false,
            //     data: []
            // },
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
                    onRefresh: onRefresh, onRefresh2, onRefresh3
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
        }
    },
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