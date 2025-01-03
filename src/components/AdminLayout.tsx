import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "./Navbar";
import { useRouter } from "next/navigation";



const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {

    const router = useRouter();

    const handleOut = () => {
		localStorage.removeItem('user');
		router.push('/')
	}

    return (
        <>
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <div className="flex ">
                        <aside className="w-64 h-screen fixed bg-gray-800 text-gray-100">
                            <div className="p-4 text-xl font-bold border-b border-gray-700">
                                Admin Panel
                            </div>
                            <nav className="mt-4 space-y-2">
                                <a
                                    href="/admin"
                                    className="block px-4 py-2 text-gray-100 hover:bg-gray-700"
                                >
                                    Dashboard
                                </a>
                                <a
                                    href="/admin/users"
                                    className="block px-4 py-2 text-gray-100 hover:bg-gray-700"
                                >
                                    Users
                                </a>
                                <a
                                    href="/admin/orders"
                                    className="block px-4 py-2 text-gray-100 hover:bg-gray-700"
                                >
                                    Orders
                                </a>
                                <a
                                    href="/admin/settings"
                                    className="block px-4 py-2 text-gray-100 hover:bg-gray-700"
                                >
                                    Settings
                                </a>
                            </nav>
                        </aside>
                        <div className="flex flex-col flex-1  ml-64">
                            <header className="flex items-center justify-between p-4 bg-gray-100 shadow-md ">
                                <h1 className="text-lg font-bold">Admin Panel</h1>
                                <button className="px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded hover:bg-gray-300" onClick={handleOut}>
                                    Logout
                                </button>
                            </header>
                            <main className="flex-1 p-4 bg-gray-50">{children}</main>
                        </div>
                    </div> 
                </body>
            </html>
        </>
    )
}



