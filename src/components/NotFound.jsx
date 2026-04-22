import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
            <h1 className="text-9xl font-bold text-indigo-600">404</h1>
            <p className="text-2xl text-gray-700 mt-4">Oops! Page not found.</p>
            <p className="text-gray-500 mt-2 mb-8">The page you are looking for does not exist.</p>
            
            <Link 
                to="/" 
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;