import {gsap} from "gsap";

function debounce(callback, interval) {
    let debounceTimeoutId;

    return function (...args) {
        clearTimeout(debounceTimeoutId);
        debounceTimeoutId = setTimeout(() => callback.apply(this, args), interval);
    };
}
const map = (x, a1, a2, b1, b2) => (x - a1) * (b2 - b1) / (a2 - a1) + b1;
const lerp = (a, b, n) => (1 - n) * a + n * b;
const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;
const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}


window.onload = () => {
    if (document.querySelector('.content__block_girls-cursor')) {
        const section = document.querySelector('.content__block_girls-cursor');
        const trailArray = [...section.querySelectorAll('.trail-block')].reverse();
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
        let firstRender = true;
        let bounds;
        const breakpoint = window.matchMedia('(min-width:1025px)');
        const hasHover = window.matchMedia('(hover: hover)');

        let opacityArr = []

        for (let i in trailArray) {
            opacityArr.push(map(i, 0, trailArray.length - 1, 0, 1))
        }
        opacityArr.reverse()

        section.addEventListener('pointermove', e => {
            let rect = section.getBoundingClientRect();
            let x = e.clientX - rect.left - bounds.child.width / 2;
            let y = e.clientY - rect.top - bounds.child.height / 2;

            mousepos = {
                x: x,
                y: y
            };
        });

        let initialCoords = {
            x: 0,
            y: 0,
            r: 5
        }

        let initialPos = () => {
            if (breakpoint.matches && hasHover.matches) {
                initialCoords.x = bounds.container.width / 1.5
                initialCoords.y = bounds.container.height / 3 - bounds.child.height / 2
                initialCoords.r = 5
            } else {
                initialCoords.x = bounds.container.width / 2 - bounds.child.width / 2
                initialCoords.y = bounds.container.height / 2 - bounds.child.height / 2
                initialCoords.r = 0
            }

            gsap.set(trailArray, {
                x: () => breakpoint.matches && hasHover.matches ? initialCoords.x : initialCoords.x - randomNumber(-20, 20),
                y: () => breakpoint.matches && hasHover.matches ? initialCoords.y : initialCoords.y - randomNumber(-40, 40),
                rotation: () => breakpoint.matches && hasHover.matches ? initialCoords.r : randomNumber(-10, 10),
                opacity: i => breakpoint.matches && hasHover.matches ? i === 0 ? 1 : 0 : opacityArr[i],
            })

        }

        let mobileAnimation = () => {
            gsap.fromTo(trailArray, {
                autoAlpha: 1,
            }, {
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom 50%",
                    scrub: .5,
                },
                autoAlpha: i => i !== trailArray.length - 1 ? 0 : 1,
                stagger: 1,
                repeat: 1,
                yoyo: true,
                ease: 'sine.inOut',
                duration: 1
            })

            gsap.to(trailArray, {
                yPercent: 50,
                ease: 'sine.inOut',
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom 50%",
                    scrub: 0.1
                },
            })
        }


        let loopRender = () => {
            gsap.ticker.add(render);
        }

        let stopCycle = () => {
            gsap.ticker.remove(render);

            gsap.to(trailArray, {
                x: initialCoords.x,
                y: initialCoords.y,
                rotation: initialCoords.r,
                opacity: i => i === 0 ? 1 : 0,
                stagger: 0.08
            })
        }

        let render = () => {
            const mouseDistanceX = clamp(Math.abs(mousePosCache.x - mousepos.x), 0, 100);
            const mouseDistanceY = clamp(Math.abs(mousePosCache.y - mousepos.y), 0, 100);
            const biggerTravelDistance = () => mouseDistanceX >= mouseDistanceY ? mouseDistanceX : mouseDistanceY;

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
            animatableProperties.op.current = map(biggerTravelDistance(), 0, 20, 0, 1);
            animatableProperties.rotation.current = map(mouseDistanceX, 0, 100, 0, direction.x < 0 ? 45 : -45);

            animatableProperties.tx.previous = firstRender ? initialCoords.x : lerp(animatableProperties.tx.previous, animatableProperties.tx.current, animatableProperties.tx.amt);
            animatableProperties.ty.previous = firstRender ? initialCoords.y : lerp(animatableProperties.ty.previous, animatableProperties.ty.current, animatableProperties.ty.amt);
            animatableProperties.op.previous = lerp(animatableProperties.op.previous, animatableProperties.op.current, animatableProperties.op.amt);
            animatableProperties.rotation.previous = firstRender ? initialCoords.r : lerp(animatableProperties.rotation.previous, animatableProperties.rotation.current, animatableProperties.rotation.amt);

            gsap.set(trailArray, {
                transformOrigin: 'center center',
                x: animatableProperties.tx.previous,
                y: animatableProperties.ty.previous,
                rotation: animatableProperties.rotation.previous,
                opacity: i => i === 0 ? 1 : animatableProperties.op.previous,
                stagger: 0.08
            })

            firstRender = false
            loopRender()
        }

        let width = window.innerWidth;

        const breakpointChecker = () => {
            if (window.innerWidth !== width) {
                width = window.innerWidth
                mainInit()
            }
        }

        const mainInit = () => {
            bounds = {
                container: section.getBoundingClientRect(),
                child: trailArray[0].getBoundingClientRect()
            }
            initialPos()

            if (breakpoint.matches && matchMedia('(hover: hover)').matches) {
                section.addEventListener('mouseenter', loopRender)
                section.addEventListener('mouseleave', stopCycle)
            } else {
                mobileAnimation()
            }
        }

        window.addEventListener('resize', debounce(breakpointChecker, 200))
        mainInit();
    }
}
