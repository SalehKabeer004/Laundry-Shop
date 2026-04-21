import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { onAuthChange, signOutUser } from '../../authService';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const subscription = onAuthChange((currentUser) => {
            setUser(currentUser);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOutUser();
        navigate('/');
    };

    return (
        <header className="text-gray-600 body-font shadow-sm">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span className="ml-3 text-xl">LaundryApp</span>
                </Link>
                
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <Link to="/" className="mr-5 hover:text-gray-900 cursor-pointer">Home</Link>
                    <Link to="/services" className="mr-5 hover:text-gray-900 cursor-pointer">Services</Link>
                </nav>

                {user ? (
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard" className="text-gray-700 font-medium hover:text-indigo-600 cursor-pointer">
                            My Orders
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="cursor-pointer active:scale-95 bg-red-50 text-red-600 border border-red-200 px-6 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className="cursor-pointer active:scale-95 bg-indigo-600 text-white px-8 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-md"
                    >
                        Login
                    </button>
                )}
            </div>
        </header>
    );
};

export default Navbar;