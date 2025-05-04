// annyang stuff
if (annyang) {
    var commands = {
        'hello': function() {
            alert('Hello World');
        },
        'change the color to :color': function(color) {
            document.body.style.backgroundColor = color;
        },
        'navigate to :page': function(page) {
            var pages = {
                'home': 'index.html',
                'stocks': 'stocks.html',
                'dogs': 'dogs.html'
            };
            if (pages[page.toLowerCase()]) {
                window.location.href = pages[page.toLowerCase()];
            } else {
                alert('Cant find that page!');
            }
        }
    };
    annyang.addCommands(commands);
    annyang.start();
}

// audio buttons
function turnAudioOn() {
    if (annyang) {
        annyang.start();
        alert('Audio is on');
    }
}

function turnAudioOff() {
    if (annyang) {
        annyang.abort();
        alert('Audio is off');
    }
}