import jwt from "jsonwebtoken";
import {  NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function tokenToName(userType: string) {
    const cookieStore = cookies();
    const userToken = (await cookieStore).get(`${userType}Token`)?.value;
    if (!userToken) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(userToken, process.env.JWT_SECRET!);
    console.log("Decoded userToken from buyCourse route:", decoded);
return decoded
}