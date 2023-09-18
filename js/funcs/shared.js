import { getUrlParams } from "./utils.js";
import {reducerCounter , addToCartReducer} from '../redux/reducers.js'
import {incrementAction , decrementAction ,addToCartAction} from "../redux/actionCreator.js"

const nav__scrollEffect = (topBarElem) => {
  Math.floor(document.documentElement.scrollTop) === 0
    ? ((topBarElem.style.backgroundColor = "transparent"),
      (topBarElem.style.height = "100px"))
    : ((topBarElem.style.backgroundColor = "black"),
      (topBarElem.style.height = "70px"));
};


const showSidebarTemplate = (key) => {
  const sidebar = document.querySelector('.sidebar')
  const sidebarContent = document.querySelector('.sidebar-content')
  const sidebarHeaderTitle = document.querySelector('#sidebar-header__title')

  sidebar.classList.add("active-sidebar");
  switch (key) {
    case 'menu': {
      (sidebarContent.innerHTML = ""),
      (sidebarHeaderTitle.innerHTML = "فهرست");
      sidebarContent.insertAdjacentHTML(
        "beforeend",
        `
          <div>
            <ul class="sidebar-content__list">
              <li class="sidebar-content__item">  
                <a href="index.html" class="sidebar-content__text">خانه</a>
                <hr>
              </li>

              <li class="sidebar-content__item">  
                <a href="#" class="sidebar-content__text">بلاگ</a>
                <hr>
              </li>

              <li class="sidebar-content__item">  
                <a href="#" class="sidebar-content__text">نمونه کارها </a>
                <hr>
              </li>

              <li class="sidebar-content__item">  
                <a href="favorites.html" class="sidebar-content__text"> علاقه مندی </a>
                <hr>
              </li>

              <li class="sidebar-content__item">  
                <a href="register.html" class="sidebar-content__text">ورود / ثبت نام </a>
                <hr>
              </li>

            </ul>
        </div>
        `
      );
      break;
    }

    case 'user-account': {
      sidebarHeaderTitle.innerText = "ورود";
      (sidebarContent.innerHTML = ""),
        sidebarContent.insertAdjacentHTML(
          "afterbegin",
          `
       <div class="sidebar-login-form">
         <form>
            <div class="mb-3">
              <label for="sidebar__user-name" class="form-label text-white fs-5">نام کاربری یا آدرس ایمیل</label>
              <input type="text" class="form-control sidebar__user-name-input" id="sidebar__user-name"/>
            </div>

            <div class="mb-3">
              <label for="sidebar__password" class="form-label text-white fs-5">رمز عبور</label>
              <input type="password" class="form-control sidebar__password-input" id="sidebar__password"/>
            </div>

            <button type="submit" class="btn text-white sidebar-login__button">ورود</button>
            <div class="">

              <div class="w-50 my-2 form-check">
                <label class="form-check-label text-white" for="sidebar__form-check">مرا به خاطر بسپار</label>
                <input type="checkbox" class="form-check-input" id="sidebar__form-check"/>
              </div>

              <span class="w-50 text-white">آیا رمز عبور را فراموش کرده اید؟</span>
            </div>

          </form>
          <hr class="text-white" />
          <div class="d-flex flex-column align-items-center">
            <i class="fa-solid fa-user sidebar-login__user-icon "></i>
            <p href="#" class="text-white sidebar-login__text">هنوز حساب کاربری ندارید؟</p>
            <a href="register.html" class=" sidebar-login__text""> ایجاد حساب کاربری   </a>
          </div>
        </div> `
        );
        break
    }

    case 'user-cart':{
      sidebarHeaderTitle.innerText = "سبد خرید",
      (sidebarContent.innerHTML = "")
      let cartItems =  JSON.parse(localStorage.getItem('cart'))
      let totalPrice =  JSON.parse(localStorage.getItem('totalPrice'))
      cartItems.length ? (
        sidebarContent.insertAdjacentHTML('afterbegin',`
        <div class="sidebar-content__cart-item">

          <div class="container-fluid">
          ${cartItems.map(cartItem=>{
           return addToCartHtmlTemplate(cartItem.name , cartItem.price ,cartItem.image , cartItem.count ,cartItem.id)
          })}
         </div>
          <div class="sidebar-footer">
               <hr class="text-white">
               <div class="sidebar-footer__totalPrice-box">
                  <p class="sidebar-footer__totalPrice-text">جمع کل سبد خرید:</p>
                  <p class="sidebar-footer__totalPrice-number">${totalPrice.toLocaleString()}</p>
               </div>
               <button class="btn sidebar-footer__addToCartBtn">مشاهده سبد خرید </button>
               <button class="btn sidebar-footer__goPayment">  تسویه حساب </button>
          </div>
         </div>
        `)
     
        
      ) : (
        sidebarContent.insertAdjacentHTML(
          "beforeend",
          ` 
            <div class="sidebar-user-cart">
                <i  class=" fa-solid fa-cart-arrow-down  sidebar-user-cart__icon"></i>
                <p class="text-white sidebar-user-cart__text">هیچ غذایی در لیست سفارش شما نیست.</p>
                <a href="menus.html?page=1" class="btn sidebar-user-cart__button">بازگشت به منو</a>
            </div>
            `
       )
      )
      // ----------make empty cart template----------
 
    }

    default:{
      break;
    }
      
  }
};

