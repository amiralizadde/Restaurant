import{
    nav__scrollEffect ,
    showSidebarTemplate ,
    getAndShowMenuFoods ,
    insertFoodBoxHtmlTemplate ,
    showFoodDetails,
    showNumberCart,
    showNumberFavoritesFood,
    cart__deleteFood
  } from './funcs/shared.js'
 
 const topBarElem = document.querySelector(".top-bar");
 const topBarMenu = document.querySelector("#top-bar__menu");
 const sidebar = document.querySelector('.sidebar')
 const sidebarContent = document.querySelector('.sidebar-content')
 const sidebarHeaderTitle = document.querySelector('#sidebar-header__title')
 const sidebarClose = document.querySelector('.sidebar-header__close')
 const userAccount = document.querySelector('#top-bar__user-account')
 const topbarUserCart  = document.querySelectorAll('.top-bar__user-cart')
 const form = document.querySelector('#form')

 const registerBtn = document.querySelector('#registerBtn')

 const userPhoneNumber = document.querySelector('#form-phone')
 const userPassword = document.querySelector('#form-password')
 const username = document.querySelector('#form-userName')

window.registerPhoneNumber = registerPhoneNumber
window.cart__deleteFood  = cart__deleteFood 

window.addEventListener('load',()=>{

  showNumberCart()
  showNumberFavoritesFood()

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
    showSidebarTemplate(event.target.dataset.name )
  })


  topbarUserCart.forEach(item=>{
    item.addEventListener('click',(event)=>{
      showSidebarTemplate(event.target.dataset.name  )
    })
  })
 

   
 let code = Math.floor(Math.random()*(999999-100000+1)+100000)
 

  function registerPhoneNumber (event ){
    event.preventDefault()
    const userCodeNumber = document.querySelector('#form-code')

    console.log('loginCode',code);
    console.log('userCodeNumber : ' , userCodeNumber);
    userCodeNumber.value.trim()=== String(code) ? (
      window.location.href = "index.html"
    ):(
      swal({
        text: `رمز نا معتبر میباشد`,
        timer:3000,
        icon:'warning'
      })
    )

  }


  registerBtn.addEventListener('click' , async(event)=>{
        event.preventDefault()
       
        let userName = username.value.trim()
        let password
        let mobile
        const countryCode = 'fa-IR'

        let infoUser={
          Mobile:userPhoneNumber.value.trim(),
          TemplateId:333678,
          Parameters: [
            {Name: "Code" , Value: `${code}`},
          ]
        }

        let optionPassword = {
         minLength: 4, 
         minUppercase: 1,
         minNumbers: 1,
         returnScore:true
        }

          validator.isStrongPassword(userPassword.value.trim() ,optionPassword) >=34 ?(
          password = userPassword.value.trim()
          ):
          (swal({ text: `پسورد باید دارای یک حرف بزرگ و یگ عدد و حداقل 4 کاراکتر داشته باشد`, timer:3000,icon:'warning'}))


           validator.isMobilePhone(userPhoneNumber.value.trim(),countryCode ) ? ( mobile =userPhoneNumber.value.trim()):
           (swal({ text:`شماره تلفن معتبر نیست`, timer:3000,icon:'warning'}))

           
           if(userName && password){

            let user={
              username:userName,
              password
            }

            localStorage.setItem('account' , JSON.stringify(user))
            

           } 
            
           

          (userName && password && mobile) && (

          await  fetch(`https://api.sms.ir/v1/send/verify`,{
               method:'POST',
              //  mode: 'no-cors',
               headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain",
                "x-api-key": "1oRTrmjDFZLWOmydXsDFOFPeXeLKO9xaOhYmMvUZCoSNXuQ1Vcg4xtvcAGEm81ch",
               },
               body:JSON.stringify(infoUser)
             })
             .then(res=>res.json())
             .then(data=>{
              if (data.status===1) {

                
                form.innerHTML=""
                form.insertAdjacentHTML('afterbegin',`
                
                  <div class="my-3 register-content__form-userName-box ">
                     <label for="form-code" class="form-label register-content__form-phone-label">رمز ارسالی را وارد نمایید</label>
                     <input type="text" class="form-control register-content__form-phone-input" id="form-code">
                  </div>
                  <button type="submit" class="btn register-content__form-btn" onClick="registerPhoneNumber(event)" id="registerBtn">login</button>

                `)
              }
             })
             .catch(err=>{
              swal({
                text: `${err.message}`,
                timer:3000,
                icon:'warning'
              })
             })

        )  

      
   }
  )


  
