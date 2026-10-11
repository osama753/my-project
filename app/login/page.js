"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";  

export default function LoginPage(){

    const router = useRouter();

    const [form, setForm] = useState({
        email:"",
        password:"",
    });

    const [error, setError] = useState("");

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e){
        e.preventDefault();
        
        const res = await fetch("/api/login",{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        if(!res.ok){
            setError(data.message);
            return;
        }

        router.push("/dashboard");
    }

    return(
        <main className="min-h-screen flex items-center justify-center">
            <form 
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow w-96"
            >
                <h1 className="text-2xl font-bold mb-4">
                    Login
                    </h1>

                <input 
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                className="border p-2 w-full mb-3"
                />

                <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="border p-2 w-full mb-3"
                />

                <button className="bg-black text-white w-full p-2">
                    Login

                </button>
                {error && (
                    <p className="mt-3 text-red-500 text-center">
                        {error}
                    </p>
                )}

            </form>

        </main>
    );
}