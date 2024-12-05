import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import '../css/SuperCoin.css'

const SuperCoin = () => {

    const coinItems = useSelector(state => state.cart.cartItems);

    const [superCoins, setSuperCoins] = useState(0);
    const totalAmount = coinItems.reduce((total, item) => total + item.price * item.quantity ,0)

    useEffect(()=>{
        if(totalAmount >= 100 && totalAmount < 200){
            setSuperCoins(10);
        }else if (totalAmount >= 200 && totalAmount < 300){
            setSuperCoins(20);
        }else if (totalAmount >= 300) {
            setSuperCoins(30);
        }else {
            setSuperCoins(0);
        }
    },[totalAmount]);

    return(
        <>
            <div className="super-coin">
                <h1>Super Coins</h1>
                <p>You will earn {superCoins} super coins with this purchase</p>
            </div>
        </>
    )
};

export default SuperCoin;