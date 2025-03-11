import { NextResponse } from 'next/server';
import connect from '@/lib/data';
import Content from '@/models/content';
import jwt from 'jsonwebtoken';

export async function GET() {
    try {
        await connect();
        const contents = await Content.find();
        return NextResponse.json({ contents });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        const token = request.headers.get("token");
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        interface JwtPayloadWithId extends jwt.JwtPayload {
            id: string;
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayloadWithId;
        if (!decodedToken) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const userId = decodedToken.id;
        await connect();
        const body = await request.json();
        if (!body) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }
        const content = await new Content({
            ...body
            ,user:userId
        });
        await content.save();
        return NextResponse.json({ message: "Content created successfully",content }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
    
}
export async function PATCH(request: Request) {
    try {
        await connect();
        const body = await request.json();
        if (!body.id) {
            return NextResponse.json({ message: "Content id is required" }, { status: 400 });
        }
        const content = await Content.findByIdAndUpdate(body.id, {
            ...body
        }, { new: true });
        return NextResponse.json({ message: "Content updated successfully",content }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE (request: Request) {
    try {
        await connect();
        const body = await request.json();
        if (!body.id) {
            return NextResponse.json({ message: "Content id is required" }, { status: 400 });
        }
        const content = await Content.findByIdAndDelete(body.id);
        return NextResponse.json({ message: "Content deleted successfully",content }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}