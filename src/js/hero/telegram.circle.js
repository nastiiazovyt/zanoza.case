const video = document.querySelector('.den4ik');
const videoButton = document.querySelector('.den4ik-button');
const pink = document.querySelector('.circle_white');
let r = pink.getAttribute('r');
let c = Math.PI*(r*2);

const videoPlayer = () => {
    if (video.paused === false) {
        video.pause();
        console.log('ne slaziet');
        videoButton.classList.remove('den4ik-button_hidden')
    } else {
        video.play();
        videoButton.classList.add('den4ik-button_hidden')
        console.log('slaziet')
    }
}

const progressLoop = () => {
    setInterval(function () {
        pink.style.strokeDashoffset = String(((100-(Math.round(
            (video.currentTime / video.duration) * 100
        )))/100)*c)
    })
}

video.addEventListener('timeupdate', progressLoop);
video.addEventListener('click', videoPlayer);
videoButton.addEventListener('click', videoPlayer);


