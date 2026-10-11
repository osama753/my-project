import connectDB from "@/app/lib/db";
import User from "@/app/lib/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(){

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value

    if(!token){
        return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 }
        );
    }

    let decoded;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }catch{
        return NextResponse.json(
            { message: "Invalid token" },
            { status: 401 }
        );
    }

    await connectDB();

    const user = await User.findById(decoded.id).select("-password");

    return NextResponse.json(user);

}