const video = document.querySelector('.den4ik');
const videoButton = document.querySelector('.den4ik-button');
const videoCircle = document.querySelector('.circle_white');
let r = videoCircle.getAttribute('r');
let c = Math.PI * (r * 2);
const videoWrapper = document.querySelector('.stage__block_video')
const videoStaticWrapper = document.querySelector('.stage__block_video-wrapper')
const replayClick = document.querySelector('.replay-button')
const videoCross = document.querySelector('.video-cross')

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
        replayClick.classList.add('hidden')
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
    replayClick.classList.remove('hidden')
    videoButton.classList.add('den4ik-button_hidden')

}

const videoVisible = () => {
    let timerId = setInterval(() => {
        console.log(videoStaticWrapper.getBoundingClientRect().y)
        if (-325 >= (videoStaticWrapper.getBoundingClientRect().y)) {
            console.log('можно запускать функцию которая уводит видео в угол')
            videoWrapper.classList.add('fixed')
            videoCross.classList.add('fixed')
        } else {
            console.log('возвращать видео обратно')
            videoWrapper.classList.remove('fixed')
            videoCross.classList.remove('fixed')
        }
        const videoCloser = () => {
            video.pause();
            videoWrapper.classList.remove('fixed')
            videoCross.classList.remove('fixed')
            video.currentTime = 0
            videoButton.classList.remove('den4ik-button_hidden')
            clearInterval(timerId)
        }
        videoCross.addEventListener('click', videoCloser)
    }, 100)
}

const videoClickFunctions = () => {
    videoPlayer ()
    videoVisible ()
}

const videoButtonFunctions = () => {
    videoPlayer ()
    videoVisible ()
}

video.addEventListener('timeupdate', progressLoop);
video.addEventListener('ended', replayVideo);
video.addEventListener('click', videoClickFunctions);
videoButton.addEventListener('click', videoButtonFunctions);









