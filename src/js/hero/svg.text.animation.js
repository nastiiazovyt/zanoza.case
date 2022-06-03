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
            options.rootMargin = '-1000px 0px -1000px 0px'
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


const svgTitleAnimationDesktop = (entries, observerDesktop) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !played && window.matchMedia('(min-width:1626px)').matches) {
            console.log('desk')
            updateLabelsObserverParams()
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
                    start: "top 60%",
                    end: "bottom 60%",
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
                    start: "top 60%",
                    end: "bottom 60%",
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
        }
    })
};
const observerDesktop = new IntersectionObserver(svgTitleAnimationDesktop, options);
observerDesktop.observe(document.querySelector('.content__block_title'));


const svgTitleAnimationTablet = (entries, observerTablet) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !played && window.matchMedia('(max-width:1625px)').matches) {
            updateLabelsObserverParams()
            console.log('tabl')
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
                    start: "top 75%",
                    end: "bottom 75%",
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
                    start: "top 75%",
                    end: "bottom 75%",
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
        }
    })
};
const observerTablet = new IntersectionObserver(svgTitleAnimationTablet, options);
observerTablet.observe(document.querySelector('.content__block_title'));

const svgTitleAnimationMob = (entries, observerMob) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !played && window.matchMedia('(max-width:675px)').matches) {
            updateLabelsObserverParams()
            console.log('mob')
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
        }
    })
};
const observerMob = new IntersectionObserver(svgTitleAnimationMob, options);
observerMob.observe(document.querySelector('.content__block_title'));


