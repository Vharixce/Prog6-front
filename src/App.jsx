import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import About from "./About.jsx";
import ExerciseList from "./ExerciseList.jsx";
import ExerciseCreateForm from "./ExerciseCreateForm.jsx";
import ExerciseDetails from "./ExerciseDetails.jsx";
import ExerciseEditForm from "./ExerciseEditForm.jsx"; // Import the new edit form
import React, { useEffect, useState } from "react";

function App() {
    const [exercises, setExercises] = useState([]);

    // Fetch exercises data
    const fetchExercises = async () => {
        try {
            const response = await fetch("http://145.24.223.114:8001/exercises/", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });

            const data = await response.json();
            setExercises(data.items || []); // Handle cases where `items` might not exist
        } catch (error) {
            console.error("Error fetching exercises:", error);
        }
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    // Define routes
    const router = createBrowserRouter([
        {
            element: <Layout />,
            children: [
                { path: "/", element: <Home /> },
                { path: "/about", element: <About /> },
                {
                    path: "/exercises",
                    element: (
                        <ExerciseList
                            exercises={exercises}
                            refreshExercises={fetchExercises}
                        />
                    ),
                },
                {
                    path: "/exercises/create",
                    element: <ExerciseCreateForm newItemCreated={fetchExercises} />,
                },
                {
                    path: "/exercises/:id",
                    element: <ExerciseDetails />,
                },
                {
                    path: "/exercises/:id/edit", // Add the edit route
                    element: <ExerciseEditForm />,
                },
            ],
        },
    ]);

    return (
        <div className="min-h-screen bg-blue-300 py-12 px-6">
            <h1 className="text-4xl font-semibold text-center text-gray-900 mb-8">
                MOOSCLAYS
            </h1>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
