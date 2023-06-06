import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader=async()=>{
    //if data in data base you have to use async await;
    const storedCart=getShoppingCart();
    const ids=Object.keys(storedCart);
   
 
    // const loadedCart = await fetch(`http://localhost:5000/productsByIds`,{
    //     method : 'POST',
    //     headers : {
    //         'content-type' : 'application/json'
    //     },
    //     body : JSON.stringify(ids)
    // });

     const loadedProducts = await fetch(`http://localhost:5000/productsByIds`, {
        method: 'POST', 
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    });

    const products=await loadedProducts.json();
    console.log('products by id',products)
   
    
    const savedCart=[];
    for(const id in storedCart){
        const addedProduct=products.find(product=>product._id === id)
        if(addedProduct){
            const quantity=storedCart[id];
            addedProduct.quantity=quantity;
            savedCart.push(addedProduct)
        }
    }
    console.log(savedCart )
    //if you need to send two things as return 
    //function did not give permission to send two things at a  time

    //1 st way to return two things by an array
    //return [products,saveCart]

    //2nd way to return two things by an object
    // return {products,saveCart} 


    return savedCart;
}
export default cartProductsLoader;