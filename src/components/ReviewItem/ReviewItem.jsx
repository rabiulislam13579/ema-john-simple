import React from 'react';
import "./ReviewItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons';

const ReviewItem = ({ product ,handleRemoveCart}) => {
   

    const { img, name, price, quantity, id } = product
    return (
        <div className='review-item'>
            <img src={img} alt="" />
            <div className='item-details'>
                <h5 className='item-title'>{name}</h5>
                <p>Price: <span className='text-orange'>${price}</span></p>
                <p>Order Quantity: <span className='text-orange'>{quantity}</span></p>

            </div>
            <button onClick={()=>{handleRemoveCart(id)}} className='btn-delete'>
                <FontAwesomeIcon className='btn-icon' icon={faTrashAlt} />
            </button>
        </div>
    );
};

export default ReviewItem;