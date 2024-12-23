"use client"
import React, { useEffect, useState } from 'react'
import 'dotenv/config'
import { useCart } from 'context/cartContext'


const ProductCard = ({ product, handleAdd }: any) => {
    return (
        <div className="card bg-base-100 w-[calc(33.333%-1rem)] shadow-xl m-2 " >
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product?.name}</h2>
                <p>{product?.description}</p>
                <p>${product?.price}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => { handleAdd(product?._id) }}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}


const page = () => {

    const {fetchTopCartData} =  useCart()
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async (type: String = 'men') => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${type}`);
        const data = await res.json();
        console.log(data)
        setProducts(data)
    }

    const handleTabChange = (e: any) => {
        fetchProducts(e.target.ariaLabel)
    }

    const handleAdd = async(productId: String) => {
        const user = localStorage.getItem('user');
        const userId = user && JSON.parse(user)._id
        console.log(userId, productId);

        const productPayload = {
            userId: userId,
            items: [
                {
                    productId: productId,
                    quantity: 1
                }
            ],
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`,{
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(productPayload) 
        })

        fetchTopCartData()
    }

    return (
        <>
            <div className='m-4'>
                <div role="tablist" className="tabs tabs-lifted">
                    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="men" defaultChecked onChange={handleTabChange} />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <div className='flex'>
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
                        <div className='flex'>
                            {
                                products.map((product: any) => (
                                    <ProductCard product={product} key={product._id} handleAdd={handleAdd} />
                                ))
                            }
                        </div>
                    </div>

                    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="kids" onChange={handleTabChange} />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <div className='flex'>
                            {
                                products.map((product: any) => (
                                    <ProductCard product={product} key={product._id} handleAdd={handleAdd}/>
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
