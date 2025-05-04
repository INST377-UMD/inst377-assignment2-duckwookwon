var chart = null;

function getStock() {
    var ticker = document.getElementById('ticker').value;
    var days = document.getElementById('days').value;
    var apiKey = 'hdPRrhQn4s_pwfCOyiEGiaMSyRiXV1EM'; 
    var today = new Date();
    var start = new Date();
    start.setDate(today.getDate() - days);
    var startDate = start.toISOString().split('T')[0];
    var endDate = today.toISOString().split('T')[0];
    var url = 'https://api.polygon.io/v2/aggs/ticker/' + ticker.toUpperCase() + '/range/1/day/' + startDate + '/' + endDate + '?apiKey=' + apiKey;

    fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            if (data.results) {
                var dates = [];
                var prices = [];
                for (var i = 0; i < data.results.length; i++) {
                    dates.push(new Date(data.results[i].t).toLocaleDateString());
                    prices.push(data.results[i].c);
                }

                if (chart) {
                    chart.destroy();
                }

                var ctx = document.getElementById('stockChart').getContext('2d');
                chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [{
                            label: ticker + ' Price',
                            data: prices,
                            borderColor: '#007BFF'
                        }]
                    }
                });
            } else {
                alert('No stock data!');
            }
        })
        .catch(function() {
            alert('Stock fetch failed!');
        });
}

// reddit stocks
fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03')
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        var table = document.querySelector('#redditStocks tbody');
        for (var i = 0; i < 5; i++) {
            var sentimentIcon = data[i].sentiment === 'Bullish'
                ? '<img src="https://img.icons8.com/color/48/000000/up-squared.png" width="20">'
                : '<img src="https://img.icons8.com/color/48/000000/down-squared.png" width="20">';
            var row = document.createElement('tr');
            row.innerHTML = '<td><a href="https://finance.yahoo.com/quote/' + data[i].ticker + '" target="_blank">' + data[i].ticker + '</a></td>' +
                            '<td>' + data[i].no_of_comments + '</td>' +
                            '<td>' + data[i].sentiment + ' ' + sentimentIcon + '</td>';
            table.appendChild(row);
        }
    })
    .catch(function() {
        alert('Reddit stocks failed!');
    });

// voice for stocks
if (annyang) {
    annyang.addCommands({
        'lookup :stock': function(stock) {
            document.getElementById('ticker').value = stock.toUpperCase();
            document.getElementById('days').value = '30';
            getStock();
        }
    });
}

