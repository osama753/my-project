import connectDB from "@/app/lib/db";
import Product from "@/app/lib/models/Product";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req){
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if(!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const { name, description, price } = await req.json();

        if(!name || !description || !price) {
            return NextResponse.json(
                { message: "All fields required" },
                { status: 400}
            );
        }

        await connectDB();

        const product = await Product.create({
            name,
            description,
            price,
            user: decoded.id,
        });

        return NextResponse.json(product);

    }catch(err){
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}


export async function GET() {
    try{
        await connectDB();

        const products = await Product.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });

        return NextResponse.json(products);
    
    }catch(err){
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}