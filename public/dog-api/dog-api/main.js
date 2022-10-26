
  document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json()
        .then(data => {
            $('#img-fetch').attr("src", data.message);
            var audio = new Audio('./sounds/dog-barking.mp3');
            audio.play();
        }));
    }
  })

