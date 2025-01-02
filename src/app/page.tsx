"use client"
import React, { useEffect, useState } from 'react'
import 'dotenv/config'
import { useCart } from 'context/cartContext'
import { useRouter } from 'next/navigation'


export function truncateText(text: string, limit: number) {
    return text.length > limit ? text.slice(0, 35) + "..." : text
}

const ProductCard = ({ product, handleAdd }: any) => {
    return (
        <div className="card bg-base-100 w-[calc(33.333%-1rem)] shadow-xl m-2 " >
            <figure className='w-full h-[320px]'>
                <img
                    src={product?.img || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR905Tkp8MLUa9Z-kQ04XPNeODOHIM2WNJPIQ&s'}
                    alt="Product"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product?.name}</h2>
                <p>{truncateText(product?.description, 20)}</p>
                <h5>₹<b>{product?.price}</b></h5>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => { handleAdd(product?._id) }}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}


const page = () => {

    const { fetchTopCartData, userData } = useCart()
    const [products, setProducts] = useState([])
    const router = useRouter()

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async (type: String = 'men') => {

        const user = localStorage.getItem('user');
        const token = user && JSON.parse(user).token

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${type}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        const data = await res.json();
        setProducts(data)
    }

    const handleTabChange = (e: any) => {
        fetchProducts(e.target.ariaLabel)
    }

    const handleAdd = async (productId: String) => {
        const user = localStorage.getItem('user');
        const userId = user && JSON.parse(user)._id

        if (userId) {
            const productPayload = {
                userId: userId,
                items: [
                    {
                        productId: productId,
                        quantity: 1
                    }
                ],
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productPayload)
            })

            fetchTopCartData()
        } else {
            router.push('/login')
        }
    }

    return (
        <>
            <div className='m-4'>
                <div role="tablist" className="tabs tabs-lifted">
                    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="men" defaultChecked onChange={handleTabChange} />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <div className='flex flex-wrap justify-between'>
                            {
                                products.map((product: any) => (
                                    <ProductCard product={product} key={product._id} handleAdd={handleAdd} />
                                ))
                            }
                        </div>
                    </div>

                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        className="tab"
                        aria-label="women"
                        onChange={handleTabChange}
                    />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <div className='flex flex-wrap justify-between'>
                            {
                                products.map((product: any) => (
                                    <ProductCard product={product} key={product._id} handleAdd={handleAdd} />
                                ))
                            }
                        </div>
                    </div>

                    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="kids" onChange={handleTabChange} />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <div className='flex flex-wrap justify-between'>
                            {
                                products.map((product: any) => (
                                    <ProductCard product={product} key={product._id} handleAdd={handleAdd} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default page
