import {counterDecrement ,counterIncrement , addToCart , cart_deleteFood  } from "./actionTypes.js"

const incrementAction = () =>{
    return{
        type:counterIncrement
    }
}

const decrementAction = () =>{
    return{
        type:counterDecrement
    }
}


const addToCartAction = (food , count) =>{
    return{
        type:addToCart,
        food,
        count
    }
}

const deleteFoodAction = (id) =>{
    return{
        type:cart_deleteFood,
        foodId:id
    }
}



export {incrementAction , decrementAction , addToCartAction}