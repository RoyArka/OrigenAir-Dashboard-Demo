const CHART = document.getElementById("myChart");
console.log(CHART);

let lineChart = new Chart(CHART, {
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Someone send help pls',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [10, 20, 53, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {}
});