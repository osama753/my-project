"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {

    const [products, setProducts] = useState([]);

    const [form, setForm] = useState ({
        name: "",
        description: "",
        price: "",
    });

    const [error,setError] = useState("");

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

async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/products", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
    });

    const data = await res.json();

    if(!res.ok) {
        setError(data.message);
        return;
    }

    setForm({
        name: "",
        description: "",
        price: "",
    });

    fetchProducts();
}

    return(
        <main className="p-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">
                Products
            </h1>

            <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow mb-8"
            >

                <h2 className="text-xl mb-4">
                    Add Product
                </h2>

                <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="border p-2 w-full mb-3"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="border p-2 w-full mb-3"
                />

                <input
                name="price"
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="border p-2 w-full mb-3"
                />

                <button 
                className="bg-black text-white w-full py-2"
                >
                    Add
                </button>

            </form>

        <div className="grid gap-4">

            {products.map((p) =>(
                <div
                key={p._id}
                className="border p-4 rounded"
                >
                    <h3 className="font-bold text-lg">
                        {p.name}
                    </h3>

                    <p className="text-gray-600">
                        {p.description}
                    </p>

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