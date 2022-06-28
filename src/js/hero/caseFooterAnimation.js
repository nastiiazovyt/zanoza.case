import Swiper, {Navigation, EffectCreative} from "swiper";

const caseFooterSwiper = new Swiper('.case-footer', {
    modules: [Navigation, EffectCreative],
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // effect: 'creative',
    // creativeEffect: {
    //     prev: {
    //         translate: ['-50%', 0, 0],
    //         scale: 2.2,
    //         origin: 'top',
    //         opacity: 1,
    //     },
    //     next: {
    //         opacity: 1,
    //         translate: ['50%', 0, 0],
    //         scale: 2.2,
    //         origin: 'top'
    //     }
    // },
    slidesPerView: 1,
    initialSlide: 1,
    speed: 600,
    allowTouchMove: false,
})



