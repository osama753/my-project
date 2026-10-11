"use client"

import { useEffect, useState } from "react";

    async function logout(){
        await fetch("/app/logout",{
            method: "POST",
        });

        window.location.href = "/login";
    }
    export default function Dashboard(){
        const [products, setProducts] = useState([]);

        useEffect(()=> {
                fetchProducts();
            }, []);

            async function fetchProducts(){
                const res = await fetch("/api/products");
                const data = await res.json();

                setProducts(data);
            }

            function handleChange(e){
                setForm({
                    ...form,
                    [e.target.name] : e.target.value,
                });
            }


    return(
        <main className="p-10">
            <h1 className="text-3xl font-bold">
            Dashboard
            </h1>
            <div className="grid gap-4">

            {products.map((p) =>(
                <div
                key={p._id}
                className="border p-4 rounded"
                >
                    <h3 className="font-bold text-lg">
                        {p.name}
                    </h3>


                    <p className="mt-2">
                        $ {p.price}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                        By: {p.user?.name}
                    </p>
                    </div>
            ))}
        </div>
        </main>
    )
}