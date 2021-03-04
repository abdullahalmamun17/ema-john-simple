import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {img, name, seller, price, stock, key} = props.product

    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div style={{marginLeft: '10px'}}>
                <h2 className="product-name"><Link to={'/product/' + key} style={{textDecoration: 'none'}}>{name}</Link></h2>
                <p>By: {seller}</p>
                <h5>${price}</h5>
                <p><small>only {stock} left in stock - order soon</small></p>
                { props.showAddToCart && <button className="cart-button" onClick={() => props.handleAddCart(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;