import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ExerciseEditForm() {
    const { id } = useParams(); // Get the exercise ID from the URL
    const navigate = useNavigate(); // For redirect after successful update
    const [formData, setFormData] = useState({
        title: "",
        muscles: "",
        description: "",
    });
    const [error, setError] = useState(null);

    // Fetch existing exercise data to pre-fill the form
    const fetchExerciseDetails = async () => {
        try {
            const response = await fetch(`http://145.24.223.114:8001/exercises/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch exercise details");
            }

            const data = await response.json();
            setFormData(data); // Pre-fill the form with existing data
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchExerciseDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://145.24.223.114:8001/exercises/${id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Exercise updated successfully!");
                navigate(`/exercises/${id}`); // Redirect back to exercise details
            } else {
                throw new Error("Failed to update exercise");
            }
        } catch (error) {
            console.error("Error updating exercise:", error);
            alert("An error occurred while updating the exercise.");
        }
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md"
        >
            <div className="mb-4">
                <label htmlFor="title" className="block font-semibold mb-1">
                    Title:
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="muscles" className="block font-semibold mb-1">
                    Muscles:
                </label>
                <input
                    type="text"
                    id="muscles"
                    name="muscles"
                    value={formData.muscles}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block font-semibold mb-1">
                    Description:
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Save Changes
            </button>
        </form>
    );
}

export default ExerciseEditForm;
