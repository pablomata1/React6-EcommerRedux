import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, clearCart, increaseItemQuantity, decreaseItemQuantity } from './CartSlice'; 
import './ShoppingCart.css';

const ShoppingCart = () => {

    const dispatch = useDispatch();
    //The component uses useDispatch and useSelector hooks from react-redux to interact with the Redux store. 
    //useDispatch is used to dispatch actions, and useSelector is used to extract data from the Redux store.
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    console.log(cartItems);

    const handleRemoveItem = itemId => {
        dispatch(removeItemFromCart(itemId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleIncreaseQuantity = itemId => {
        dispatch(increaseItemQuantity(itemId));
    };

    const handleDecreaseQuantity = itemId => {
        dispatch(decreaseItemQuantity(itemId));
    };

    const itemsList = cartItems.map(item => 
        <li key={item.id} className="cart-item">
            <span>{item.name} - ${item.price}</span>
            <div className="quantity-controls">
                <button className="quantity-control-btn" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                <span> {item.quantity}</span>
                <button className="quantity-control-btn" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
            </div>
            <button className="remove-item-btn" onClick={() => handleRemoveItem(item.id)}>Remove</button>
        </li>
    );

    return (
        <>
            <div className="shopping-cart">
                <h2 className="shopping-cart-title">Shopping Cart</h2>
                <ul className="cart-items">
                    {itemsList}
                </ul>
                <button className="clear-cart-btn" onClick={handleClearCart}>Clear Cart</button>
            </div>
            <div>{totalAmount ? <div>'The total amount is {totalAmount}</div> : ''}</div>


        </>
    );
};

export default ShoppingCart;
