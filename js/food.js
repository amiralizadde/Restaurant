import {
  nav__scrollEffect,
  showSidebarTemplate,
  showFoodDetails,
  foodDetailsHtmlTemplate,
  addingToCart,
  showNumberFavoritesFood,
  showNumberCart,
  cart__deleteFood
} from "./funcs/shared.js";

const topBarElem = document.querySelector(".top-bar");
const topBarMenu = document.querySelector("#top-bar__menu");
const sidebar = document.querySelector(".sidebar");
const sidebarContent = document.querySelector(".sidebar-content");
const sidebarHeaderTitle = document.querySelector("#sidebar-header__title");
const sidebarClose = document.querySelector(".sidebar-header__close");
const userAccount = document.querySelector("#top-bar__user-account");
const topbarUserCart  = document.querySelectorAll('.top-bar__user-cart')
const foodDetailsWrapper = document.querySelector("#food-details__wrapper");
const foodScript = document.querySelector("#foodScript");

window.cart__deleteFood  = cart__deleteFood 

window.addEventListener("load", () => {
  showNumberFavoritesFood()
  showNumberCart()
  showFoodDetails()
    .then((responseFoodDetails) => {
      let food = { ...responseFoodDetails };
      foodDetailsHtmlTemplate(food, foodDetailsWrapper);
      return responseFoodDetails;
    })
    .then((data) => {
      addingToCart(data);
    });
});

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

topbarUserCart.forEach(item=>{

  item.addEventListener("click", (event) => {
    console.log("topbarUserCart", event.target.dataset.name);
    showSidebarTemplate(
      event.target.dataset.name
    );
  });

})

