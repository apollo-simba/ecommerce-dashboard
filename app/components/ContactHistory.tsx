"use client";

import { useEffect, useState } from "react";

interface Contact {
    id: number,
    fullname: string,
    email: string,
    message: string,
}

export default function ContactHistory() {
    const [content, setContent] = useState<Contact[]>([]);
    
    const getContactHistory = async () => {
        try {
            const res = await fetch("dashboard/api/contact", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
            
        );
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        console.log(res);

        const data = await res.json();
        console.log(data);
        
        if(Array.isArray(data.data)){
            
            setContent(data.data);
        }else{
            console.log('Expected Array but got:',data);
            setContent([]);
        } 
    }   catch (error) {
        console.error("Error fetching contact history:", error);
        setContent([]);
        }
    }
    useEffect(() => {
        getContactHistory();
         
    },[]);

    return (
        <>
        <form onSubmit={getContactHistory}>

        
            <div className="w-50 max-w-[400px] ml-[50px] px-4 mt-5">
                    <div className="row">
                        <div className="col-md-1 border-end"></div>

                        <div className="col">
                        <h2>Data List</h2>
                        <table className="table">
                    
                            <thead>
                                <tr>
                                    
                                    <th>fullname</th>
                                    <th>email</th>
                                    <th>message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {content.map((document)=>(
                                    <tr key={document.email}>
                                        
                                        <td>{document.fullname}</td>
                                        <td>{document.email}</td>
                                        <td>{document.message}</td>
                                       
                                    </tr>
                                ))}

                            </tbody> 
                            
                        </table>
                    </div>
                </div>
            </div>
        </form>
        </>
    );
}