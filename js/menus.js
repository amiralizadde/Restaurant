import{
   nav__scrollEffect ,
   showSidebarTemplate ,
   getAndShowMenuFoods ,
   insertFoodBoxHtmlTemplate ,
   showFoodDetails,
   addToFavorites,
   showNumberFavoritesFood,
   showNumberCart,
  cart__deleteFood} from './funcs/shared.js'

   import {paginateItems,getUrlParams , addParamToUrl} from './funcs/utils.js'

   window.addParamToUrl=addParamToUrl
   window.addToFavorites =addToFavorites
   window.cart__deleteFood  = cart__deleteFood 

const topBarElem = document.querySelector(".top-bar");
const topBarMenu = document.querySelector("#top-bar__menu");
const sidebar = document.querySelector('.sidebar')
const sidebarContent = document.querySelector('.sidebar-content')
const sidebarHeaderTitle = document.querySelector('#sidebar-header__title')
const sidebarClose = document.querySelector('.sidebar-header__close')
const userAccount = document.querySelector('#top-bar__user-account')
const topbarUserCart  = document.querySelectorAll('.top-bar__user-cart')
const menuFoodsWrapper = document.querySelector('#menu-foods-wrapper')
const foodPaginateWrapper = document.querySelector('.pagination')


window.addEventListener('load',()=>{
  
  showNumberFavoritesFood()
   showNumberCart()
  getAndShowMenuFoods().then(responseData=>{
    let foodsMenu = [...responseData.results]
    let URLparam  = getUrlParams('page')
    insertFoodBoxHtmlTemplate(foodsMenu , menuFoodsWrapper )

    const shownFoods =  paginateItems([...responseData.results] ,8,foodPaginateWrapper , URLparam )

    insertFoodBoxHtmlTemplate([...shownFoods] , menuFoodsWrapper)
  })

 
  
})



  window.addEventListener("scroll",()=>{

      let topBarElem = document.querySelector(".top-bar");
      nav__scrollEffect(topBarElem)

  } );

  topBarMenu.addEventListener("click", (event) => {

      let  sidebar = document.querySelector('.sidebar')
      let  sidebarContent = document.querySelector('.sidebar-content')
      let  sidebarHeaderTitle = document.querySelector('#sidebar-header__title')
      showSidebarTemplate(event.target.dataset.name );

  });

  sidebarClose.addEventListener('click',()=>{
    sidebar.classList.remove('active-sidebar')
  })
  
  userAccount.addEventListener('click' , (event)=>{
    showSidebarTemplate(event.target.dataset.name)
  })
  topbarUserCart.forEach(userCart=>{
    userCart.addEventListener('click',(event)=>{
      showSidebarTemplate(event.target.dataset.name )
    })
  })


