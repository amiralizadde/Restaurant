import {cart__deleteFood ,showNumberCart, showNumberFavoritesFood , addToFavorites, showSidebarTemplate ,nav__scrollEffect ,getAndShowMenuFoods,insertFoodBoxHtmlTemplate,addingToCart} from "./funcs/shared.js";

const $ = document;
const topBarElem = document.querySelector(".top-bar");
const topBarMenu = document.querySelector("#top-bar__menu");
const sidebar = document.querySelector('.sidebar')
const sidebarContent = document.querySelector('.sidebar-content')
const sidebarHeaderTitle = document.querySelector('#sidebar-header__title')
const sidebarClose = document.querySelector('.sidebar-header__close')
const userAccount = document.querySelector('#top-bar__user-account')
const topbarUserCart  = document.querySelectorAll('.top-bar__user-cart')
const menuSliderWrapper = document.querySelector('#restaurent-food-swiperWrapper')
const numberFavorites = document.querySelector('.top-bar__before-expand-right-number')
const retaurentNewProposalWrapper = document.querySelector('#menu-retaurent-newProposal-Wrapper')



window.addToFavorites=addToFavorites;
window.cart__deleteFood  = cart__deleteFood 

let swiper = new Swiper(".main-header__slider", {
  loop: true,

  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
const  menuSlider = new Swiper(".menu-slider-Swiper", {
  loop: true ,
  // slidesPerView: 4,
  // centeredSlides: true,
  breakpoints: {
    200: {
        slidesPerView: 1
    },
    576: {
        slidesPerView: 2
    },
    1000: {
        slidesPerView: 3
    }
  },
  // autoplay: {
  //   delay: 7000,
  //   disableOnInteraction: false,
  // },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
let commentSlider = new Swiper(".customer-comments-Swiper", {
  loop: true,
  slidesPerView: 1,
  centeredSlides: true,
  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});



window.addEventListener('load',()=>{

  showNumberFavoritesFood()
  showNumberCart()

  getAndShowMenuFoods(9)
  .then(responseData=>{
    let foodsMenu = [...responseData.results]
    menuSliderWrapper.innerHTML=''
    foodsMenu.forEach(food=>{
      menuSliderWrapper.insertAdjacentHTML('afterbegin' , `
    
      <div class="swiper-slide menu-slider__box">
            <img src=${food.image} class="menu-slider__image" alt="" />
            <p class="m-1 mt-3">${food.title}</p>
            
            <div class="menu-slider__box-icons">
              <a href="food.html?name=${food.id}" class="menu-slider__box-icon-link"><i class="fa-solid fa-cart-plus"></i></a>
              <a onclick="addToFavorites(${food.id})" class="menu-slider__box-icon-link"><i class="fa-regular fa-heart"></i></a>
            </div>
       </div>

    `)
     })
  })


  getAndShowMenuFoods(20)
  .then(response=>{
    console.log('response :' , response);
    let foodsMenu = [...response.results.slice(5,13)]
    console.log('foodsMenu :' , foodsMenu);
    retaurentNewProposalWrapper.innerHTML=''
    foodsMenu.forEach(food=>{
      retaurentNewProposalWrapper.insertAdjacentHTML('afterbegin' , `
    
       <div class="col-12 col-lg-6 my-3">
              <div class="">
                <img src=${food.image} class="retaurent-newProposal__image" alt="" />
              </div>
          <div class="retaurent-newProposal__infos">
              <div class="retaurent-newProposal__infos-box">
                <p class="retaurent-newProposal__infos-name">${food.title}</p>
                <a href="food.html?name=${food.id}" class="retaurent-newProposal__link"><p class="retaurent-newProposal__infos-price">مشاهده اطلاعات</p></a>
              </div>
              <hr class="mt-0" />
              <div class="retaurent-newProposal__infos-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Non sapiente dolor consequuntur unde provident, 

              </div>
            </div>
      </div>

    `)
     })

  })
  

})



window.addEventListener("scroll",()=>{
  nav__scrollEffect(topBarElem)
});

topBarMenu.addEventListener("click", (event) => {
  showSidebarTemplate(event.target.dataset.name);
});

sidebarClose.addEventListener('click',()=>{
  sidebar.classList.remove('active-sidebar')
})

userAccount.addEventListener('click' , (event)=>{
  console.log('clicevent.target.dataset.nameked' ,event.target.dataset.name);
  showSidebarTemplate(event.target.dataset.name )
})

topbarUserCart.forEach(usercart=>{

  usercart.addEventListener('click',(event)=>{
    console.log('topbarUserCart' ,event.target.dataset.name);
    showSidebarTemplate(event.target.dataset.name )
  })

})