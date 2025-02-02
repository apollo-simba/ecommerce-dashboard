'use client';
import React, { useState, ChangeEvent } from 'react';

type ListItem = {
    id: number;
    value: string;
};

const App: React.FC = () => {
    const [userInput, setUserInput] = useState<string>('');
    const [list, setList] = useState<ListItem[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    // Set a user input value
    const updateInput = (value: string) => {
        setUserInput(value);
    };

    // Add or edit item
    const handleAction = () => {
        if (userInput.trim() === '') return; // Avoid adding empty items

        if (editIndex !== null) {
            // Edit existing item
            const updatedList = list.map((item, index) =>
                index === editIndex ? { ...item, value: userInput } : item
            );
            setList(updatedList);
            setEditIndex(null); // Reset edit mode
        } else {
            // Add new item
            const newItem: ListItem = {
                id: Math.random(), // Consider using a more reliable ID generator
                value: userInput,
            };
            setList([...list, newItem]);
        }

        setUserInput(''); // Clear input field
    };

    // Function to delete item from list using id to delete
    const deleteItem = (id: number) => {
        const updatedList = list.filter((item) => item.id !== id);
        setList(updatedList);
    };

    // Function to enable editing mode
    const startEdit = (index: number) => {
        setUserInput(list[index].value);
        setEditIndex(index); // Set the index of the item to be edited
    };

    return (
        <div
            style={{
                fontFamily: 'Arial, sans-serif',
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    color: 'green',
                }}
            >
                Geeksforgeeks
            </div>
            <div
                style={{
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                }}
            >
                TODO LIST
            </div>
            <div
                style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
            >
                <input
                    style={{
                        fontSize: '1.2rem',
                        padding: '10px',
                        marginRight: '10px',
                        flexGrow: '1',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                    placeholder={editIndex !== null ? "Edit item..." : "Add item..."}
                    value={userInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateInput(e.target.value)}
                />
                <button
                    style={{
                        fontSize: '1.2rem',
                        padding: '10px 20px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                    onClick={handleAction}
                >
                    {editIndex !== null ? 'Update' : 'ADD'}
                </button>
            </div>
            <div
                style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}
            >
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <ul
                            key={item.id} // Use the unique id as the key
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '10px',
                            }}
                        >
                            <li style={{ fontSize: '1.2rem', flexGrow: '1' }}>
                                {item.value}
                            </li>
                            <li>
                                <button
                                    style={{
                                        padding: '10px',
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        marginRight: '10px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => deleteItem(item.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    style={{
                                        padding: '10px',
                                        backgroundColor: '#2196f3',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => startEdit(index)}
                                >
                                    Edit
                                </button>
                            </li>
                        </ul>
                    ))
                ) : (
                    <div
                        style={{ textAlign: 'center', fontSize: '1.2rem', color: '#777' }}
                    >
                        No items in the list
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;


