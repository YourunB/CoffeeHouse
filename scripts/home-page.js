const nav = document.getElementById('nav');
const menu = document.getElementById('menu');
const body = document.body;
const btnBurger = document.getElementById('btn-burger-menu');
const sliderSlides = document.getElementById('slider-slides');
const btnSliderLeft = document.getElementById('btn-slider-left');
const btnSliderRight = document.getElementById('btn-slider-right');
const sliderIndicator = document.getElementsByClassName('slider__bottom_position_time');
const sliderDisplay = document.getElementById('slider-display');

btnBurger.addEventListener('click', () => {
  menu.addEventListener('click', (event) => {
    if (event.target.nodeName === 'LI' || event.target.nodeName === 'A') {
      menu.classList.remove('show-menu');
      btnBurger.classList.remove('header__burger-menu_click')
      body.classList.remove('scroll-off');
    }
  });
  if (menu.classList.value === 'menu-list show-menu') {
    menu.classList.remove('show-menu');
    btnBurger.classList.remove('header__burger-menu_click')
    body.classList.remove('scroll-off');
  } else {
    menu.classList.add('show-menu');
    btnBurger.classList.add('header__burger-menu_click')
    body.classList.add('scroll-off');
  }
});

let timerSlider = null;
let timerIndicator = null;
let widthIndicator = 0;

function debounce(func, time) {
  let timeout = null;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, time);
  }
}

function resetIndicator(slide) {
  clearInterval(timerIndicator);
  sliderIndicator[slide - 1].style.width = 0;
  widthIndicator = 0;
}

function startIndicator(slide, restart = false) {
  timerIndicator = setInterval(()=>{
    widthIndicator += 4;
    if (sliderIndicator[slide - 1].style.width !== '40px') sliderIndicator[slide - 1].style.width = widthIndicator + 'px';
    if (restart === true && widthIndicator === 40) startTimer(true);
  }, 550);
}

startIndicator(1);

function startTimer(restart = false) {
  function showSlide() {
    switch (sliderSlides.classList.length) {
      case 1:
        btnSliderRight.disabled = true; setTimeout(()=>{ btnSliderRight.disabled = false; }, 1000);
        sliderSlides.classList.add('slide2');
        resetIndicator(1); startIndicator(2);
        break;
      case 2:
        btnSliderRight.disabled = true; setTimeout(()=>{ btnSliderRight.disabled = false; }, 1000);
        sliderSlides.classList.add('slide3');
        resetIndicator(2); startIndicator(3);
        break;
      case 3:
        btnSliderRight.disabled = true; setTimeout(()=>{ btnSliderRight.disabled = false; }, 1000);
        sliderSlides.classList.remove('slide2'); sliderSlides.classList.remove('slide3'); 
        resetIndicator(3); startIndicator(1);
        break;
      default:
        break;
    }
  }
  
  if (restart === true) {
    showSlide();
    startTimer();
  }
  else timerSlider = setInterval(() => { showSlide(); }, 6000);
}

startTimer();

function changeSlideLeft() {
  switch (sliderSlides.classList.length) {
    case 1:
      btnSliderLeft.disabled = true; setTimeout(()=>{btnSliderLeft.disabled = false;},1000);
      clearInterval(timerSlider); startTimer();
      sliderSlides.classList.add('slide3'); sliderSlides.classList.add('slide2');
      resetIndicator(1); startIndicator(3);
      break;
    case 2:
      btnSliderLeft.disabled = true; setTimeout(()=>{btnSliderLeft.disabled = false;},1000);
      clearInterval(timerSlider); startTimer();
      sliderSlides.classList.remove('slide2');
      resetIndicator(2); startIndicator(1);
      break;
    case 3:
      btnSliderLeft.disabled = true; setTimeout(()=>{btnSliderLeft.disabled = false;},1000);
      clearInterval(timerSlider); startTimer();
      sliderSlides.classList.remove('slide3');
      resetIndicator(3); startIndicator(2);
      break;
    default:
      break;
  }
}

function changeSlideRight() {
  switch (sliderSlides.classList.length) {
    case 1:
      btnSliderRight.disabled = true; setTimeout(()=>{btnSliderRight.disabled = false;},1000);
      clearInterval(timerSlider); startTimer();
      sliderSlides.classList.add('slide2');
      resetIndicator(1); startIndicator(2);
      break;
    case 2:
      btnSliderRight.disabled = true; setTimeout(()=>{btnSliderRight.disabled = false;},1000);
      clearInterval(timerSlider); startTimer();
      sliderSlides.classList.add('slide3');
      resetIndicator(2); startIndicator(3);
      break;
    case 3:
      btnSliderRight.disabled = true; setTimeout(()=>{btnSliderRight.disabled = false;},1000);
      clearInterval(timerSlider); startTimer();
      sliderSlides.classList.remove('slide2'); sliderSlides.classList.remove('slide3');
      resetIndicator(3); startIndicator(1);
      break;
    default:
      break;
  }
}

btnSliderLeft.addEventListener('click', () => {
  changeSlideLeft();
});

btnSliderRight.addEventListener('click', () => {
  changeSlideRight();
});

let mouseInsideSlide = false;

sliderSlides.addEventListener('mouseover', debounce(()=>{
  if (mouseInsideSlide === false && navigator.maxTouchPoints === 0) {
    mouseInsideSlide = true;
    clearInterval(timerIndicator);
    clearInterval(timerSlider);
  }
}, 250));

sliderSlides.addEventListener('mouseout', debounce(()=>{
  if (mouseInsideSlide === true && navigator.maxTouchPoints === 0) {
    mouseInsideSlide = false;
    startIndicator(sliderSlides.classList.length, true);
  }
}, 250));

sliderDisplay.addEventListener('touchstart', (event) => {
  clearInterval(timerIndicator);
  clearInterval(timerSlider);
  touchstartX = event.changedTouches[0].screenX;
}, false);

sliderDisplay.addEventListener('touchend', (event) => {
  startIndicator(sliderSlides.classList.length, true);
  touchendX = event.changedTouches[0].screenX;
  swipeSlide();
}, false);

function swipeSlide() {
  if (touchendX < touchstartX) { //Left
    changeSlideRight();
  }

  if (touchendX > touchstartX) { //Right
    changeSlideLeft();
  }
}