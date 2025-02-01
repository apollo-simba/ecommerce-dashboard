"use client";
import React, { useState, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/app/components/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Document {
    id: number,
    name: string,
    description: string,
    image: string,
    date: string,
}

const AddDocument: React.FC = () => {
    const [documentName, setDocumentName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<string>('');

    const handleDocumentNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDocumentName(e.target.value);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddDocument = () => {
        if (!documentName.trim() || !description.trim() || !image) {
            toast.error('Please fill in all fields.');
            return;
        }
        
        const currentDate = new Date().toLocaleDateString();
        const existingDocuments: Document[] = JSON.parse(
            localStorage.getItem('document') || '[]'
        );
        const newDocument: Document = {
            id: existingDocuments.length + 1,
            name: documentName,
            description: description,
            image: image,
            date: currentDate,
        };

        const updatedDocuments = [...existingDocuments, newDocument];
        localStorage.setItem('document', JSON.stringify(updatedDocuments));
        setDocumentName('');
        setDescription('');
        setImage('');
        toast.success('Document added successfully.');
    };

    return (
        <>
            
            <div className="mb-3 container" style={{ width: '70%' }}>
                <label htmlFor="documentName" className="form-label">
                    Document Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="documentName"
                    value={documentName}
                    onChange={handleDocumentNameChange}
                />
                <label htmlFor="description" className="form-label mt-3">
                    Description
                </label>
                <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <label htmlFor="image" className="form-label mt-3">
                    Select Image
                </label>
                <input
                    type="file"
                    className="form-control"
                    id="image"
                    onChange={handleImageChange}
                />
                <button className="btn btn-primary mt-3" onClick={handleAddDocument}>
                    Add Document
                </button>
            </div>
            <ToastContainer />
        </>
    );
};

export default AddDocument;
