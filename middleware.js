import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request){
    const token = request.cookies.get("token");

    if(!token){
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }


}

export const config = {
    matcher: ["/dashboard/:path*" , "/profile/:path*" , "/products/:path*"],
};