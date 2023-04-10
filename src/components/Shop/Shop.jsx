import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import('./Shop.css');
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    const [cart, setCart] = useState([])
    const addToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
    }
    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        //step 1 to get the id
        for (const id in storedCart) {
            //  step 2 get the product by using id
            const addedProduct = products.find(product => product.id === id)

            if (addedProduct) {
                //step3 get quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                //step 4 add the added product to save cart
                savedCart.push(addedProduct)
            }
            console.log(addedProduct);
        }
        //set the cart
        setCart(savedCart);
    }, [products])

    const handleClearCart=()=>{
        setCart([]);
        deleteShoppingCart();
    }


    return (

        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        addToCart={addToCart}

                    >

                    </Product>)
                }

            </div>
            <div className="cart-container">
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to="/orders">
                    <button className='proceed-btn'>Review Order <FontAwesomeIcon  icon={faArrowRight} />
</button>
                    </Link>
                </Cart>

            </div>


        </div>
    );
};

export default Shop;