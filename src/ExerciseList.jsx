import { Link } from "react-router-dom";

function ExerciseList({ exercises }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-2xl">
            {exercises.length > 0 ? (
                exercises.map((exercise) => (
                    <article key={exercise.id} className="bg-white p-4 rounded shadow-md">
                        <h1 className="font-bold text-xl mb-2">{exercise.title}</h1>
                        <p className="mb-4 text-gray-700">{exercise.muscles}</p>
                        <div className="flex flex-col space-y-2">
                            {/* Link to specific exercise details */}
                            <Link
                                to={`/exercises/${exercise.id}`}
                                className="font-bold text-blue-600 hover:underline"
                            >
                                Exercise Details
                            </Link>
                        </div>
                    </article>
                ))
            ) : (
                <p className="text-center text-gray-600">No exercises available.</p>
            )}
        </div>
    );
}

export default ExerciseList;
