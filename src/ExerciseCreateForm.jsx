import React, { useState } from "react";

function ExerciseCreateForm({ newItemCreated }) {
    const [formData, setFormData] = useState({
        title: "",
        muscles: "",
        description: "",
    });
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const createExercise = async () => {
        try {
            const response = await fetch("http://145.24.223.114:8001/exercises", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Spot created:", data); // Log server response
                newItemCreated(); // Fetch updated spots
            } else {
                console.error("Error creating spot:", await response.text());
            }
        } catch (error) {
            console.error("Error creating spot:", error);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(false); // Reset success message
        createExercise();
    };

    return (
        <div>
            {success && (
                <p className="text-green-500 mb-4">Spot successfully created!</p>
            )}
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
                        muscles:
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
                        description:
                    </label>
                    <input
                        type="text"
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
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ExerciseCreateForm;
