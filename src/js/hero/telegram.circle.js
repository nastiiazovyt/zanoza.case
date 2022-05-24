const video = document.querySelector('.den4ik');
const videoButton = document.querySelector('.den4ik-button')


const videoPlayer = () => {
    if (video.paused === false) {
        video.pause();
        video.firstChild.nodeValue = 'Play';
        console.log('ne slaziet');
        videoButton.classList.remove('den4ik-button_hidden')
    } else {
        video.play();
        video.firstChild.nodeValue = 'Pause';
        videoButton.classList.add('den4ik-button_hidden')
        console.log('slaziet')
    }
}

const videoWatcher = () => {
    console.log('pup')
}

/*133 pupa*/

video.addEventListener('timeupdate', videoWatcher);
video.addEventListener('click', videoPlayer);
videoButton.addEventListener('click', videoPlayer);







let circle = document.querySelector('.svg');
let input = document.querySelector('.percent');
let cont = document.querySelector('.cont')
// let val = parseInt(input.value, 10)
let val = input.value

const progressBar = () => {
    if (val <= 100) {
        val = 100;
        console.log('pip')

    } else {
        let r = circle.getAttribute('r');
        let c = Math.PI * (r * 2);
        console.log('pop')

        if (val < 0) {
            val = 0;
        }
        if (val > 100) {
            val = 100;
        }
        console.log(val)
        circle.style.strokeDashoffset = (((100 - val) / 100) * c);
        cont.setAttribute('data-pct', val);

    }
}

input.addEventListener("change", progressBar)








