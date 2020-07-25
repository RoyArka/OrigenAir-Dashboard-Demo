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

var color = Chart.helpers.color;

//Functions 
function getSensorValue() {
  var originalUrlArray = window.location.href.split("/")
  var sensorId = originalUrlArray[originalUrlArray.length - 1];
  // var sensorApiUrl = "http://127.0.0.1:8000/sensor/api/for/origen-air/" + sensorId;
  var sensorApiUrl = "http://127.0.0.1:8000/sensor/api/for/testorg" + sensorId;
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

//RandomScalingFactor Function 
function randomScalingFactor() {
  return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}


//Temperature OnRefresh Function
function onRefreshTemp(chart) {
  chart.config.data.datasets.forEach(function (dataset) {
    dataset.data.push({
      x: Date.now(),
      y: randomScalingFactor()
    });
  });
}

//Humidity OnRefresh Function
function onRefreshHum(chart) {
  chart.config.data.datasets.forEach(function (dataset) {
    dataset.data.push({
      x: Date.now(),
      y: randomScalingFactor() * 100
    });
  });
}

//VOC OnRefresh Function
function onRefreshVOC(chart) {
  chart.config.data.datasets.forEach(function (dataset) {
    dataset.data.push({
      x: Date.now(),
      y: randomScalingFactor() * 150
    });
  });
}

//Carbon Dioxide OnRefresh Function
function onRefreshCarbdonDioxide(chart) {
  chart.config.data.datasets.forEach(function (dataset) {
    dataset.data.push({
      x: Date.now(),
      y: randomScalingFactor() * 200
    });
  });
}

//Temperature Gauge
new Chart(document.getElementById("doughnut-chart1"), {
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
    datasets: [{
        label: '1 (Linear)',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false,
        lineTension: 0,
        borderDash: [8, 4],
        data: [],
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

//Humidity Gauge 
new Chart(document.getElementById("doughnut-chart2"), {
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
    datasets: [{
        label: '1 (Linear)',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false,
        lineTension: 0,
        borderDash: [8, 4],
        data: [],
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

//VOC Gauge 
new Chart(document.getElementById("doughnut-chart3"), {
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
    datasets: [{
        label: '1 (Linear)',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        fill: false,
        lineTension: 0,
        borderDash: [8, 4],
        data: [],
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

//Carbon Dioxide Gauge
new Chart(document.getElementById("doughnut-chart4"), {
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

function getSensorValue() {
  var originalUrlArray = window.location.href.split("/")
  var sensorId = originalUrlArray[originalUrlArray.length - 1];
  // var sensorApiUrl = "http://127.0.0.1:8000/sensor/api/for/origen-air/" + sensorId;
  var sensorApiUrl = "http://127.0.0.1:8000/sensor/api/for/bc-transit" + sensorId;
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

function randomScalingFactor() {
  getSensorCount()
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

function getSensorCount() {
  // var originalUrlArray = window.location.href.split("/");
  // var sensorOrg = originalUrlArray[originalUrlArray.length - 1];
  var sensorApiUrl = "http://127.0.0.1:8000/sensor/api/for/bc-transit";
  var typeCount = [{},{},{},{}]
  $.ajax({
    async: false,
    url: sensorApiUrl,
    method: "GET",
    data: {},
    success: function (data) {
      for (var key in data) {
        var sensor_type = data[key].type;
        if (sensor_type=="temperature")
          typeCount[0][key] = data[key]
        else if(sensor_type=="humidity")
          typeCount[1][key] = data[key]
        else if(sensor_type=="voc")
          typeCount[2][key] = data[key]
        else if(sensor_type=="co2")
          typeCount[3][key] = data[key]
      }
    }
  });
  console.log(typeCount);
  return typeCount;
}

function onRefresh(chart) {
	chart.config.data.datasets.forEach(function(dataset) {
		dataset.data.push({
			x: Date.now(),
			y: randomScalingFactor()
		});
	});
}
