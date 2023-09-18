import {
  nav__scrollEffect,
  showSidebarTemplate,
  getAndShowMenuFoods,
  insertFoodBoxHtmlTemplate,
  showFoodDetails,
  showNumberFavoritesFood,
  cart__deleteFood
} from "./funcs/shared.js";
import { paginateItems, getUrlParams, addParamToUrl } from "./funcs/utils.js";

window.cart__deleteFood  = cart__deleteFood 

const topBarElem = document.querySelector(".top-bar");
const topBarMenu = document.querySelector("#top-bar__menu");
const sidebar = document.querySelector(".sidebar");
const sidebarContent = document.querySelector(".sidebar-content");
const sidebarHeaderTitle = document.querySelector("#sidebar-header__title");
const sidebarClose = document.querySelector(".sidebar-header__close");
const userAccount = document.querySelector("#top-bar__user-account");
const topbarUserCart = document.querySelector("#top-bar__user-cart");
const favoritesFoodsWrapper = document.querySelector(
  "#favorites-foods-wrapper"
);
const foodPaginateWrapper = document.querySelector(".pagination");

window.addEventListener("load", () => {

  showNumberFavoritesFood()
  let favoritesFoods = JSON.parse(localStorage.getItem("favorites"));

  console.log('favoritesFoods :' , favoritesFoods);

  if(favoritesFoods ){
   favoritesFoods.map((favoriteFoods) => {
      favoritesFoodsWrapper.insertAdjacentHTML(
        "afterbegin",
        `

          <div class="col food-content__box">
                    <a  href="food.html?name=${favoriteFoods.id}">
                      <div class="food-content__box-image">
                      <img src=${favoriteFoods.image} class="food-content__image" alt="">
                      </div>
                    </a>
             <div class="food-content__box-footer">
                      <a  href="food.html?name=${favoriteFoods.id}">
                        <div class="food-content__food-info">
                          <p class="food-content__food-info-name">${favoriteFoods.name}</p>
                        
                        </div>
                      </a>
                   <div class="food-content__food-funcs">
                        <a href="food.html?name=${favoriteFoods.id}" class="btn food-content__food-funcs-button"  >
                          <p> مشاهده اطلاعات </p>
                        </a>
                   </div>
             </div>
           </div>
  
          `
      )
    })
  }else{
    favoritesFoodsWrapper.insertAdjacentHTML(
      "afterbegin",
      `
       <div class="food-content__box-image">
         <p class="food-content__food-info-name">لیست علاقه مندی های شما خالی میباشد!</p>
       </div>
      `)
  }
})







window.addEventListener("scroll", () => {
  let topBarElem = document.querySelector(".top-bar");
  nav__scrollEffect(topBarElem);
});

topBarMenu.addEventListener("click", (event) => {
  let sidebar = document.querySelector(".sidebar");
  let sidebarContent = document.querySelector(".sidebar-content");
  let sidebarHeaderTitle = document.querySelector("#sidebar-header__title");
  showSidebarTemplate(
    event.target.dataset.name
  );
});

sidebarClose.addEventListener("click", () => {
  sidebar.classList.remove("active-sidebar");
});

userAccount.addEventListener("click", (event) => {
  showSidebarTemplate(
    event.target.dataset.name
  );
});

topbarUserCart.addEventListener("click", (event) => {
  showSidebarTemplate(
    event.target.dataset.name
  );
});
