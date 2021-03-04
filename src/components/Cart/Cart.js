import React from 'react';

const Cart = (props) => {
    const cart = props.cart

    // const total = cart.reduce((total, product) => total + product.price , 0)
    let total = 0;
    for(let i = 0; i < cart.length; i++){
        total += total + cart[i].price * cart[i].quantity
    }

    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if (total > 15){
        shipping = 4.99;
    }
    else if(total > 0) {
        shipping = 12.99;
    }

    const tax = total * 0.1;
    
    const formatNumber = number => {
        const precision = number.toFixed(2)
        return Number(precision)
    }

    return (
        <div>
            <h2>Order Summary</h2>
            <h4>Items Ordered: {cart.length}</h4>
            <p>Proudct Price: {formatNumber(total)}</p>
            <p><small>Shipping Charge: {shipping}</small></p>
            <p><small>Tax + Vat: {formatNumber(tax)}</small></p>
            <p>Total Price: {formatNumber(total + shipping + formatNumber(tax))}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;