import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import placeOrderImg from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([])
    
    const [placeOrder, setPlaceOrder] = useState(false)

    const handlePlaceOrder = () => {
        setCart([])
        setPlaceOrder(true)
        processOrder()
    }

    useEffect(() => {
        const saveCart = getDatabaseCart()
        const productKeys = Object.keys(saveCart)

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(product => product.key === key)
            product.quantity = saveCart[key]
            return product
        })
        setCart(cartProducts);
    }, [])

    const removeProducts = productKey => {
        const newCart = cart.filter(product => product.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    return (
        <div className="shop-container">
            <div className="products-container">
               {
                   placeOrder ? <h1 style={{textAlign: 'center', borderBottom: '1px solid gray', paddingBottom: '20px'}}>Your order successfully placed</h1> :  <h1 style={{textAlign: 'center', borderBottom: '1px solid gray', paddingBottom: '20px'}}>Order Review</h1>
               }
                {
                    cart.map(product => <ReviewItem product={product} removeProducts={removeProducts} key={product.key}></ReviewItem>)
                }
                {
                    placeOrder && <img src={placeOrderImg} alt=""/>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link><button className="cart-button" onClick={handlePlaceOrder}>Place Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;