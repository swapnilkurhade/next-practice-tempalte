'use client'
import { useEffect, useState } from "react";

const page = () => {
    interface user {
        _id: string,
        userDetails: {
            username : string
        },
        total_price : string,
        payment_status : boolean,
        cartDetails : {
            items : []
        }
    }

    const [allOrders, setAllOrders] = useState<user[]>([]);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`);
        const response = await result.json();
        console.log(response.data[0]);
        
        setAllOrders(response.data)
    }

  

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th className="text-center p-4 border">User Name</th>
                        <th className="text-center p-4 border">Total Items</th>
                        <th className="text-center p-4 border">Total</th>
                        <th className="text-center p-4 border">Payment Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allOrders?.map((x) => (
                            <tr key={x._id}>
                                <td className="text-center p-4 border">{x.userDetails.username}</td>
                                <td className="text-center p-4 border">{x.cartDetails.items.length}</td>
                                <td className="text-center p-4 border">{x.total_price}</td>
                                <td className="text-center p-4 border">{x.payment_status ? 'Done' : 'Pending'}</td>
                                

                                
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </>
    )
}


export default page;