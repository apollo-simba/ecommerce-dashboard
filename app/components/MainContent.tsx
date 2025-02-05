"use client";
import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import "../styles/globals.css";
import "@/app/styles/main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from './head';
import DocumentList from './DocumentList';
import DataList from './DataList';


interface Document {
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
    const [isEditThis, setIsEditThis] = useState<string | null>(null);
    const [editFullname, setEditFullname] = useState<string>('');
    const [count, setCount] = useState<number>(0);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [content, setContent] = useState<Contact[]>([]);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    useEffect(() => {
        const storedDocuments = JSON.parse(localStorage.getItem('document') || '[]');
        setDocuments(storedDocuments);
        setCount(storedDocuments.length);
    }, []);
    const filteredDocuments = documents.filter(document =>
        document.name.toLowerCase()
    );
    const handleView = (id: number) => {
        const document = documents.find(doc => doc.id === id) || null;
        setSelectedDocument(document);
        setShowModal(true);
    };
    const handleDelete = (id: number) => {
        console.log('this button clicked');
        const updatedDocuments = documents.filter(doc => doc.id !== id);
        setDocuments(updatedDocuments);
        setCount(count - 1);
        localStorage.setItem('document', JSON.stringify(updatedDocuments));
    }


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

            if (Array.isArray(data.data)) {

                setContent(data.data);
            } else {
                console.log('Expected Array but got:', data);
                setContent([]);
            }
        } catch (error) {
            console.error("Error fetching contact history:", error);
            setContent([]);
        }
    };
    useEffect(() => {
        getContactHistory();

    }, []);
    const deleteEvent = async (email: string) => {
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
            <Head />
            <div className="w-full max-w-[1800px] ml-[40px] mr-[40px] px-4 mt-5 ">
                <div >
                    <div className="col-md-1-  border-end">

                    </div>
                    <div className="db" >
                        <DocumentList />
                        <DataList />

                    </div>

                </div>

            </div>

        </main>
    );
};

export default MainContent;