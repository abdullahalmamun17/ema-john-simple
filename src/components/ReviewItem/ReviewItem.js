import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, img, price, key} = props.product

    return (
        <div style={{marginLeft: '150px', padding: '10px', borderBottom: '1px solid gray'}}>
           <h3>{name}</h3>
           <img src={img} alt=""/>
           <h4 style={{color: 'tomato'}}>Product Quantity: {quantity}</h4>
           <h3>Total Price: {price}</h3>
           <button className="cart-button" onClick={() => props.removeProducts(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;