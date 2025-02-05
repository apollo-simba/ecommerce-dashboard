"use client";
import { useState,useEffect, FC } from "react";
import "../styles/globals.css";
import "@/app/styles/main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { document } from "postcss";

interface Document{
    id: number,
    name: string,
    date: string,
    image?: string,
}

interface Contact {
    id:number,
    fullname: string,
    email: string,
    message: string,
}



const DataList:FC =()=>{
    const [id , setId] = useState<number>(0);
    const [isEditThis , setIsEditThis] = useState<string | null>(null);
    const [editFullname, setEditFullname] = useState<string>('');
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
                console.log('this content is array')
                setContent(data.data);
               
            }else{
                console.log('Expected Array but got:',data);
                setContent([]);
            } 
        }   catch (error) {
            console.error("Error fetching contact history:", error);
            setContent([]);
            }
        };
        useEffect(() => {
            getContactHistory();
                
        },[]);  
        const deleteEvent = async(email:string) => {
            console.log('this event happened.');
            try {
                const resp = await fetch("dashboard/api/contact", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });
                console.log('this stage happened.');
                if (!resp.ok) {
                    throw new Error(`Error: ${resp.status}`);
                }
        
                console.log("Delete request successful.");
                setContent((prevContent) => prevContent.filter(item => item.email !== email));
                console.log("Updated content:", content); // This may show stale data due to async updates
            } catch (error) {
                console.error("Error deleting contact:", error);
            }
        };
        const handleEdit = (email: string, currentFullname: string) => {
            setIsEditThis(email);
            setEditFullname(currentFullname);
        };
    
        // Handle updating the data
        const updateData = async (email: string) => {
            try {
                const resp = await fetch("dashboard/api/contact", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },//tells the server that the request body contains JSON data.
                    body: JSON.stringify({ email, fullname: editFullname }),
                });//converts the Javascript object {email,fullname:editFullname} into a JSON string.
                //so resp variable is assigned the value-updatedData from MongoDB.
                if (!resp.ok) {
                    const errorData = await resp.json();
                    throw new Error(`Error: ${resp.status} - ${errorData.error}`);
                }
        
                console.log("Update successful");
        
                // Fetch updated data from MongoDB
                await getContactHistory();// sends updatedData to MongoDB again.s
        
                setIsEditThis(null);
            } catch (error) {
                console.error("Error updating contact:", error);
            }
        };
        
        const cancelEdit = () => {
            setIsEditThis(null);
        };
       

    return(

        <form >
            <div className="w-full max-w-[1000px]  px-4 mr-[200px]">
                    <div className="second-part">
                        <div className="col-md-1 border-end"></div>

                        <div className="col">
                        <h2>Data List</h2>
                        <table className="table">
                    
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fullname</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {content.map((document, index)=>(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        
                                        <td>
                                            {isEditThis === document.email ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={editFullname}
                                                        onChange={(e) => setEditFullname(e.target.value)}
                                                    />
                                                    <button 
                                                    style={{
                                                        padding: '10px',
                                                        backgroundColor: '#f44336',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '8px',
                                                        marginLeft: '10px',
                                                        cursor: 'pointer',
                                                    }}
                                                        className="btn btn-success" 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            updateData(document.email);
                                                        }}
                                                    >
                                                        Save
                                                    </button>
                                                    <button 
                                                        className="btn btn-secondary" 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            cancelEdit();
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    {document.fullname}
                                                    <button 
                                                    style={{
                                                        padding: '10px',
                                                        backgroundColor: 'blue',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '8px',
                                                        marginLeft: '10px',
                                                        cursor: 'pointer',
                                                    }}
                                                        className="btn btn-primary" 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleEdit(document.email, document.fullname);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    
                                                </>
                                            )}
                                            
                                        </td>
                                        <td >
                                        {document.email}
                                        </td>
                                        <td>{document.message}</td>
                                        <td>
                                            <button className="btn btn-primary" type="button" onClick={()=>deleteEvent(document.email)}>Delete</button>
                                        </td>
                                        
                                    </tr>
                                ))}

                            </tbody> 
                            
                        </table>
                        
                    </div>
                </div>
            </div>
        </form>

        
    )
}
export default DataList;