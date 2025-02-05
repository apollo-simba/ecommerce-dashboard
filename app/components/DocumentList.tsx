"use client";
import { useState,useEffect } from "react";
import "../styles/globals.css";


interface Document{
    id: number,
    name: string,
    date: string,
    image?: string,
}

const DocumentList =()=>{
    const [documents, setDocuments] = useState<Document[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
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
        // setCount(count-1);
        localStorage.setItem('document',JSON.stringify(updatedDocuments));
    };
    useEffect(()=>{
            const storedDocuments = JSON.parse(localStorage.getItem('document')||'[]');
            setDocuments(storedDocuments);
                // setCount(storedDocuments.length);
        },[]);
    return(
        <div className="db">

        
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
                            <td style={{
                                display:'flex',
                                justifyContent:'space-between',
                                
                            }}>
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


    </div>
    )
}
export default DocumentList;