import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function ExerciseDetails() {
    const { id } = useParams(); // Get the exercise ID from the URL
    const navigate = useNavigate(); // For navigation after delete
    const [exercise, setExercise] = useState(null);
    const [error, setError] = useState(null);

    // Fetch the specific exercise details
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
            setExercise(data);
        } catch (error) {
            setError(error.message);
        }
    };

    // Handle delete request
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this exercise?")) {
            try {
                const response = await fetch(`http://145.24.223.114:8001/exercises/${id}`, {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to delete the exercise");
                }

                alert("Exercise deleted successfully.");
                navigate("/exercises"); // Redirect to the exercise list page
            } catch (error) {
                console.error("Error deleting exercise:", error);
                alert("An error occurred while trying to delete the exercise.");
            }
        }
    };

    useEffect(() => {
        fetchExerciseDetails();
    }, [id]);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!exercise) {
        return <p>Loading exercise details...</p>;
    }

    return (
        <div className="p-6 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">{exercise.title}</h1>
            <p className="text-gray-500">{exercise.muscles}</p>
            <p className="mb-4 text-gray-700">{exercise.description}</p>

            {/* Delete Button */}
            <button
                onClick={handleDelete}
                className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
                Delete Exercise
            </button>

            {/* Edit Button */}
            <Link
                to={`/exercises/${id}/edit`}
                className="mt-6 ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 inline-block"
            >
                Edit Exercise
            </Link>
        </div>
    );
}

export default ExerciseDetails;
