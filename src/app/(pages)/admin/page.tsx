"use client"

import { useState } from "react"
import ProductTableData from "../../../components/ProductTableData"
const page = () => {

    interface Product {
        name: string,
        description: string,
        type: string,
        price: string,
        img: File | string
    }

    const [productPayload, setProductPayload] = useState<Product>({
        name: "",
        description: "",
        type: "men",
        price: "",
        img: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setProductPayload({ ...productPayload, [e.target.name]: e.target.value })
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productPayload)
        });

        const result = await response.json();
        console.log(result);
    }


    return (
        <>


            <div className="flex h-screen">

                <div className="w-1/2 p-8 ">
                    <h2 className="text-xl font-bold">Add Product</h2>
                    <div className="mb-5">
                        <form onSubmit={handleSave}>
                            <div className="flex flex-col">
                                <div className="mb-1">
                                    <label className="input input-bordered flex items-center gap-2 my-2">
                                        <input type="text" name="name" placeholder="Product Name" onChange={handleChange} autoFocus />
                                    </label>
                                </div>
                                <div className="mb-1">
                                    <select className="select select-bordered w-full" name="type" onChange={handleChange}>
                                        <option disabled >Select Type</option>
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                        <option value="kids">Kids</option>
                                    </select>
                                </div>
                                <div className="mb-1">
                                    <label className="input input-bordered flex items-center gap-2 my-2">
                                        <input type="number" name="price" placeholder="Price" onChange={handleChange} />
                                    </label>
                                </div>
                                <div className="mb-1">
                                    <textarea className="textarea textarea-bordered w-full" name="description" placeholder="Description" onChange={handleChange}></textarea>
                                </div>
                                <div className="mb-1">
                                    <label className="input input-bordered flex items-center gap-2 my-2">
                                        <input type="url" name="img" placeholder="Image Link" onChange={handleChange} />
                                    </label>
                                </div>
                                <button className="btn btn-outline btn-primary mt-2 w-full" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>


                <div className="w-1/2 p-8 ">
                    <h2 className="text-xl font-bold">Product List</h2>
                    <ProductTableData />
                </div>
            </div>
        </>
    )
}

export default page;
