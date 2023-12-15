const nav = document.getElementById('nav');
const menu = document.getElementById('menu');
const body = document.body;
const btnBurger = document.getElementById('btn-burger-menu');
const btnCoffee = document.getElementById('btn-coffee');
const btnTea = document.getElementById('btn-tea');
const btnDessert = document.getElementById('btn-dessert');
const blockTea = document.getElementById('tea-block');
const blockDessert = document.getElementById('dessert-block');
const blockCoffee = document.getElementById('coffee-block');
const btnRefresh = document.getElementById('btn-refresh');

let checkedBlock = 'coffee';
let showQuantityProduct = 4;

const modalWindow = document.getElementById('modal-window');
const modalOverlay = document.getElementById('overlay');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const btnModalSize1 = document.getElementById('btn-modal-size1');
const btnModalSize2 = document.getElementById('btn-modal-size2');
const btnModalSize3 = document.getElementById('btn-modal-size3');
const btnModalAdditives1 = document.getElementById('btn-modal-additives1');
const btnModalAdditives2 = document.getElementById('btn-modal-additives2');
const btnModalAdditives3 = document.getElementById('btn-modal-additives3');
const btnModalClose = document.getElementById('btn-modal-close');

const products = document.getElementsByClassName('product');
let productsArr;

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

function toogleStateBtns(active, disable1, disable2) {
  active.classList.add('menu__controls_btn_clicked');
  active.disabled = true;
  disable1.classList.remove('menu__controls_btn_clicked');
  disable1.disabled = false;
  disable2.classList.remove('menu__controls_btn_clicked');
  disable2.disabled = false;
}

function toogleStateBlocks(active, disable1, disable2) {
  disable1.classList.add('hide');
  setTimeout(()=>{ disable1.classList.add('unvisible'); }, 500);

  disable2.classList.add('hide');
  setTimeout(()=>{ disable2.classList.add('unvisible'); }, 500);

  setTimeout(()=>{
    active.classList.add('show');
    active.classList.remove('unvisible');
    disable1.classList.remove('hide');
    disable2.classList.remove('hide');
  }, 500);
}

function resetProducts() {
  if (showQuantityProduct > 4) {
    const productsCoffee = document.getElementsByClassName('product__coffee');
    Array.from(productsCoffee).forEach(product => product.classList.add('product__coffee-hide'));
    const productsDessert = document.getElementsByClassName('product__dessert');
    Array.from(productsDessert).forEach(product => product.classList.add('product__dessert-hide'));
    showQuantityProduct = 4;
    if (checkedBlock === 'coffee' || checkedBlock === 'dessert') btnRefresh.classList.remove('unvisible');
  }
}

btnTea.addEventListener('click', ()=>{
  toogleStateBtns(btnTea, btnCoffee, btnDessert);
  toogleStateBlocks(blockTea, blockCoffee, blockDessert);
  checkedBlock = 'tea';
  btnRefresh.classList.add('unvisible');
});

btnCoffee.addEventListener('click', ()=>{
  toogleStateBtns(btnCoffee, btnTea, btnDessert);
  toogleStateBlocks(blockCoffee, blockTea, blockDessert);
  resetProducts();
  checkedBlock = 'coffee';
  btnRefresh.classList.remove('unvisible');
});

btnDessert.addEventListener('click', ()=>{
  toogleStateBtns(btnDessert, btnTea, btnCoffee);
  toogleStateBlocks(blockDessert, blockTea, blockCoffee);
  resetProducts();
  checkedBlock = 'dessert';
  btnRefresh.classList.remove('unvisible');
});

btnRefresh.addEventListener('click', ()=>{
  if (document.body.getBoundingClientRect().width <= 1330) {
    if (checkedBlock === 'coffee' && showQuantityProduct === 4) {
      const products = document.getElementsByClassName('product__coffee-hide');
      Array.from(products).forEach(product => product.classList.remove('product__coffee-hide'));
      showQuantityProduct = 8;
      btnRefresh.classList.add('unvisible');
    }
    if (checkedBlock === 'dessert' && showQuantityProduct === 4) {
      const products = document.getElementsByClassName('product__dessert-hide');
      Array.from(products).forEach(product => product.classList.remove('product__dessert-hide'));
      showQuantityProduct = 8;
      btnRefresh.classList.add('unvisible');
    }
  }
});

