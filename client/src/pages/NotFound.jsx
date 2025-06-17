import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="mb-4">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link to="/" className="text-blue-500 hover:underline">
                ← Return to homepage
            </Link>
        </div>
    );
}
