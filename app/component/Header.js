"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Header(){
    const router = useRouter();

    async function logout(){
        await fetch("/api/logout",{
            method:"POST",
        });
        router.push("/login");
    }
    return(
        <header className="bg-black text-white px-6 py-4 flex justify-between items-center">

            {/*logo */}
            <h1>
                MyProject
            </h1>

            {/*links*/}
            <nav className="flex gap-6">

                <Link href="/dashboard"
                className=" hover:text-gray-300">
                    Dashboard
                </Link>

                <Link href="/profile"
                className=" hover:text-gray-300">
                    Profile
                </Link>

                <Link href="/products"
                className="hover:text-gray-300">
                    Products
                </Link>

                <button
                onClick={logout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
                    Logout

                </button>

            </nav>

        </header>
    );
}