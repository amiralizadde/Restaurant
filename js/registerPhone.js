import{
    nav__scrollEffect ,
    showSidebarTemplate ,
    getAndShowMenuFoods ,
    insertFoodBoxHtmlTemplate ,
    showFoodDetails,
    cart__deleteFood
  } from './funcs/shared.js'

  import {getUrlParams} from './funcs/utils.js'


 const topBarElem = document.querySelector(".top-bar");
 const topBarMenu = document.querySelector("#top-bar__menu");
 const sidebar = document.querySelector('.sidebar')
 const sidebarContent = document.querySelector('.sidebar-content')
 const sidebarHeaderTitle = document.querySelector('#sidebar-header__title')
 const sidebarClose = document.querySelector('.sidebar-header__close')
 const userAccount = document.querySelector('#top-bar__user-account')
 const topbarUserCart  = document.querySelector('#top-bar__user-cart')


 const registerBtn = document.querySelector('#registerBtn')
 const userCodeNumber = document.querySelector('#form-code')

 window.cart__deleteFood  = cart__deleteFood 

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
showSidebarTemplate(event.target.dataset.name )
})

topbarUserCart.addEventListener('click',(event)=>{
showSidebarTemplate(event.target.dataset.name  )
})



registerBtn.addEventListener('click' , event=>{
    event.preventDefault()
    
    }

  )


