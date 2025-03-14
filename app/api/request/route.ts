import { NextResponse } from 'next/server';
import connect from '@/lib/data';
import Request from '@/models/request';
import jwt from 'jsonwebtoken';
export async function GET() {
    try {
        await connect();
        const requests = await Request.find();
        return NextResponse.json({ requests });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        await connect();
       const token = request.headers.get("token")
        if (!token) {
            return NextResponse.json({ message: "Token missing" }, { status: 401 });
        }
        interface JwtPayloadWithId {
            id: string;
        }
        const decodedToken = await jwt.verify(token,process.env.JWT_SECRET!) as JwtPayloadWithId;
        console.log(decodedToken);
        const body =await request.json();
        const userId = decodedToken.id;
        if (!body) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }
        const newRequest =
        await new Request({
            ...body,
            userId
        })
        console.log(newRequest);
        await newRequest.save();
        return NextResponse.json({ message: "Request created successfully",newRequest }, { status: 201 });}
        catch (error) {
            console.log(error);
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }

    export async function PATCH(request: Request) {
        try {
            await connect();
            const body = await request.json();
            const { id, status } = body;
            if (!id || !status) {
                return NextResponse.json({ message: "All fields are required" }, { status: 400 });
            }
            const newRequest = await Request.findByIdAndUpdate(id, { status });
            return NextResponse.json({ message: "Request updated successfully",newRequest }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }

    