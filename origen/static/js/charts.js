// new Chart(document.getElementById("doughnut-chart"), {
//   type: 'doughnut',
//   data: {
//     datasets: [{
//       label: "Population (millions)",
//       backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
//       data: [2478, 5267, 734, 784, 433]
//     }]
//   },
//   options: {
//     title: {
//       display: true,
//       text: 'Threshold Monitor'
//     },
//     rotation: -Math.PI,
//     cutoutPercentage: 30,
//     circumference: Math.PI,
//   }
// });

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
        label: "Asia",
        borderColor: "#ff0066",
        fill: false,
        lineTension: 0
      }, {
        data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
        label: "Europe",
        borderColor: "#cc0000",
        fill: false,
        lineTension: 0
      }, {
        data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
        label: "Latin America",
        borderColor: "#0000cc",
        fill: false,
        lineTension: 0
      }, {
        data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
        label: "North America",
        borderColor: "#ffd700",
        fill: false,
        lineTension: 0
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Sensors Data'
    }
  },
  responsive: true,
  maintainAspectRatio: false
});