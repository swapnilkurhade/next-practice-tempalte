"use client"
import { useCart } from 'context/cartContext'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {

    const {setUserData , fetchTopCartData } = useCart()
    const router = useRouter()
    const [userData, setUserDaata] = React.useState({
        'username':'', 'password':''
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setUserDaata({...userData, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        submitData(userData)
    }

    const submitData = async (userData:Object) =>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signin`,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(userData)
        })

        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user[0]) );
        setUserData(user[0])
        router.push('/');
        fetchTopCartData();
    }

    return (
        <div className='h-screen bg-gray-100 flex items-center justify-center'>

            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" id="username" name="username" required className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Username" onChange={handleChange}></input>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" required className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="********" onChange={handleChange}></input>
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Login</button>
                </form>
            </div>

        </div>
    )
}

export default page
