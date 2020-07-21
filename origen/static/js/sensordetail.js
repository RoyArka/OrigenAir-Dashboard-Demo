new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
        labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
        datasets: [{
                data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
                label: "Africa",
                borderColor: "#3e95cd",
                fill: false,
                lineTension: 0
            },
            {
                data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 2000],
                // label: "Asia",
                label: "Temperature",
                borderColor: "#ff0066",
                fill: false,
                lineTension: 0
            }, {
                data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
                // label: "Europe",
                label: "Humidity",
                borderColor: "#cc0000",
                fill: false,
                lineTension: 0
            }, {
                data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
                // label: "Latin America",
                label: "VOC",
                borderColor: "#0000cc",
                fill: false,
                lineTension: 0
            }, {
                data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
                // label: "North America",
                label: "CO2",
                borderColor: "#ffd700",
                fill: false,
                lineTension: 0
            }
        ]
    },
    options: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Line Chart 2'
        },
    }
});

new Chart(document.getElementById("bar-chart-grouped"), {
    type: 'bar',
    data: {
        labels: ["1900", "1950", "1999", "2050"],
        datasets: [{
            label: "Africa",
            backgroundColor: "#3e95cd",
            data: [133, 221, 783, 2478]
        }, {
            label: "Europe",
            backgroundColor: "#8e5ea2",
            data: [408, 547, 675, 734]
        }]
    },
    options: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Bar Chart'
        },
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
            text: 'Doughnut Chart'
        },
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
                label: 'Current Value',
                backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
                borderColor: chartColors.red,
                fill: false,
                lineTension: 0,
                borderDash: [8, 4],
                data: []
            },
            // {
            //     label: 'Value 2 (cubic interpolation)',
            //     backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
            //     borderColor: chartColors.blue,
            //     fill: false,
            //     cubicInterpolationMode: 'monotone',
            //     data: []
            // }
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

document.getElementById('randomizeData').addEventListener('click', function () {
    config.data.datasets.forEach(function (dataset) {
        dataset.data.forEach(function (dataObj) {
            dataObj.y = getSensorValue();
        });
    });
    window.myChart.update();
});

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

    config.data.datasets.push(newDataset);
    window.myChart.update();
});

document.getElementById('removeDataset').addEventListener('click', function () {
    config.data.datasets.pop();
    window.myChart.update();
});

document.getElementById('addData').addEventListener('click', function () {
    onRefresh(window.myChart);
    window.myChart.update();
});