"use client"

const page = () => {

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <>
            <div >
                <form onSubmit={handleSave}>
                    <div className="flex flex-col">
                        <label htmlFor="name">Name</label>
                        <input className="p-2 border focus:outline-none" id="name" type="text" placeholder="Enter Name"></input>
                    </div>

                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Search" />

                    </label>
                    <label className="input input-bordered flex items-center gap-2">

                        <input type="text" className="grow" placeholder="Email" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">

                        <input type="text" className="grow" placeholder="Username" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">

                        <input type="password" className="grow" />
                    </label>

                </form>

            </div>
        </>
    )
}

export default page;
