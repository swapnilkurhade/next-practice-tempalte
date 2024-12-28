"use client"

import { useRef, useState } from "react"
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

    const modalRef = useRef<HTMLDialogElement>(null)

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
        closeModal()
    }

    const openModal = () => { modalRef.current?.showModal() }
    const closeModal = () => { modalRef.current?.close() }

    return (
        <>
            <div className="text-right mt-2 mx-4">
                <button className="btn btn-primary" onClick={openModal}>Add Product</button>
            </div>

            <dialog id="add-user-dialog" className="modal modal-bottom sm:modal-middle" ref={modalRef}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create a New Product</h3>
                    <form onSubmit={handleSave}>
                        <div className="flex flex-col">
                            <div className="mb-1">
                                <label className="input input-bordered flex items-center  my-2">
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
                                <label className="input input-bordered flex items-center  my-2">
                                    <input type="number" name="price" placeholder="Price" onChange={handleChange} />
                                </label>
                            </div>
                            <div className="mb-1">
                                <textarea className="textarea textarea-bordered w-full" name="description" placeholder="Description" onChange={handleChange}></textarea>
                            </div>
                            <div className="mb-1">
                                <label className="input input-bordered flex items-center  my-2">
                                    <input type="url" name="img" placeholder="Image Link" onChange={handleChange} />
                                </label>
                            </div>

                            <div className="modal-action">
                                <button type="button" className="btn btn-error" onClick={closeModal}>Close</button>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </dialog>

            <div className="mt-5">
                <ProductTableData />
            </div>
        </>
    )
}

export default page;
