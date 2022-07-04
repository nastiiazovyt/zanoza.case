import Swiper, {Navigation, EffectCreative} from "swiper";

const caseFooterSwiper = new Swiper('.case-footer', {
    modules: [Navigation, EffectCreative],
    navigation: {
        nextEl: '.swiper-button-n',
        prevEl: '.swiper-button-p',
    },
    slidesPerView: 'auto',
    centeredSlides: true,
    initialSlide: 1,
    speed: 700,
    allowTouchMove: false,
})



