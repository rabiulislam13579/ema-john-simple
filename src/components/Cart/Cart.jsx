import React from 'react';
import'./Cart.css'

const Cart = (props) => {
    //const cart=props.cart;
    const {cart}=props;
    let total=0;
    let ShippingCost=0;
    let quantity=0;
    for(const item of cart){
        //if(item.quantity===0){
           //item.quantity=1;
        //}
        item.quantity=item.quantity||1;
        total=total+item.price*item.quantity ;
        ShippingCost=ShippingCost+item.shipping;
        quantity=quantity+item.quantity;

    }
    //added tax 7%
    let tax=total*7/100;
    let grandTotal=total+ShippingCost+tax;
   
    return (
        <div className='cart'>
            <h2 className='cart-heading'>order summary</h2>
            <p>selected item:{quantity}</p>
            <p>Total Price:${total} </p>
            <p>Total Shipping Charge:${ShippingCost}</p>
            <p>Tax:${tax.toFixed(2)}</p>
            <h6 className='cart-g-total'>Grand Total:${grandTotal.toFixed(2)}</h6>
            
        </div>
    );
};

export default Cart;