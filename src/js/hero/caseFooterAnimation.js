import Swiper, {Navigation, EffectCreative} from "swiper";

const caseFooterSwiper = new Swiper('.case-footer', {
    modules: [Navigation, EffectCreative],
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView: 1,
    initialSlide: 1,
    speed: 700,
    allowTouchMove: false,
})



