import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/contact";
import { NextRequest,NextResponse } from "next/server";
import mongoose from "mongoose";
import { NextApiRequest,NextApiResponse } from "next";

interface ContactRequestBody {
    id: number,
    fullname: string;
    email: string;
    message: string;
}

interface ValidationError {
    [key: string]: { message: string };
}

export async function GET(): Promise<Response> {
    try {
        await connectDB();
        const data = await Contact.find();
        return NextResponse.json({
            data: data,
            success: true,
        });
    }
    catch (error: unknown) {
        return NextResponse.json({ msg: ["Unable to send message."], });
    }
}


export async function POST(req: Request): Promise<Response> {
    const { fullname, email, message }: ContactRequestBody = await req.json();
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
export async function DELETE(req: Request) {
    try {
        const { email } = await req.json(); // Extract email from request body

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        await connectDB(); // Connect to MongoDB

        const deletedContact = await Contact.findOneAndDelete({ email }); // Delete by email

        if (!deletedContact) {
            return NextResponse.json({ message: "Contact not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Contact deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting contact", error }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await connectDB();
        const { email, fullname } = await req.json();

        if (!email || !fullname) {
            return NextResponse.json({ error: "Missing email or fullname" }, { status: 400 });
        }

        const updatedContact = await Contact.findOneAndUpdate(
            { email },
            { fullname },
            { new: true } // Ensure we get the updated document
        );

        if (!updatedContact) {
            return NextResponse.json({ error: "Contact not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Contact updated", data: updatedContact });
    } catch (error) {
        console.error("Error updating contact:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}