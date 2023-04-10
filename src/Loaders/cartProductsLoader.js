import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader=async()=>{
    const loadedCart=await fetch('products.json');
    const products=await loadedCart.json();
    //if data in data base you have to use async await;
    const storedCart=getShoppingCart();
    const savedCart=[];
    for(const id in storedCart){
        const addedProduct=products.find(product=>product.id===id)
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