import { configureStore } from '@reduxjs/toolkit';//Used to create the Redux store.
import CartReducer from './CartSlice';
//The reducer property is specified as an object where each key represents a slice of state, and each value represents the corresponding reducer function.
//In this case, the CartReducer is associated with the cart slice of state. 
//This means that the state managed by the cartReducer will be stored under the cart key in the Redux store.

const store = configureStore({
  reducer: {
    cart: CartReducer
  }
});

export default store;