new Chart(document.getElementById("doughnut-chart1"), {
  type: 'doughnut',
  data: {
    datasets: [{
      label: "Population (millions)",
      backgroundColor: ["#3e95cd", "#3cba9f", "#c45850"],
      data: [30, 70, 30]
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
    responsive: true,
    maintainAspectRatio: false
  }
});

new Chart(document.getElementById("line-chart1"), {
  type: 'line',
  data: {
    labels: ['Sep','Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        data: [28, 25, 18, 15, 15, 16, 18, 22, 25, 28],
        label: "Temperature",
        borderColor: "#ff0066",
        fill: false,
        lineTension: 0
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
          onRefresh: onRefresh
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Celsius (°C)'
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

new Chart(document.getElementById("line-chart2"), {
  type: 'line',
  data: {
    labels: ['Sep','Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
        label: "Humidity",
        borderColor: "#cc0000",
        fill: false,
        lineTension: 0
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Sensor Data'
    },
    responsive: true,
    maintainAspectRatio: false
  }
});

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

new Chart(document.getElementById("line-chart3"), {
  type: 'line',
  data: {
    labels: ['Sep','Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
        label: "VOC",
        borderColor: "#0000cc",
        fill: false,
        lineTension: 0
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Sensor Data'
    },
    responsive: true,
    maintainAspectRatio: false
  }
});

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

new Chart(document.getElementById("line-chart4"), {
  type: 'line',
  data: {
    labels: ['Sep','Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
        label: "Carbon Dioxide",
        borderColor: "#ffd700",
        fill: false,
        lineTension: 0
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Sensor Data'
    },
    responsive: true,
    maintainAspectRatio: false
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