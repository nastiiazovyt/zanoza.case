import {gsap} from "gsap";
// import {bodyScrollBar} from "../scrollBar"

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

window.addEventListener('load', () => {
    if (document.querySelector('.parties__line_playboy-party')) {
        const partiesSection = document.querySelector('.parties__line_playboy-party');
        const partiesTrailArray = [...partiesSection.querySelectorAll('.parties__line_img')];
        let partiesMousepos = {
            x: 0,
            y: 0
        };
        let partiesMousePosCache = partiesMousepos;
        let partiesDirection = {
            x: partiesMousePosCache.x - partiesMousepos.x,
            y: partiesMousePosCache.y - partiesMousepos.y
        };
        let partiesAnimatableProperties = {
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
        let partiesFirstRender = true;
        let partiesBounds;
        const partiesBreakpoint = window.matchMedia('(min-width:1025px)');
        const partiesHasHover = window.matchMedia('(hover: hover)');

        // let partiesOpacityArr = []

        // for (let i in partiesTrailArray) {
        //     partiesOpacityArr.push(map(i, 0, partiesTrailArray.length - 1, 0, 1))
        // }
        // partiesOpacityArr.reverse()

        partiesSection.addEventListener('pointermove', e => {
            let partiesRect = partiesSection.getBoundingClientRect();
            let px = e.clientX - partiesRect.left - partiesBounds.child.width + partiesBounds.child.width * 1.25;
            let py = e.clientY - partiesRect.top - partiesBounds.child.height + partiesBounds.child.height * 0.5;
            partiesMousepos = {
                x: px,
                y: py,
            };
        });

        let partiesInitialCoords = {
            x: 0,
            y: 0,
            r: 5
        }

        let partiesInitialPos = () => {
            if (partiesBreakpoint.matches && partiesHasHover.matches) {
                partiesInitialCoords.x = partiesBounds.container.width / 1.5
                partiesInitialCoords.y = partiesBounds.container.height / 3 - partiesBounds.child.height / 2
                partiesInitialCoords.r = -10
            } else {
                partiesInitialCoords.x = partiesBounds.container.width / 2 - partiesBounds.child.width / 2
                partiesInitialCoords.y = partiesBounds.container.height / 2 - partiesBounds.child.height / 2
                partiesInitialCoords.r = 0
            }
            gsap.set(partiesTrailArray, {
                x: () => partiesBreakpoint.matches && partiesHasHover.matches ? partiesInitialCoords.x : partiesInitialCoords.x - randomNumber(-20, 20),
                y: () => partiesBreakpoint.matches && partiesHasHover.matches ? partiesInitialCoords.y : partiesInitialCoords.y - randomNumber(-40, 40),
                rotation: () => partiesBreakpoint.matches && partiesHasHover.matches ? partiesInitialCoords.r : randomNumber(-10, 10),
                // opacity: i => partiesBreakpoint.matches && partiesHasHover.matches ? i === 0 ? 1 : 0 : partiesOpacityArr[i],
            })

        }

        let partiesMobileAnimation = () => {
            gsap.fromTo(partiesTrailArray, {
                autoAlpha: 1,
            }, {
                scrollTrigger: {
                    trigger: partiesSection,
                    start: "top top",
                    end: "bottom 50%",
                    scrub: .5,
                },
                autoAlpha: i => i !== partiesTrailArray.length - 1 ? 0 : 1,
                stagger: 1,
                repeat: 1,
                yoyo: true,
                ease: 'sine.inOut',
                duration: 1
            })

            gsap.to(partiesTrailArray, {
                yPercent: 50,
                ease: 'sine.inOut',
                scrollTrigger: {
                    trigger: partiesSection,
                    start: "top top",
                    end: "bottom 50%",
                    scrub: 0.1
                },
            })
        }


        let partiesLoopRender = () => {
            gsap.ticker.add(partiesRender);
        }

        let partiesStopCycle = () => {
            gsap.ticker.remove(partiesRender);

            gsap.to(partiesTrailArray, {
                x: partiesInitialCoords.x,
                y: partiesInitialCoords.y,
                rotation: partiesInitialCoords.r,
                // opacity: i => i === 0 ? 1 : 0,
                stagger: 0.08
            })
        }

        let partiesRender = () => {
            const partiesMouseDistanceX = clamp(Math.abs(partiesMousePosCache.x - partiesMousepos.x), 0, 100);
            const partiesMouseDistanceY = clamp(Math.abs(partiesMousePosCache.y - partiesMousepos.y), 0, 100);
            const partiesBiggerTravelDistance = () => partiesMouseDistanceX >= partiesMouseDistanceY ? partiesMouseDistanceX : partiesMouseDistanceY;

            partiesDirection = {
                x: partiesMousePosCache.x - partiesMousepos.x,
                y: partiesMousePosCache.y - partiesMousepos.y
            };
            partiesMousePosCache = {
                x: partiesMousepos.x,
                y: partiesMousepos.y
            };

            partiesAnimatableProperties.tx.current = partiesMousepos.x;
            partiesAnimatableProperties.ty.current = partiesMousepos.y;
            partiesAnimatableProperties.op.current = map(partiesBiggerTravelDistance(), 0, 20, 0, 1);
            partiesAnimatableProperties.rotation.current = map(partiesMouseDistanceX, 0, 100, 0, partiesDirection.x < 0 ? 45 : -45);

            partiesAnimatableProperties.tx.previous = partiesFirstRender ? partiesInitialCoords.x : lerp(partiesAnimatableProperties.tx.previous, partiesAnimatableProperties.tx.current, partiesAnimatableProperties.tx.amt);
            partiesAnimatableProperties.ty.previous = partiesFirstRender ? partiesInitialCoords.y : lerp(partiesAnimatableProperties.ty.previous, partiesAnimatableProperties.ty.current, partiesAnimatableProperties.ty.amt);
            partiesAnimatableProperties.op.previous = lerp(partiesAnimatableProperties.op.previous, partiesAnimatableProperties.op.current, partiesAnimatableProperties.op.amt);
            partiesAnimatableProperties.rotation.previous = partiesFirstRender ? partiesInitialCoords.r : lerp(partiesAnimatableProperties.rotation.previous, partiesAnimatableProperties.rotation.current, partiesAnimatableProperties.rotation.amt);

            gsap.set(partiesTrailArray, {
                transformOrigin: 'center center',
                x: partiesAnimatableProperties.tx.previous,
                y: partiesAnimatableProperties.ty.previous,
                rotation: partiesAnimatableProperties.rotation.previous,
                // opacity: i => i === 0 ? 1 : partiesAnimatableProperties.op.previous,
                stagger: 0.08
            })

            partiesFirstRender = false
            partiesLoopRender()
        }

        let partiesWidth = window.innerWidth;

        const partiesBreakpointChecker = () => {
            if (window.innerWidth !== partiesWidth) {
                partiesWidth = window.innerWidth
                partiesMainInit()
            }
        }

        const partiesMainInit = () => {
            partiesBounds = {
                container: partiesSection.getBoundingClientRect(),
                child: partiesTrailArray[0].getBoundingClientRect()
            }
            partiesInitialPos()
            if (partiesBreakpoint.matches && matchMedia('(hover: hover)').matches) {
                partiesSection.addEventListener('mouseenter', partiesLoopRender)
                partiesSection.addEventListener('mouseleave', partiesStopCycle)
            } else {
                partiesMobileAnimation()
            }
        }

        window.addEventListener('resize', debounce(partiesBreakpointChecker, 200))
        partiesMainInit();
    }
})


// import {ScrollTrigger} from "gsap/ScrollTrigger"
//
// gsap.registerPlugin(ScrollTrigger);
//
// if (document.querySelector('#parties')) {
//     let partiesArr = [...document.querySelectorAll('.parties-list--item')]
//     let lines = [...document.querySelectorAll('.parties hr')]
//     const breakpoint = window.matchMedia('(min-width:1367px)')
//     const hasHover = window.matchMedia('(hover: hover)')
//
//     const hoverAnimation = (el) => {
//         let mousepos = {
//             x: 0,
//             y: 0
//         };
//         let mousePosCache = mousepos;
//         let direction = {
//             x: mousePosCache.x - mousepos.x,
//             y: mousePosCache.y - mousepos.y
//         };
//         let animatableProperties = {
//             tx: {
//                 previous: 0,
//                 current: 0,
//                 amt: 0.08
//             },
//             ty: {
//                 previous: 0,
//                 current: 0,
//                 amt: 0.08
//             },
//             op: {
//                 previous: 0,
//                 current: 0,
//                 amt: 0.08
//             },
//             rotation: {
//                 previous: 0,
//                 current: 0,
//                 amt: 0.08
//             },
//         };
//         let image = el.querySelector('.parties-list--img');
//         let name = el.querySelector('.parties-list--name');
//         let hr = el.querySelector('hr');
//         let firstRender = true;
//
//         gsap.set(image, {
//             opacity: 0,
//             yPercent: -50,
//             xPercent: -50,
//             overwrite: true
//         })
//
//         el.addEventListener('pointermove', e => {
//             let rect = el.getBoundingClientRect();
//             let x = e.clientX - rect.left;
//             let y = e.clientY - rect.top;
//
//             mousepos = {
//                 x: x,
//                 y: y
//             };
//         });
//
//         const loopRender = () => {
//             gsap.ticker.add(render);
//             gsap.set(hr, {zIndex: 0})
//         }
//
//         const stopCycle = () => {
//             gsap.ticker.remove(render);
//
//             gsap.set(image, {opacity: 0})
//             gsap.set(hr, {zIndex: 2})
//         }
//
//         let render = () => {
//             const mouseDistanceX = clamp(Math.abs(mousePosCache.x - mousepos.x), 0, 100);
//
//             direction = {
//                 x: mousePosCache.x - mousepos.x,
//                 y: mousePosCache.y - mousepos.y
//             };
//             mousePosCache = {
//                 x: mousepos.x,
//                 y: mousepos.y
//             };
//
//             animatableProperties.tx.current = mousepos.x;
//             animatableProperties.ty.current = mousepos.y;
//             animatableProperties.rotation.current = firstRender ? 0 : map(mouseDistanceX, 0, 100, 0, direction.x < 0 ? 45 : -45);
//
//             animatableProperties.tx.previous = firstRender ? animatableProperties.tx.current : lerp(animatableProperties.tx.previous, animatableProperties.tx.current, animatableProperties.tx.amt);
//             animatableProperties.ty.previous = firstRender ? animatableProperties.ty.current : lerp(animatableProperties.ty.previous, animatableProperties.ty.current, animatableProperties.ty.amt);
//             animatableProperties.rotation.previous = firstRender ? animatableProperties.rotation.current : lerp(animatableProperties.rotation.previous, animatableProperties.rotation.current, animatableProperties.rotation.amt);
//
//             gsap.set(image, {
//                 transformOrigin: 'center center',
//                 x: animatableProperties.tx.previous,
//                 y: animatableProperties.ty.previous,
//                 rotation: animatableProperties.rotation.previous,
//                 opacity: 1,
//                 stagger: 0.08
//             })
//
//             firstRender = false
//             loopRender()
//         }
//         el.addEventListener('mouseenter', loopRender)
//         el.addEventListener('mouseleave', stopCycle)
//     };
//
//     if (lines.length) {
//         gsap.set(lines, {
//             scaleX: 0,
//             transformOrigin: 'left'
//         })
//
//         ScrollTrigger.batch(lines, {
//             onEnter: (elements) => {
//                 gsap.to(elements, {
//                     scaleX: 1,
//                     scaleY: 1,
//                     ease: "power4.out",
//                     duration: 1.5,
//                     stagger: .2,
//                     scrollTrigger: {
//                         start: 'top bottom'
//                     }
//                 });
//             }
//         });
//     }
//
//     let desktopAnimation = () => {
//         if (partiesArr.length) {
//             partiesArr.forEach((item, index) => {
//                 hoverAnimation(item)
//             })
//         }
//     }
//
//     let mobileAnimation = () => {
//         partiesArr.forEach((el, index) => {
//             let image = el.querySelector('.parties-list--img');
//             let hr = el.querySelector('hr');
//             gsap.set(image, {
//                 opacity: 0,
//                 yPercent: -50,
//                 xPercent: -50,
//                 overwrite: true,
//                 rotation: () => index % 2 === 0 ? -2 : 2,
//                 y: -el.offsetHeight / 4
//             })
//
//             gsap.to(image, {
//                 y: el.offsetHeight / 4,
//                 scrollTrigger: {
//                     trigger: el,
//                     start: "top center",
//                     end: "bottom center",
//                     scrub: true,
//                     toggleActions: "play reverse play reverse",
//                 }
//             })
//
//             gsap.to(image, {
//                 opacity: .3,
//                 duration: .2,
//                 rotation: () => index % 2 === 0 ? -4 : 4,
//                 zIndex: 1,
//                 scrollTrigger: {
//                     trigger: el,
//                     start: "top center",
//                     end: "bottom center",
//                     toggleActions: "play reverse play reverse",
//                     onToggle: () => el.classList.contains('active') ? el.classList.remove('active') : el.classList.add('active'),
//                 }
//             })
//         })
//     }
//
//     let width = window.innerWidth;
//
//     const breakpointChecker = () => {
//         if (window.innerWidth !== width) {
//             width = window.innerWidth
//             mainInit()
//         }
//     }
//
//     const mainInit = () => {
//         if (breakpoint.matches || hasHover.matches) {
//             desktopAnimation()
//         } else {
//             mobileAnimation()
//         }
//     }
//
//     let pageInteracted = false;
//
//     let defaultInit = () => {
//         if (pageInteracted) {
//             /**/
//             window.addEventListener('resize', throttle(breakpointChecker, 200));
//             mainInit();
//             /**/
//             window.removeEventListener('scroll', defaultInit)
//         } else {
//             pageInteracted = true;
//         }
//     }
//
//     let smoothScrollbarInit = () => {
//         if (pageInteracted) {
//             /**/
//             window.addEventListener('resize', debounce(breakpointChecker, 200));
//             mainInit();
//             /**/
//             bodyScrollBar.removeListener(smoothScrollbarInit)
//         } else {
//             pageInteracted = true;
//         }
//     }
//
//     !!bodyScrollBar ? bodyScrollBar.addListener(smoothScrollbarInit) : window.addEventListener('scroll', defaultInit)
// }
