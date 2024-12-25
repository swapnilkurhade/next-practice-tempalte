"use client"
import { useEffect, useState } from "react";

const page = () => {
    interface user {
        _id: string,
        userDetails: {
            username: string
        },
        total_price: string,
        payment_status: boolean,
        cartDetails: {
            items: []
        }
    }
    const [order, setOrder] = useState<user[]>([])
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const userData = localStorage.getItem('user');
        const userId = userData && JSON.parse(userData)._id;

        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/${userId}`)
        const orders = await result.json();
        console.log(orders);
        setOrder(orders.data)
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>

                            <th className="text-center p-4 border">Sr.No.</th>
                            <th className="text-center p-4 border">Total Items</th>
                            <th className="text-center p-4 border">Total</th>
                            <th className="text-center p-4 border">Payment Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            order?.map((x, i) => (
                                <tr key={x._id}>
                                    <td className="text-center p-4 border">{i + 1}</td>
                                    <td className="text-center p-4 border">{x.cartDetails.items.length}</td>
                                    <td className="text-center p-4 border">{x.total_price}</td>
                                    <td className="text-center p-4 border">{x.payment_status ? 'Done' : 'Pending'}</td>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default page;