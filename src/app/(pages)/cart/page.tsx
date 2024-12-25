"use client"
import { useCart } from "context/cartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {

    interface Product {
        _id: string;
        name: string;
        price: number;
        quantity: number;
        product: {
            _id: string
        }
    }
    const { userData, fetchTopCartData, cartDetails } = useCart()
    const [cartData, setCartData] = useState<Product[]>([])
    const router = useRouter()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const userData = localStorage.getItem('user');
        const userId = userData && JSON.parse(userData)._id;
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}`);
        const data = await result.json();
        console.log(data);
        setCartData(data[0]?.items)

        if (data.length == 0 || data[0]?.items.length == 0) {
            router.push('/')
        }
    }

    const removeCartProduct = async (productId: String) => {
        const userData = localStorage.getItem('user');
        const userId = userData && JSON.parse(userData)._id;
        const payload = { productId, userId }
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        fetchData()
        fetchTopCartData()
    }


    const ProductInCard = ({ product, removeCartProduct }: any) => {
        return (
            <div className="card bg-base-100 w-[calc(33.333%-1rem)] shadow-xl m-2 " >
                <figure>
                    <img
                        src={product?.product.img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR905Tkp8MLUa9Z-kQ04XPNeODOHIM2WNJPIQ&s'}
                        alt="Product" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product?.product.name}</h2>
                    <p>{product?.product.description}</p>
                    <p>${product?.product.price}</p>
                    <p>Quantity : {product?.quantity}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => { removeCartProduct(product?.product._id) }}>Remove</button>
                    </div>
                </div>
            </div>
        )
    }

    const handleOrder = async () => {
        const userData = localStorage.getItem('user');
        const userId = userData && JSON.parse(userData)._id;

        const orderpaylod = {
            userId,
            cartId: cartDetails.cartId,
            total_price: cartDetails.subtotal,
            payment_status: true
        }

        console.log(orderpaylod);

        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderpaylod)
        })

        const response = await result.json()

        if(response.success){
            alert('Order is placed...')
            fetchTopCartData()
            fetchData()
        }
    }

    return (
        <>
            <div className='flex'>


                {/* {
                    
                    cartData?.map((product) => (
                        <ProductInCard product={product} removeCartProduct={removeCartProduct} key={product?.product._id} />
                    ))
                } */}

                {
                    cartData?.length > 0 ?
                        (
                            <>
                                {
                                    cartData?.map((product) => (
                                        <ProductInCard product={product} removeCartProduct={removeCartProduct} key={product?.product._id} />
                                    ))
                                }
                            </>
                        ) :
                        (
                            <div className="flex items-center justify-center h-64 text-gray-500">
                                Your cart is empty. Start adding some products!
                            </div>
                        )
                }
            </div>
            <button className="btn btn-warning w-full my-2" onClick={handleOrder}>Click to Order</button>
        </>
    )
}

export default page;