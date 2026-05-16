import React, { useState } from "react";
import { Author } from "../types";

interface Props {
    author: Author[];
    onToggle: (author: Author) => void;
    onDelete: (id: number) => void;
}

const Authorlist: React.FC<Props> = ({ author, onToggle, onDelete }) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState<string>("");
    const [editFirstName, setEditFirstName] = useState<string>("")
    const [editLastName, setEditLastName] = useState<string>("")

    const handleEdit = (author: Author) => {
        setEditingId(author.id);
        setEditFirstName(author.first_name);
        setEditLastName(author.last_name);
    };

    const handleSave = (author: Author) => {
        onToggle({
            ...author,
            first_name: editFirstName,
            last_name: editLastName
        });
        setEditingId(null);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditFirstName("")
        setEditLastName("")
    };

    return (
        <ul>
            {author.map((author) => (
                <li key={author.id} style={{ marginBottom: "10px" }}>
                    {editingId === author.id ? (
                        <>
                            <input
                                type="text"
                                value={editFirstName}
                                onChange={(e) => setEditFirstName(e.target.value)}
                                style={{ marginRight: "10px" }}
                            />
                            <input
                                type="text"
                                value={editLastName}
                                onChange={(e) => setEditLastName(e.target.value)}
                                style={{ marginRight: "10px" }}
                            />
                            <button onClick={() => handleSave(author)} style={{ marginRight: "5px" }}>
                                Save
                            </button>
                            <button onClick={handleCancel}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <span
                                style={{
                                    marginRight: "10px",
                                }}
                            >
                                {author.first_name} {author.last_name}
                            </span>
                            <button onClick={() => handleEdit(author)} style={{ marginRight: "5px" }}>
                                Edit
                            </button>
                            <button onClick={() => onDelete(author.id)}>Delete</button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default Authorlist;

