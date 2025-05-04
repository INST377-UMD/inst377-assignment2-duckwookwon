// dog pics
fetch('https://dog.ceo/api/breeds/image/random/10')
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        var slider = document.getElementById('dogSlider');
        for (var i = 0; i < data.message.length; i++) {
            var img = document.createElement('img');
            img.src = data.message[i];
            slider.appendChild(img);
        }
        simpleslider.getSlider({
            container: slider,
            duration: 1,
            delay: 3
        });
    })
    .catch(function(err) {
        console.log('Dog pics didnt load');
    });

// dog breeds
fetch('https://dogapi.dog/api/v2/breeds')
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        var buttons = document.getElementById('breedButtons');
        for (var i = 0; i < data.data.length; i++) {
            var btn = document.createElement('button');
            btn.innerText = data.data[i].attributes.name;
            btn.className = 'breed-btn';
            btn.setAttribute('data-id', data.data[i].id);
            btn.onclick = function() {
                showBreed(this.getAttribute('data-id'));
            };
            buttons.appendChild(btn);
        }
    })
    .catch(function(err) {
        console.log('Breeds didnt load');
    });

function showBreed(id) {
    fetch('https://dogapi.dog/api/v2/breeds/' + id)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            document.getElementById('breedName').innerText = data.data.attributes.name;
            document.getElementById('breedDesc').innerText = data.data.attributes.description || 'No description';
            document.getElementById('breedMinLife').innerText = 'Min Life: ' + (data.data.attributes.life.min || 'N/A') + ' years';
            document.getElementById('breedMaxLife').innerText = 'Max Life: ' + (data.data.attributes.life.max || 'N/A') + ' years';
            document.getElementById('breedInfo').style.display = 'block';
        })
        .catch(function(err) {
            console.log('Breed info didnt load');
        });
}

// voice command for breeds
if (annyang) {
    annyang.addCommands({
        'load dog breed :breed': function(breed) {
            fetch('https://dogapi.dog/api/v2/breeds')
                .then(function(res) {
                    return res.json();
                })
                .then(function(data) {
                    for (var i = 0; i < data.data.length; i++) {
                        if (data.data[i].attributes.name.toLowerCase().includes(breed.toLowerCase())) {
                            showBreed(data.data[i].id);
                            return;
                        }
                    }
                    alert('Breed not found!');
                });
        }
    });
}