window.addEventListener('resize', () => {
  if (document.body.getBoundingClientRect().width <= 1330) resetProducts();
});

//-----------------Modal window

let costSize = 0;
let costAdditives = 0;
let price = 0;

function calcPrice() {
  modalPrice.textContent = '$' + (price + costSize + costAdditives).toFixed(2);
}

function toogleBtnSizeDisabled(btn1, btn2, btn3) {
  btn1.disabled = true;
  btn2.disabled = false;
  btn3.disabled = false;
}

function clearActiveBtn() {
  btnModalAdditives1.classList.remove('modal__content_button_active');
  btnModalAdditives2.classList.remove('modal__content_button_active');
  btnModalAdditives3.classList.remove('modal__content_button_active');
}

btnModalSize1.addEventListener('click', () => {
  costSize = 0;
  calcPrice();
  toogleBtnSizeDisabled(btnModalSize1, btnModalSize2, btnModalSize3);
});

btnModalSize2.addEventListener('click', () => {
  costSize = 0.50;
  calcPrice();
  toogleBtnSizeDisabled(btnModalSize2, btnModalSize1, btnModalSize3);
});

btnModalSize3.addEventListener('click', () => {
  costSize = 1.00;
  calcPrice();
  toogleBtnSizeDisabled(btnModalSize3, btnModalSize1, btnModalSize2);
});

btnModalAdditives1.addEventListener('click', () => {
  if (btnModalAdditives1.classList.value === 'modal__content_button') costAdditives += 0.50;
  else costAdditives -= 0.50;
  calcPrice();
  btnModalAdditives1.classList.toggle('modal__content_button_active');
});

btnModalAdditives2.addEventListener('click', () => {
  if (btnModalAdditives2.classList.value === 'modal__content_button') costAdditives += 0.50;
  else costAdditives -= 0.50;
  calcPrice();
  btnModalAdditives2.classList.toggle('modal__content_button_active');
});

btnModalAdditives3.addEventListener('click', () => {
  if (btnModalAdditives3.classList.value === 'modal__content_button') costAdditives += 0.50;
  else costAdditives -= 0.50;
  calcPrice();
  btnModalAdditives3.classList.toggle('modal__content_button_active');
});

function closeModal() {
  costAdditives = 0;
  costSize = 0;
  price = 0;

  modalWindow.classList.add('hide');
  modalOverlay.classList.add('hide-overlay');
  setTimeout(()=>{
    toogleBtnSizeDisabled(btnModalSize1, btnModalSize2, btnModalSize3);
    clearActiveBtn();
    document.body.classList.remove('scroll-off');
    modalWindow.classList.add('unvisible');
    modalOverlay.classList.add('unvisible');
    modalWindow.classList.remove('hide');
    modalOverlay.classList.remove('hide-overlay');
  }, 500);
}

function openModal(imageUrl, obj) {
  modalImage.src = imageUrl;
  modalTitle.textContent = obj.name;
  modalDescription.textContent = obj.description;
  modalPrice.textContent = '$' + obj.price;
  price = Number(obj.price);

  btnModalSize1.childNodes[1].textContent = obj.sizes.s.size;
  btnModalSize2.childNodes[1].textContent = obj.sizes.s.size;
  btnModalSize2.childNodes[1].textContent = obj.sizes.s.size;

  btnModalAdditives1.childNodes[1].textContent = obj.additives[0].name;
  btnModalAdditives2.childNodes[1].textContent = obj.additives[1].name;
  btnModalAdditives3.childNodes[1].textContent = obj.additives[2].name;

  document.body.classList.add('scroll-off');
  modalWindow.classList.remove('unvisible');
  modalOverlay.classList.remove('unvisible');
}

function getAllProducts() {
  fetch('../assets/json/products.json')
  .then((response) => response.json())
  .then((data) => {
    productsArr = data;
  });
}

getAllProducts();

Array.from(products).forEach(product => {
  product.addEventListener('click', (event) => {
    const position = event.currentTarget.dataset.number;
    const imageUrl = (event.currentTarget.childNodes[1].childNodes[1].src) ? event.currentTarget.childNodes[1].childNodes[1].src : '../assets/images/menu/no-image.jpg';
    openModal(imageUrl, productsArr[position]);
  });
});

modalOverlay.addEventListener('click', () => { closeModal(); });
btnModalClose.addEventListener('click', () => { closeModal(); });