import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

//state: This represents the current state of the Redux store. It typically includes the data relevant to the application.
//action: This is an object that describes the action that occurred. Redux actions are plain JavaScript objects that must have a type property indicating the type of action being performed. 
//*Additionally, they may contain additional data necessary to carry out the action. In this case, action.payload likely contains the identifier (id) of the item whose quantity needs to be increased.

//createSlice Info:
//name: A string value representing the name of your slice. It's used internally by Redux Toolkit for action type prefixing and other purposes.
//initialState: An object representing the initial state of your slice.
//reducers: An object containing reducer functions. Each key-value pair represents a single reducer, where the key is the name of the action and the value is the reducer function.

//Creating an createSlice Object--more info above
const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //This reducer function handles the action of adding an item to the cart.
        //It takes two parameters: state (current state of the slice) and action (the dispatched action containing the payload).
        addItemToCart(state, action) {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
            //Immer greatly simplifies updating nested data. 
            //Nested objects and arrays are also wrapped in Proxies and drafted
            //It's safe to pull out a nested value into its own variable and then mutate it.  
              existingItem.quantity += 1; //this shouldn't change the original state (state.cartItems.item), but with immer it allows it to change the original
            } else {
              state.cartItems.push({ ...action.payload, quantity: 1 });
            }
          },
          removeItemFromCart(state, action) {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
          },
          clearCart(state) {
            state.cartItems = [];
          },
          increaseItemQuantity(state, action) {
            const itemToIncrease = state.cartItems.find(item => item.id === action.payload);
            if (itemToIncrease) {
              itemToIncrease.quantity += 1;
            }
          },
          decreaseItemQuantity(state, action) {
            const itemToDecrease = state.cartItems.find(item => item.id === action.payload);
            if (itemToDecrease && itemToDecrease.quantity > 1) {
              itemToDecrease.quantity -= 1;
            }
          },
    }
});

const CartReducer = CartSlice.reducer;

//Exporting the actions from the CartSlice object.
//Using object destructioring, order does not matter (only matters when its an array)
//The destructuring assignment syntax unpack object properties into variables:
//Each function defined in the reducers argument will have a corresponding action creator generated using createAction and included in the result's actions field using the same function name.
export const {
    addItemToCart,
    removeItemFromCart,
    clearCart,
    increaseItemQuantity,
    decreaseItemQuantity,
  } = CartSlice.actions;

  //exporting the reducer.
  //The slice reducer is generated from the case reducers
  export default CartReducer;

