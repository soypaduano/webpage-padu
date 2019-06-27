

$( document ).ready(function() {
    var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'],
        datasets: [{
            label: 'Dioxido de Azufre',
            backgroundColor: 'rgb(208, 173, 167)',
            borderColor: 'rgb(9, 20, 82)',
            data: [3.1, 2.4, 1.0, 2, 53.6, 10.9, 46.2, 36.0, 128.5, 55.6]
        },
        {
            label: 'Monoxido de nitrogeno',
            backgroundColor: 'rgb(232, 214, 203)',
            borderColor: 'rgb(232, 214, 203)',
            data: [1.8,	11.0,	5.0,	15.0,	7.4,	11.2,	30.4,	39.9,	42.2,	55.2]
        },
        {
            label: 'Dioxido de nitrogeno',
            backgroundColor: 'rgb(192, 184, 203)',
            borderColor: 'rgb(232, 184, 203)',
            data: [	2.8,	10.7,	35.0,	38.0,	12.5,	24.5,	35.1,	55.2,	53.9,	89.0]
        }
        
    ]
    },

    // Configuration options go here
    options: {}
});
});
