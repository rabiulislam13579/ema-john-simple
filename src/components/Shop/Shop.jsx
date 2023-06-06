import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { Link, useLoaderData } from 'react-router-dom';
import('./Shop.css');
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    const [currentPage,setCurrentPage]=useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { totalProducts } = useLoaderData();

    
    
    /**
     * METHOD OF DOING PAGINATION..
     * 1.determine the total number of items
     * 2.decide on the number of items per page
     * 3.calculate the total number of page
     * **/
 
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    // const pageNumbers=[];
    // for(let i=1;i<=totalPages;i++){
    //     pageNumbers.push(i);
    // }

    //another way to find the array of pageNumbers
    const pageNumbers = [...Array(totalPages).keys()];



    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, []);

    useEffect(()=>{
        async function fetchData(){
            const response=await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const data=await response.json();
            setProducts(data)
        }
        fetchData();
    },[currentPage,itemsPerPage]);

    const addToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product._id);
    }
    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        //step 1 to get the id
        for (const id in storedCart) {
            //  step 2 get the product by using id
            const addedProduct = products.find(product => product._id === id)

            if (addedProduct) {
                //step3 get quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                //step 4 add the added product to save cart
                savedCart.push(addedProduct)
            }
        }
        //set the cart
        setCart(savedCart);
    }, [products])

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    const options=[5,10,15,20];

    function handleSelectChange(event){
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);

    }


    return (

        <>
            <div className='shop-container'>
                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
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
                            <button className='proceed-btn'>Review Order <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </Link>
                    </Cart>

                </div>


            </div>
            {/* pagination */}
            <div className="pagination">
                <p>current Page:{currentPage}</p>
                {
                    pageNumbers.map(number=><button key={number}
                        className={
                            currentPage===number?
                            'selected':''
                        }
                    onClick={()=>setCurrentPage(number)}
                    >{number}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option=>(
                            <option key={option} value={option}>
                                {option}
                            </option>

                        ))
                    }
                </select>
            </div>
        </>
    );
};

export default Shop;