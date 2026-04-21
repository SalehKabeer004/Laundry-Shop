import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateNewPassword } from '../authService';

const SetNewPassword = () => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const onSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
                await updateNewPassword(newPassword);
                setSent(true);
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        };

    return (
        <div className="main flex justify-center pt-12">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Set Password</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Enter New Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your new password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-blue-300 cursor-pointer active:scale-95"
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    {sent && (
                        <p className="text-green-500 text-sm mt-4">
                            Password changed successfully! Please <a onClick={() => navigate('/Login')} >Login</a>.
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default SetNewPassword