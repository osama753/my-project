import connectDB from "@/app/lib/db";
import User from "@/app/lib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req){
    try{
        const {email, password } = await req.json();
        if(!email || !password){
            return NextResponse.json(
                {message:"All Fieled required"},
                {status:400}
            );
        }

        await connectDB();

        const user = await User.findOne ({email}) ;
        if(!user){
            return NextResponse.json(
                {message: "Invalid credentials" },
                {status:401}
            );
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            return NextResponse.json(
                {message:"Invalid credentials"},
                {status:401}
            );
        }

        const token = jwt.sign(
            { id: user._id},
            process.env.JWT_SECRET,
            { expiresIn:"7d" }
        );
        const cookieStore = await cookies();

        cookieStore.set("token", token, {
        httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 *7,
        });

        return NextResponse.json({
            message: "Login success",
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });


    }catch (err){
        return NextResponse.json(
            {message: "Server error" },
            {status: 500 }
        );
    }
}
