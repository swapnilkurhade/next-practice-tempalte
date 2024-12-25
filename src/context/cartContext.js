import { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext()

export const CartProvider = ({ children }) =>{

    const [userData, setUserData] = useState(null)
    const [cartDetails, setCartDetails] = useState({})

    useEffect(()=>{
        fetchTopCartData()
        getUserData()
    },[])

    const fetchTopCartData = async () => {
        const userData = localStorage.getItem('user');
        const userId = userData && JSON.parse(userData)._id;
        if(userId){
            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}`);
            const data = await result.json();
            const subtotal = data[0]?.items.reduce((acc, curr)=>{
                return acc + (Number(curr.product.price) * curr.quantity);
            },0)
            const totalItem = data[0]?.items.length;
            const cartId = data[0]?._id;
            setCartDetails({subtotal,totalItem, cartId})
        }else{
            setCartDetails({})
        }
    }

    const getUserData = () =>{
        const userData = localStorage.getItem('user');
        userData && setUserData(JSON.parse(userData));
    }

    return (
        <cartContext.Provider value={{userData, setUserData , cartDetails, fetchTopCartData}}>
            {children}
        </cartContext.Provider>
    )
}

export const useCart = () =>{ return useContext(cartContext)}