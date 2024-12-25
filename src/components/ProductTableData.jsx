"use client"
import { useEffect, useState } from "react";

const ProductTableData = () => {

    const [productData, setProductData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const response = await result.json();
        console.log(response);
        setProductData(response)
        getData()
    }

    const handleDelete = async (id) => {
        console.log(id);
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
            method: 'delete'
        })
        const response = await result.json();
        console.log('response', response);

    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th className="text-center p-4 border">Product</th>
                        <th className="text-center p-4 border">Type</th>
                        <th className="text-center p-4 border">Price</th>
                        <th className="text-center p-4 border">Description</th>
                        <th className="text-center p-4 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productData?.map((x) => (
                            <tr key={x._id}>
                                <td className="text-center p-4 border">{x.name}</td>
                                <td className="text-center p-4 border">{x.type}</td>
                                <td className="text-center p-4 border">{x.price}</td>
                                <td className="text-center p-4 border">{x.description}</td>
                                <td className="text-center p-4 border">
                                    <button className="btn btn-warning" onClick={() => { handleDelete(x._id) }}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>

        </>
    )
}

export default ProductTableData;