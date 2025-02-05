import { FC, useEffect, useState } from "react";

const DataList: FC = () => {
    const [content, setContent] = useState<any[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedData, setEditedData] = useState({
        fullname: "",
        email: "",
        message: "",
    });

    // Fetching data from the API
    const getContactHistory = async () => {
        try {
            const res = await fetch("dashboard/api/contact", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();

            if (Array.isArray(data.data)) {
                setContent(data.data);
            } else {
                console.log("Expected Array but got:", data);
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

    const handleEdit = (index: number, fullname: string, email: string, message: string) => {
        setEditingIndex(index);
        setEditedData({ fullname, email, message });
    };
    const saveChangedItem = async () => {
        try {
            const res = await fetch('/dashboard/api/contact', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: editedData.email,
                    fullname: editedData.fullname,
                    message: editedData.message,
                })
            })
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`Error: ${res.status} - ${errorData.error}`);
            }

            console.log("Update successful");
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    const handleSave = (index: number) => {
        const updatedContent = [...content];
        updatedContent[index] = editedData;
        console.log(updatedContent[index]);
        setContent(updatedContent); // Update the main data source
        setEditingIndex(null); // Disable editing
        saveChangedItem();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    const deleteEvent = (email: string) => {
        // Add the logic for deleting a contact based on email
        const updatedContent = content.filter((item) => item.email !== email);
        setContent(updatedContent);
    };

    return (
        <div className="w-full max-w-[1000px] px-4 mr-[200px]">
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
                            {content.map((document, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <input
                                            value={editingIndex === index ? editedData.fullname : document.fullname}
                                            disabled={editingIndex !== index}
                                            name="fullname"
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            value={editingIndex === index ? editedData.email : document.email}
                                            disabled={editingIndex !== index}
                                            name="email"
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            value={editingIndex === index ? editedData.message : document.message}
                                            disabled={editingIndex !== index}
                                            name="message"
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        {editingIndex === index ? (
                                            <button className="btn btn-success" onClick={() => handleSave(index)}>
                                                Save
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary" onClick={() => handleEdit(index, document.fullname, document.email, document.message)}>
                                                Edit
                                            </button>
                                        )}
                                        <button className="btn btn-danger" onClick={() => deleteEvent(document.email)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DataList;
