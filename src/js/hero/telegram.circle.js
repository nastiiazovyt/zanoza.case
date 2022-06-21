const video = document.querySelector('.den4ik');
const videoButton = document.querySelector('.den4ik-button');
const videoCircle = document.querySelector('.circle_white');
let r = videoCircle.getAttribute('r');
let c = Math.PI * (r * 2);
const videoWrapper = document.querySelector('.stage__block_video')

const videoPlayer = () => {
    if (video.paused === false) {
        video.pause();
        console.log('ne slaziet');
        videoButton.classList.remove('den4ik-button_hidden')
    } else {
        video.play();
        videoButton.classList.add('den4ik-button_hidden')
        video.style.transform = 'scale(1.1, 1.1)'
        console.log('slaziet')
    }
}

const progressLoop = () => {
    setInterval(function () {
        videoCircle.style.strokeDashoffset = String(((100 - (Math.round(
            (video.currentTime / video.duration) * 100
        ))) / 100) * c)
    })
}

const replayVideo = () => {
    console.log('end')
    video.style.transform = 'scale(1, 1)'
    // добавить кнопочку реплай

}

const videoVisible = () => {
    if (-325 >= (video.getBoundingClientRect().y)) {
        console.log('можно запускать функцию которая уводит видео в угол')
        videoWrapper.classList.add('fixed')
    } else {
        console.log('возвращать видео обратно')
        // videoWrapper.classList.remove('fixed')
    }
}


video.addEventListener('timeupdate', progressLoop);
video.addEventListener('click', videoPlayer);
videoButton.addEventListener('click', videoPlayer);
video.addEventListener('ended', replayVideo);
video.addEventListener('timeupdate', videoVisible)









