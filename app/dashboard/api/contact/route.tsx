import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/contact";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

interface ContactRequestBody {
    fullname: string;
    email: string;
    message: string;
}

interface ValidationError {
    [key: string]: { message: string };
}

export async function POST(req: Request): Promise<Response> {
    const {fullname, email, message }: ContactRequestBody = await req.json();
    try {
        await connectDB();
        await Contact.create({ fullname, email, message });
        return NextResponse.json({
            msg: ["Message sent successfully"],
            success: true,
        });
    } catch (error: unknown) {
        if (error instanceof mongoose.Error.ValidationError) {
            const errorList: string[] = Object.values(error.errors).map(
                (err) => err.message
            );
            console.error(errorList);
            return NextResponse.json({ msg: errorList });
        } else {
            return NextResponse.json({
                msg: ["Unable to send message."],
            });
        }
    }
}
