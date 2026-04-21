import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../authService';

const Login = () => {

  const navigate = useNavigate()


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleLogin(email, password);
      navigate("/"); // Login ke baad kya karna hai (e.g., close modal)
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main flex justify-center pt-12">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Login to Book</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-blue-300 cursor-pointer active:scale-95"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
        <div className="flex justify-between">
          <div className='pt-4' >Don't have an account? <a onClick={() => navigate("/signup")} className='text-blue-600 hover:underline cursor-pointer active:scale-95' >Sign Up</a></div>
          <div className='pt-4' ><a onClick={() => navigate("/forgot-password")} className='text-blue-600 hover:underline cursor-pointer active:scale-95' >Forgot password?</a></div>
        </div>
      </div>
    </div>
  );
};

export default Login