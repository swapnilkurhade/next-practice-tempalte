'use client'
import { useEffect, useRef, useState } from "react";

const TableTemplete = ({ data, handleDelete }: any) => (
    <table className="table">
        <thead>
            <tr>
                <th className="text-center p-4 border">User Name</th>
                <th className="text-center p-4 border">Password</th>
                <th className="text-center p-4 border">Action</th>
            </tr>
        </thead>
        <tbody>
            {
                data?.map((x: any) => (
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
)


const page = () => {
    interface user {
        _id: string,
        username: string,
        password: string
    }

    const [allUsers, setAllUsers] = useState<user[]>([]);
    const [allAdmin, setAllAdmin] = useState<user[]>([]);

    const modalRef = useRef<HTMLDialogElement>(null);

    const [userPayload, setUserPayload] = useState({
        username: '', password: '', isAdmin: false
    })

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        const response = await result.json();

        const customers = response.data.filter((x: any) => x.isAdmin == false)
        const admins = response.data.filter((x: any) => x.isAdmin == true)

        setAllUsers(customers)
        setAllAdmin(admins)
    }

    const handleDelete = async (id: string) => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
            method: 'delete'
        });
        await result.json();
        getData()
    }

    const openModal = () => { modalRef.current?.showModal() }
    const closeModal = () => { modalRef.current?.close() }

    const changeUser = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        if (e.target.name == 'isAdmin') {
            setUserPayload({ ...userPayload, [e.target.name]: e.target.value == 'admin' ? true : false })
        } else {
            setUserPayload({ ...userPayload, [e.target.name]: e.target.value })
        }
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userPayload)
        })
        closeModal()
        getData()
    }

    return (
        <>
            <div className="text-right mt-2 mx-4">
                <button className="btn btn-primary" onClick={openModal}>Add User</button>
            </div>

            <dialog id="add-user-dialog" className="modal modal-bottom sm:modal-middle" ref={modalRef}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create a new User</h3>
                    <form onSubmit={(e) => { handleSave(e) }}>
                        <label className="form-control w-full">
                            <span className="label label-text">User Name</span>
                            <input type="text" placeholder="Enter Username" className="input input-bordered w-full" name="username" onChange={changeUser} />
                        </label>
                        <label className="form-control w-full">
                            <span className="label label-text">Password</span>
                            <input type="text" placeholder="Enter Password" className="input input-bordered w-full" name="password" onChange={changeUser} />
                        </label>
                        <label className="form-control w-full">
                            <span className="label label-text">User Type</span>
                            <select className="select select-bordered w-full" name="isAdmin" onChange={changeUser}>
                                <option disabled>Select User type</option>
                                <option value={'customer'}>Customer</option>
                                <option value={'admin'}>Admin</option>
                            </select>
                        </label>
                        <div className="modal-action">
                            <button type="button" className="btn btn-error" onClick={closeModal}>Close</button>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                    </form>
                </div>
            </dialog>

            <div className="m-5">
                <div role="tablist" className="tabs tabs-bordered">
                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Customers" defaultChecked />
                    <div role="tabpanel" className="tab-content pt-5">
                        <TableTemplete data={allUsers} handleDelete={handleDelete} />
                    </div>
                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Admin" />
                    <div role="tabpanel" className="tab-content pt-5">
                        <TableTemplete data={allAdmin} handleDelete={handleDelete} />
                    </div>
                </div>
            </div>

        </>
    )
}


export default page;