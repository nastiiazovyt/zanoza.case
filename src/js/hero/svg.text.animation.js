import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const options = {
    root: null,
    rootMargin: '300px 0px -150px 0px',
    threshold: 1.0
}

let played = false
const svgTitleAnimation = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !played) {
            console.log('aga')
            played = true
            document.querySelector('#hero-svg').classList.add('active')
            gsap.from(document.querySelector('#hero-text-inner1'), {
                attr: {
                    startOffset: '90%'
                },
                duration: 2.5,
                ease: 'power4.out',
            })
            gsap.from(document.querySelector('#hero-text-inner2'), {
                attr: {
                    startOffset: '-55%'
                },
                duration: 2.5,
                ease: 'power4.out',
            })
        } else {
            console.log('nea')
        }
    })
};

const observer = new IntersectionObserver(svgTitleAnimation, options);
observer.observe(document.querySelector('.content__block_text'));
