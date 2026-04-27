import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { onAuthChange, signOutUser } from '../../authService';
import { supabase } from '../../utils/supabase'; // Profiles fetch karne ke liye

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const subscription = onAuthChange(async (currentUser) => {
            setUser(currentUser);
            
            if (currentUser) {
                // Jab user login ho, profiles table se data lao
                const { data, error } = await supabase
                    .from('profiles')
                    .select('full_name, is_admin')
                    .eq('id', currentUser.id)
                    .single();

                if (!error) setProfile(data);
            } else {
                setProfile(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOutUser();
        navigate('/');
    };

    return (
        <header className="text-gray-600 body-font shadow-sm bg-white sticky top-0 z-50">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <div className="w-10 h-10 text-white p-2 bg-indigo-600 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75m0 3v.75m0 3v.75m3-7.5v.75m0 3v.75m0 3v.75m9-3.75h3m-3 3h3m-3 3h3m-6.75-3h.008v.008H12v-.008z" />
                        </svg>
                    </div>
                    <span className="ml-3 text-xl font-bold tracking-tight">Laundry<span className="text-indigo-600">App</span></span>
                </Link>
                
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <Link to="/" className="mr-5 hover:text-indigo-600 font-medium transition-colors">Home</Link>
                    <Link to="/services" className="mr-5 hover:text-indigo-600 font-medium transition-colors">Services</Link>
                    {/* Agar Admin hai to Admin Dashboard ka link dikhao */}
                    {profile?.is_admin && (
                        <Link to="/admin" className="mr-5 text-indigo-600 font-bold hover:text-indigo-800 transition-colors">
                            Admin Panel
                        </Link>
                    )}
                </nav>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            {/* Profile Display Section */}
                            <div className="flex flex-col items-end mr-2">
                                <span className="text-sm font-bold text-gray-900 leading-none">
                                    {profile?.full_name || 'User'}
                                </span>
                                <Link to="/dashboard" className="text-xs text-indigo-600 hover:underline">
                                    My Orders
                                </Link>
                            </div>
                            
                            {/* Avatar/Initials Circle */}
                            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold border-2 border-indigo-200">
                                {profile?.full_name?.charAt(0).toUpperCase() || 'U'}
                            </div>

                            <button
                                onClick={handleLogout}
                                className="cursor-pointer active:scale-95 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 text-sm font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="cursor-pointer active:scale-95 bg-indigo-600 text-white px-8 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-md font-medium"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;