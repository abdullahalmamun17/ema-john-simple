import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10)
    const [products, setProducts] = useState(first10)

    const [cart, setCart] = useState([])

    useEffect( () => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)
        const previousCart = productKeys.map(productKeys => {
            const product = fakeData.find(product => product.key === productKeys)
            product.quantity = savedCart[productKeys]
            return product
        })
        setCart(previousCart)
    },[])

    const handleAddCart = product => {
        const sameProduct = cart.find(pd => pd.key === product.key)
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1
            sameProduct.quantity = count
            const otherProducts = cart.filter(pd => pd.key !== product.key)
            newCart = [...otherProducts, sameProduct]
        }
        else {
           product.quantity = 1
           newCart = [...cart, product]
        }

        setCart(newCart)
        addToDatabaseCart(product.key, count)
    }

    return (
        <div className="shop-container">
            <div className="products-container">
                {
                    products.map(product => <Product key={product.key} product={product} handleAddCart={handleAddCart} showAddToCart={true}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to='/review'><button className="cart-button">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;