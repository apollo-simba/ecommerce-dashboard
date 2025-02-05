"use client";

import { useState, FormEvent } from "react";

interface ContactResponse {
    msg: string;
    success: boolean;
}

export default function ContactForm() {
    const [id, setId] = useState<number>(0);
    const [fullname, setFullname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const res = await fetch("api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    fullname,
                    email,
                    message,
                }),
            });
            
            if (!res.ok) {
                throw new Error("Failed to send the message.");
                
            }
            const { msg, success }: ContactResponse = await res.json();
            setError(msg);
            setSuccess(success);
            if (success) {
                setFullname("");
                setEmail("");
                setMessage("");
            }
        } catch (error: unknown) {
            const errMsg =
                error instanceof Error ? error.message : "An unknown error occurred.";
            setError(errMsg);
            setSuccess(false);
        }
    };
    
    return (
        <>
            <form   
                onSubmit={handleSubmit}
                className="py-4 mt-4 border-t flex flex-col gap-5"
            >
                <div>
                    <label htmlFor="fullname">Full Name</label>
                    
                    <div>
                    <input
                        onChange={(e) => setFullname(e.target.value)}
                        value={fullname}
                        type="text"
                        id="fullname"
                        placeholder="John Doe"
                    />
                    </div>
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <div>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        id="email"
                        placeholder="john@gmail.com"
                    />

                    </div>
                </div>

                <div>
                    <label htmlFor="message">Your Message</label>
                    <div>
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        className="h-32 w-64"
                        id="message"
                        placeholder="Type your message here..."
                    ></textarea>

                    </div>
                </div>

                <button
                    className="bg-green-700 p-3 text-white font-bold"
                    type="submit"
                    
                >
                    Send
                </button>
            </form>

            <div className="bg-slate-100 flex flex-col">
                {error && (
                    <div
                        className={`${
                            success ? "text-green-800" : "text-red-600"
                        } px-5 py-2`}
                    >
                        {error}
                    </div>
                )}
            </div>
        </>
    );
};
