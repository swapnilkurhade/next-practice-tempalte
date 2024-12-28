"use client"
import "./globals.css";
import { CartProvider, useCart } from '../context/cartContext.js'
import { MainLayout } from "components/MainLayout";
import { AdminLayout } from "components/AdminLayout";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";



export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	const path = usePathname();
	const isAdmin = path.startsWith("/admin");

	const router = useRouter();

	useEffect(() => {

		const isAuthenticated = localStorage.getItem('user');
		const admin = isAuthenticated && JSON.parse(isAuthenticated).isAdmin;
		
		if (!isAuthenticated && path !== '/login') {
		  router.push('/login'); 
		}

		if(!admin && isAdmin ){
			router.push('/'); 
		}

	}, [router]);


	return (
		<CartProvider>

			{
				isAdmin ? <AdminLayout children={children} /> : <MainLayout children={children} />
			}
		</CartProvider>
	);
}
