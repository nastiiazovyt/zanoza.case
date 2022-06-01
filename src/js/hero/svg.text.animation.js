import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const options = {
    root: null,
    rootMargin: '300px 0px -150px 0px',
    threshold: 1.0
}

const updateLabelsObserverParams = () => {
    switch (true) {
        case window.matchMedia("(max-width: 375px)").matches:
            options.rootMargin = '300px 0px -150px 0px'
            break;
        case window.matchMedia("(max-width: 1024px)").matches:
            options.rootMargin = '0px 0px -400px 0px'
            break;
        default:
            options.rootMargin = '300px 0px -150px 0px'
    }
}

let played = false;
let text1 = document.querySelector('#hero-text-inner1');
let text2 = document.querySelector('#hero-text-inner2');
let scrub;
scrub = window.matchMedia('(max-width:525px)').matches ? true : 6;
let svgAnimationSectionFirst = document.querySelector('.content__block_text');
let svgAnimationSectionSecond = document.querySelector('.content__block_svg-text')


const svgTitleAnimation = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !played) {
            updateLabelsObserverParams()
            console.log('aga')
            played = true
            document.querySelector('#hero-svg').classList.add('active')


            gsap.fromTo(text1, {
                attr: {
                    startOffset: `100%`
                },
            }, {
                attr: {
                    startOffset: `24%`
                },
                ease: 'none',
                scrollTrigger: {
                    trigger: svgAnimationSectionFirst,
                    scrub: true,
                    markers: true,
                    start: "top center",
                    end: "bottom center",
                }
            })
            gsap.fromTo(text1, {
                attr: {
                    startOffset: `24%`
                },
            }, {
                attr: {
                    startOffset: `100%`
                },
                ease: 'none',
                scrollTrigger: {
                    trigger: svgAnimationSectionSecond,
                    markers: true,
                    scrub: true,
                    start: "top 20%",
                    end: "bottom 20%",
                }
            })
            gsap.fromTo(text2, {
                attr: {
                    startOffset: `-100%`
                },
            }, {
                attr: {
                    startOffset: `13%`
                },
                ease: 'none',
                scrollTrigger: {
                    trigger: svgAnimationSectionFirst,
                    scrub: true,
                    start: "top center",
                    end: "bottom center",
                }
            })
            gsap.fromTo(text2, {
                attr: {
                    startOffset: `13%`
                },
            }, {
                attr: {
                    startOffset: `-200%`
                },
                ease: 'none',
                scrollTrigger: {
                    trigger: svgAnimationSectionSecond,
                    scrub: true,
                    start: "top 20%",
                    end: "bottom 20%",
                }
            })
        } else {
            console.log('nea')
        }
    })
};

const observer = new IntersectionObserver(svgTitleAnimation, options);
observer.observe(document.querySelector('.content__block_title'));


