  import { addToCart , counterDecrement,counterIncrement } from "./actionTypes.js"
  
  function  reducerCounter(state = 1, action){
    switch (action.type) {

      case counterDecrement :{
        let newState = state - 1
        if(newState === 0){
          return 1
        }else{
          return state - 1
        }
      }
      case counterIncrement:{
        return state + 1
      }
      default:{
        return state
      }

    }
  }
  
 
  function addToCartReducer(cart=[] , action){

    switch (action.type) {

      case addToCart:{
        let newFood = [...cart]

        let newFoodObj = {
          id:action.food.id,
          name:action.food.title,
          price:Math.floor(action.food.pricePerServing)*1000,
          image:action.food.image,
          count:action.count
        }
         newFood.push(newFoodObj)
        return newFood
      }
        
    
      default:{
        return cart
      }
        
    }

  }

 


  export{reducerCounter, addToCartReducer}