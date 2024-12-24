"use client"
import "./globals.css";
import { CartProvider, useCart } from '../context/cartContext.js'
import { MainLayout } from "components/MainLayout";
import { AdminLayout } from "components/AdminLayout";
import { usePathname } from "next/navigation";


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	const path = usePathname();
	const isAdmin = path.startsWith("/admin");

	return (
		<CartProvider>

			{
				isAdmin ? <AdminLayout children={children} /> : <MainLayout children={children} />
			}
		</CartProvider>
	);
}
