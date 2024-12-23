import { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext()

export const CartProvider = ({ children }) =>{

    const [userData, setUserData] = useState(null)
    const [cartDetails, setCartDetails] = useState({})

    useEffect(()=>{
        fetchTopCartData()
    },[])

    const fetchTopCartData = async () => {
        const userData = localStorage.getItem('user');
        const userId = userData && JSON.parse(userData)._id;
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}`);
        const data = await result.json();

        const subtotal = data[0]?.items.reduce((acc, curr)=>{
            return acc + (Number(curr.product.price) * curr.quantity);
        },0)
        const totalItem = data[0]?.items.length;
        setCartDetails({subtotal,totalItem})
    }

    return (
        <cartContext.Provider value={{userData, setUserData , cartDetails, fetchTopCartData}}>
            {children}
        </cartContext.Provider>
    )
}

export const useCart = () =>{ return useContext(cartContext)}