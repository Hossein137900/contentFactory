import { NextResponse } from "next/server";
import connect from "@/lib/data";
import Request from "@/models/request";
import User from "@/models/user";
import jwt from "jsonwebtoken";
export async function GET(request: Request) {
    await connect();
    if (!connect) {
        return NextResponse.json({ error: "connection failed" });
    }
    try {
        const token = await request.headers.get("token");
        if (!token) {
            return NextResponse.json({ error: "Token not found" }, { status: 401 });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!||'msl');
        if (!decodedToken || typeof decodedToken !== "object") {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }
        const userId = decodedToken.id;
        const user = await Request.find({ userId: userId });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const requests = await Request.find({ userId: userId });
        return NextResponse.json(requests);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
export async function PATCH(request: Request) {
    await connect();

    if (!connect) {
        return NextResponse.json({ error: "connection failed" });
    }
    try {
        const requestBody = await request.json();
        const body = requestBody.body;
        if (!body) {
            return NextResponse.json({ error: "Request body is missing" }, { status: 400 });
        }
        await Request.findByIdAndUpdate(body._id, {
            name: body.name,
            phoneNumber: body.phoneNumber,
            title: body.title,
            type: body.type,
            message: body.request,
        });
        return NextResponse.json({ message: "Request updated successfully" });}
        catch (error) {
            console.error("Error:", error);
            return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        }
    }
    export async function DELETE(request: Request) {
        await connect();

        if (!connect) {
            return NextResponse.json({ error: "connection failed" });
        }
        try {
            const requestBody = await request.json();
            const body = requestBody.body;
            await Request.findByIdAndDelete(body._id);
            return NextResponse.json({ message: "Request deleted successfully" });
        } catch (error) {
            console.error("Error:", error);
            return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        }
    }
   