const getAndShowMenuFoods=async(number=30)=>{
  const apiKey = '764ec55d3b714a42b66c753c94838c69';
  const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=${number}`,{
    headers:{
      'Content-Type': 'application/json'
    }
  })
  const data =await res.json()
  return data
}

const insertFoodBoxHtmlTemplate=(foodsMenu , containerHtmlTemplate)=>{
  containerHtmlTemplate.innerHTML=""
  foodsMenu.forEach(food=>{

    containerHtmlTemplate.insertAdjacentHTML('beforeend' , `
    
        
        <div class="col food-content__box">
            <a  href="food.html?name=${food.id}">
              <div class="food-content__box-image">
                <img src=${food.image} class="food-content__image" alt="">
              </div>
            </a>
            <div class="food-content__box-footer">
                <a  href="food.html?name=${food.id}">
                  <div class="food-content__food-info">
                     <p class="food-content__food-info-name">${food.title}</p>
                  </div>
                </a>
                  <div class="food-content__food-funcs">
                    <a href="food.html?name=${food.id}" class="btn food-content__food-funcs-button"  >
                      <p> مشاهده اطلاعات </p>
                    </a>
                        <a onclick="addToFavorites(${food.id})"><i class="fa-regular fa-heart food-content__food-funcs-icon"></i></a>
                     </div>
                   </div>
        </div>

    `)

  })
}

const showFoodDetails = async() =>{
const urlParams = getUrlParams("name")
const apiKey = '764ec55d3b714a42b66c753c94838c69';

const res = await fetch(`https://api.spoonacular.com/recipes/${urlParams}/information?apiKey=${apiKey}`,{
  headers:{
    'Content-Type': 'application/json'
  }
})
const detailFood = await res.json()

return detailFood



}

const foodDetailsHtmlTemplate = (food , foodDetailsWrapper) =>{

      foodDetailsWrapper.innerHTML=""
      foodDetailsWrapper.insertAdjacentHTML('afterbegin',`
  
      <div class="col food-details__image-box ">
          <img src=${food.image} class="food-details__image" alt="">
      </div>
      <div class="col food-details__box ">
      <div class="menus__right-breadcrumb">
        <div class="breadcrumb__home-content-icon">
          <i class="fas fa-home breadcrumb__home-icon"></i>
        </div>
        <ul class="breadcrumb__list">
          <li class="breadcrumb__item mx-2">
            <a href="#" class="breadcrumb__link">
              خانه
              <i class="fas fa-angle-left breadcrumb__icon"></i>
            </a>
          </li>
          <li class="breadcrumb__item mx-2">
            <a href="#" class="breadcrumb__link">
            منو
            </a>
          </li>
        </ul>
      </div>
      <p class="food-details__name">${food.title}</p>
      <p class="food-details__price">${(Math.floor(food.pricePerServing)*1000).toLocaleString()} تومان </p>
      <p class="food-details__description">${food.instructions}</p>

       <div class="food-details__funcs ">
        <div class="food-details__funcs-box ">
            <button class="btn food-details__funcs-decrease" id="decrementCount" >-</button>
            <span class="food-details__funcs-count" id="countFood" >1</span>
            <button class="btn food-details__funcs-increase" id="incrementCount">+</button>
        </div>
        <div class="food-details__funcs-addToCart mx-5 ">
            <button class="btn food-details__funcs-addToCart-btn" id="addToCartBtn">
                افزودن به سبد خرید
            </button>
        </div>
      </div>
      <hr>
      <div class="food-details__social-media">
        <div><p class="food-details__social-media-text">اشتراک گذاری:</p></div>
        <div class="food-details__social-media-box-icons">
            <i class="fa-brands fa-facebook food-details__social-media-icons"></i>
            <i class="fa-brands fa-twitter food-details__social-media-icons"></i>
            <i class="fa-brands fa-telegram food-details__social-media-icons"></i>
        </div>
      
      </div>



      </div>

  `)

}

const addingToCart = (food)=>{

    const  decrementElem = document.querySelector('#decrementCount')
    const  countFoodElem = document.querySelector('#countFood')
    const  incrementElem = document.querySelector('#incrementCount')
    const  addToCartBtn = document.querySelector('#addToCartBtn')
    

      
    const store = Redux.createStore(
      Redux.combineReducers({
        addToCart:addToCartReducer,
        counter:reducerCounter,
     })
    )


    decrementElem.addEventListener('click' , ()=>{
      
      store.dispatch(decrementAction())
      let number = store.getState().counter
      countFoodElem.innerHTML=number

    })
    incrementElem.addEventListener('click' , ()=>{
      
      store.dispatch(incrementAction())
      let number = store.getState().counter
      countFoodElem.innerHTML=number

    })


    addToCartBtn.addEventListener('click',(event)=>{
      event.preventDefault()

          let count = store.getState().counter

          store.dispatch(addToCartAction(food , count))

          let newFood = store.getState().addToCart[0]

          let cartLocalStorage = localStorage.getItem('cart')

          let newCart = cartLocalStorage ? JSON.parse(cartLocalStorage) : []

          let isHasFood =  newCart.some(item=> item.id === newFood.id)
      
          isHasFood ? (
            swal({
              text: "این غذا قبلا به سبد خرید شما اضافه شده ست!!",
              timer:3000,
              icon:'warning'
            })
          ) : (
            newCart.push(newFood),
            localStorage.setItem('cart' , JSON.stringify(newCart)),
            totalPrice(newFood.price ,count ),
            showNumberCart(),
            showSidebarTemplate('user-cart'),
            swal({
              text: "غذای شما به سبد خریدتان اضافه شد",
              timer:3000,
              icon:'success'
            })
          )

    })
   

}

