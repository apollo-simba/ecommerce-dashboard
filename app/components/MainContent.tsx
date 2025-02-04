"use client";
import React, { FC, useState ,useEffect,ChangeEvent} from 'react';
import { FaUserCircle } from 'react-icons/fa';
import "../styles/globals.css";
import "@/app/styles/main.css";
import 'bootstrap/dist/css/bootstrap.min.css';





interface Document{
    id: number,
    name: string,
    date: string,
    image?: string,
}

interface Contact {
    fullname: string,
    email: string,
    message: string,
}

const MainContent: FC = () => {
    const [isEditThis , setIsEditThis] = useState<string | null>(null);
    const [editFullname, setEditFullname] = useState<string>('');
    const[count, setCount] = useState<number>(0);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    useEffect(()=>{
        const storedDocuments = JSON.parse(localStorage.getItem('document')||'[]');
        setDocuments(storedDocuments);
            setCount(storedDocuments.length);
    },[]);
    const filteredDocuments = documents.filter(document =>
        document.name.toLowerCase()
    );
    const handleView =(id:number)=>{
        const document = documents.find(doc => doc.id === id) || null;
        setSelectedDocument(document);
        setShowModal(true);
    };
    const handleDelete =(id:number)=>{
        console.log('this button clicked');
        const updatedDocuments = documents.filter(doc => doc.id !== id);
        setDocuments(updatedDocuments);
        setCount(count-1);
        localStorage.setItem('document',JSON.stringify(updatedDocuments));
    }
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
   
   
    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Dashboard</h1>
                    <ul className="breadcrumb">
                        <li><a href="#">Dashboard</a></li>
                        <li><i className="bx bx-chevron-right"></i></li>
                        <li><a className="active" href="#">Home</a></li>
                    </ul>
                </div>
                <a href="#" className="btn-download">
                    <i className="bx bxs-cloud-download"></i>
                    <span className="text">Download Report</span>
                </a>
            </div>

            <ul className="box-info">
                <li>
                    <i className="bx bxs-cart"></i>
                    <span className="text">
                        <h3>{count}</h3>
                        <button >New Orders</button>
                        
                    </span>
                </li>
                <li>
                    <i className="bx bxs-user-check"></i>
                    <span className="text">
                        <h3>389</h3>
                        <p>Customers</p>
                    </span>
                </li>
                <li>
                    <i className="bx bxs-dollar"></i>
                    <span className="text">
                        <h3>$43,570</h3>
                        <p>Total Revenue</p>
                    </span>
                </li>
            </ul>
            <div className="w-full max-w-[1800px] ml-[40px] mr-[40px] px-4 mt-5 ">
                <div >
                    <div className="col-md-1-  border-end">

                    </div>
                    <div className="db" >
                        <div className="first-part">
                            <h2>Document List</h2>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDocuments.map((document)=>(
                                        <tr key={document.id}>
                                            <td>{document.id}</td>
                                            <td>{document.name}</td>
                                            <td>{document.date}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={()=>handleView(document.id)}>
                                                    View
                                                </button>
                                            
                                                <button className="btn btn-primary" onClick={()=>handleDelete(document.id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>   
                            </table>
                        </div>
                    
                        {showModal && selectedDocument && (
                            <div className="modal" tabIndex={-1} role="dialog" style={{
                                display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)'
                            }}>
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title">{selectedDocument.name}</h1>
                                            <button type="button" className="close"
                                                onClick={() => setShowModal(false)}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {selectedDocument.image && (
                                                <img src={selectedDocument.image} alt="Document"
                                                    className="img-fluid" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <form >

        
                        <div className="w-full max-w-[1000px]  px-4 mr-[300px]">
                                <div className="second-part">
                                    <div className="col-md-1 border-end"></div>

                                    <div className="col">
                                    <h2>Data List</h2>
                                    <table className="table">
                                
                                        <thead>
                                            <tr>
                                                
                                                <th>Fullname</th>
                                                <th>Email</th>
                                                <th>Message</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {content.map((document, index)=>(
                                                <tr key={index}>
                                                    
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
                        
                </div>
                
            </div>
            
            </div>
            
        </main>
    );
};

export default MainContent;