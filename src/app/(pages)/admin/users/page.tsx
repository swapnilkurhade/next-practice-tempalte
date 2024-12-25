'use client'
import { useEffect, useState } from "react";

const page = () => {
    interface user {
        _id: string,
        username: string,
        password: string
    }

    const [allUsers, setAllUsers] = useState<user[]>([]);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        const response = await result.json();
        setAllUsers(response.data)
    }

    const handleDelete = async (id: string) => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,{
            method : 'delete'
        });
        const response = await result.json();
        getData()
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th className="text-center p-4 border">User Name</th>
                        <th className="text-center p-4 border">Password</th>
                        <th className="text-center p-4 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers?.map((x) => (
                            <tr key={x._id}>
                                <td className="text-center p-4 border">{x.username}</td>
                                <td className="text-center p-4 border">{x.password}</td>
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


export default page;