const totalPrice = ( priceFood ,count)=>{
  let oldTotalPrice
  console.log('count :' , count);
  localStorage.getItem('totalPrice') ? ( 

     oldTotalPrice = JSON.parse(localStorage.getItem('totalPrice')),
  
     oldTotalPrice+=(priceFood * count),
  
     localStorage.setItem('totalPrice' , JSON.stringify(oldTotalPrice))
     
     ) : (
       localStorage.setItem('totalPrice' , JSON.stringify(priceFood * count))
       )


}

const cart__deleteFood = (foodID , count)=>{

  let cart = JSON.parse(localStorage.getItem('cart'))
  let totalPrice = JSON.parse(localStorage.getItem('totalPrice'))

  let newCart = cart.filter(food=>{
    if (food.id === foodID) {
      localStorage.setItem('totalPrice',JSON.stringify(totalPrice - (food.price*count)))
    }
    return food.id !== foodID
  })

  localStorage.setItem('cart',JSON.stringify(newCart))
  showSidebarTemplate('user-cart')
  showNumberCart()

}


const addToCartHtmlTemplate=(name , price , image , count , foodID)=>{
  let newName = name.split(" ");
 const template = `
    <div class="row sidebar-content__cart-box">
     <div class="col-4 sidebar-content__cart-image-box">
         <img src=${image} class="sidebar-content__cart-image" alt=""/>
     </div>
     <div class="col-8  sidebar-content__cart-text-box">
       <div class="">
         <p class="text-white mb-2">${newName[0]}${newName[1]}</p>
         <p class="text-white mt-4">
           <span>${count}</span> * <span>${price}</span>
         </p>
       </div>
       <div>
         <i class="fa-solid fa-xmark  sidebar__delete-food text-white" onClick="cart__deleteFood(${foodID},${count})" ></i>
       </div>
     </div>
   </div>
   `
   return template
}

async function addToFavorites (foodID ){

  const apiKey = '516747c785954d39aed26063d4af3fc8';
  const res = await fetch(`https://api.spoonacular.com/recipes/${foodID}/information?apiKey=${apiKey}`,{
    headers:{
      'Content-Type': 'application/json'
    }
  })
  const foodData = await res.json()
  console.log('foodData :' , foodData);
  let favorite=[]
  let foodInfo = {
    id:foodData.id,
    image:foodData.image,
    name:foodData.title,
  }

  let isHasFavorites = localStorage.getItem('favorites')

  let favorites =   isHasFavorites ? JSON.parse(isHasFavorites) : []

   let isHasFood =   favorites.some(food=>food.id ===foodData.id)
   isHasFood ? (
      swal({
        text: "این غذا در علاقه مندی های شما موجود است!",
        timer:3000,
        icon:'warning'
      })
     ) : (
      favorites.push(foodInfo),
       localStorage.setItem('favorites' , JSON.stringify(favorites)),
      showNumberFavoritesFood(),
      swal({
        text: "این غذا به علاقه مندی های شما اضافه شد",
        timer:3000,
        icon:'success'
      })
     )
  
  


}


const showNumberFavoritesFood = ()=>{
 
  let numberFavoritesWrapper =document.querySelector('.top-bar__before-expand-right-number')

  let favoritesFoods =   localStorage.getItem('favorites')
  let numberFavoritesFood = favoritesFoods ? (JSON.parse(favoritesFoods)).length : 0
  numberFavoritesWrapper.innerText=''
  numberFavoritesWrapper.innerText=numberFavoritesFood
  console.log(numberFavoritesFood);


}

function showNumberCart(){
  console.log('show number cart');
  let numberCartWrapper =document.querySelectorAll('.top-bar__cart')

  let cartFoods =   localStorage.getItem('cart')
  let numberCartFood = cartFoods ? (JSON.parse(cartFoods)).length : 0
  numberCartWrapper.forEach(item=>{
    
    item.innerText=numberCartFood
    console.log('numberCartFood',numberCartFood);
  })
 

}

export { cart__deleteFood  ,showNumberCart, showNumberFavoritesFood , addToFavorites, nav__scrollEffect , showSidebarTemplate ,getAndShowMenuFoods , insertFoodBoxHtmlTemplate , showFoodDetails , foodDetailsHtmlTemplate , addingToCart};
