const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    // Time Display
    const timeDisplay = document.querySelector('.time-display');
    // Time Select
    const timeSelect = document.querySelectorAll('.time-select button');
    // get the length of the outline
    const outlineLength = outline.getTotalLength();
    // Duration
    let fakeDuration = 600;
    // functions to generate formatted time 
    const minGen = (time) => ('0' + Math.floor(time / 60)).slice(-2);
    const secGen = (time) => ('0' + Math.floor(time % 60)).slice(-2);

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    timeDisplay.textContent = `${minGen(fakeDuration)}:${secGen(fakeDuration)}`;

    // Pick different sounds 
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song);
        });
    });
    // Play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // Select sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            song.currentTime = 0;
            video.currentTime = 0;
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${minGen(fakeDuration)}:${secGen(fakeDuration)}`
        });
    });

    //Create a function specific to play and stop the song
    const checkPlaying = (song) => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    // We can animate the circle 
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        // Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        // Animate the text
        timeDisplay.textContent = `${minGen(elapsed)}:${secGen(elapsed)}`;

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };
};

app();