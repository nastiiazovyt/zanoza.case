import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
const map = (x, a1, a2, b1, b2) => (x - a1) * (b2 - b1) / (a2 - a1) + b1;
const lerp = (a, b, n) => (1 - n) * a + n * b;
const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;
const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}
function debounce(callback, interval) {
    let debounceTimeoutId;

    return function (...args) {
        clearTimeout(debounceTimeoutId);
        debounceTimeoutId = setTimeout(() => callback.apply(this, args), interval);
    };
}


function throttle(callback, interval) {
    let enableCall = true;

    return function (...args) {
        if (!enableCall) return;

        enableCall = false;
        callback.apply(this, args);
        setTimeout(() => enableCall = true, interval);
    }
}
gsap.registerPlugin(ScrollTrigger);

if (document.querySelector('#parties')) {
    let partiesArr = [...document.querySelectorAll('.parties-list--item')]
    let lines = [...document.querySelectorAll('.parties hr')]
    const breakpoint = window.matchMedia('(min-width:1367px)')
    const hasHover = window.matchMedia('(hover: hover)')

    const hoverAnimation = (el) => {
        let mousepos = {
            x: 0,
            y: 0
        };
        let mousePosCache = mousepos;
        let direction = {
            x: mousePosCache.x - mousepos.x,
            y: mousePosCache.y - mousepos.y
        };
        let animatableProperties = {
            tx: {
                previous: 0,
                current: 0,
                amt: 0.08
            },
            ty: {
                previous: 0,
                current: 0,
                amt: 0.08
            },
            op: {
                previous: 0,
                current: 0,
                amt: 0.08
            },
            rotation: {
                previous: 0,
                current: 0,
                amt: 0.08
            },
        };
        let image = el.querySelector('.parties-list--img');
        let name = el.querySelector('.parties-list--name');
        let hr = el.querySelector('hr');
        let firstRender = true;

        gsap.set(image, {
            opacity: 0,
            yPercent: -50,
            xPercent: -50,
            overwrite: true
        })

        el.addEventListener('pointermove', e => {
            let rect = el.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            mousepos = {
                x: x,
                y: y
            };
        });

        const loopRender = () => {
            gsap.ticker.add(render);
            gsap.set(hr, {zIndex: 0})
        }

        const stopCycle = () => {
            gsap.ticker.remove(render);

            gsap.set(image, {opacity: 0})
            gsap.set(hr, {zIndex: 2})
        }

        let render = () => {
            const mouseDistanceX = clamp(Math.abs(mousePosCache.x - mousepos.x), 0, 100);

            direction = {
                x: mousePosCache.x - mousepos.x,
                y: mousePosCache.y - mousepos.y
            };
            mousePosCache = {
                x: mousepos.x,
                y: mousepos.y
            };

            animatableProperties.tx.current = mousepos.x;
            animatableProperties.ty.current = mousepos.y;
            animatableProperties.rotation.current = firstRender ? 0 : map(mouseDistanceX, 0, 100, 0, direction.x < 0 ? 45 : -45);

            animatableProperties.tx.previous = firstRender ? animatableProperties.tx.current : lerp(animatableProperties.tx.previous, animatableProperties.tx.current, animatableProperties.tx.amt);
            animatableProperties.ty.previous = firstRender ? animatableProperties.ty.current : lerp(animatableProperties.ty.previous, animatableProperties.ty.current, animatableProperties.ty.amt);
            animatableProperties.rotation.previous = firstRender ? animatableProperties.rotation.current : lerp(animatableProperties.rotation.previous, animatableProperties.rotation.current, animatableProperties.rotation.amt);

            gsap.set(image, {
                transformOrigin: 'center center',
                x: animatableProperties.tx.previous,
                y: animatableProperties.ty.previous,
                rotation: animatableProperties.rotation.previous,
                opacity: 1,
                stagger: 0.08
            })

            firstRender = false
            loopRender()
        }
        el.addEventListener('mouseenter', loopRender)
        el.addEventListener('mouseleave', stopCycle)
    };

    if (lines.length) {
        gsap.set(lines, {
            scaleX: 0,
            transformOrigin: 'left'
        })

        ScrollTrigger.batch(lines, {
            onEnter: (elements) => {
                gsap.to(elements, {
                    scaleX: 1,
                    scaleY: 1,
                    ease: "power4.out",
                    duration: 1.5,
                    stagger: .2,
                    scrollTrigger: {
                        start: 'top bottom'
                    }
                });
            }
        });
    }

    /*тут надо покапаться чтобы линии поправить*/

    let desktopAnimation = () => {
        if (partiesArr.length) {
            partiesArr.forEach((item, index) => {
                hoverAnimation(item)
            })
        }
    }

    let mobileAnimation = () => {
        partiesArr.forEach((el, index) => {
            let image = el.querySelector('.parties-list--img');
            let hr = el.querySelector('hr');
            gsap.set(image, {
                opacity: 0,
                yPercent: -50,
                xPercent: -50,
                overwrite: true,
                rotation: () => index % 2 === 0 ? -2 : 2,
                y: -el.offsetHeight / 4
            })

            gsap.to(image, {
                y: el.offsetHeight / 4,
                scrollTrigger: {
                    trigger: el,
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                    toggleActions: "play reverse play reverse",
                }
            })

            gsap.to(image, {
                opacity: .3,
                duration: .2,
                rotation: () => index % 2 === 0 ? -4 : 4,
                zIndex: 1,
                scrollTrigger: {
                    trigger: el,
                    start: "top center",
                    end: "bottom center",
                    toggleActions: "play reverse play reverse",
                    onToggle: () => el.classList.contains('active') ? el.classList.remove('active') : el.classList.add('active'),
                }
            })
        })
    }

    const mainInit = () => {
        if (breakpoint.matches || hasHover.matches) {
            desktopAnimation()
        } else {
            mobileAnimation()
        }
    }

    mainInit()
}
