"use client";
import React, { FC, useState ,useEffect} from 'react';
import { FaUserCircle } from 'react-icons/fa';
import "../styles/globals.css";

import 'bootstrap/dist/css/bootstrap.min.css';

interface Document{
    id: number,
    name: string,
    date: string,
    image?: string,
}
const MainContent: FC = () => {
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
        const updatedDocuments = documents.filter(doc => doc.id !== id);
        setDocuments(updatedDocuments);
        setCount(count-1);
        localStorage.setItem('document',JSON.stringify(updatedDocuments));
    }
      
    
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
            <div className="w-50 max-w-[400px] ml-[50px] px-4 mt-5">
                <div className="row">
                    <div className="col-md-1 border-end">

                    </div>
                    <div className="col">
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
                
            </div>
            
            </div>
        </main>
    );
};

export default MainContent;