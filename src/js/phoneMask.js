import Inputmask from 'inputmask';
// маска для телефона
[...document.querySelectorAll('[name=phone], input[type=text].phone, input[type=tel]')].map(phone => {

    Inputmask('+7 (999) 999 99 99[9]', { 'placeholder': ' '}).mask(phone);
});
