import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/login', { email, password })
            .then(result => {
                if (result.data === "Success") {
                    localStorage.setItem("Email", email);
                    navigate('/');
                } else {
                    setError(result.data.error || "An error occurred. Please try again.");
                    setShowPopup(true);
                }
            })
            .catch(err => {
                console.error('Error:', err);
                setError(err.response?.data?.error || "An error occurred. Please try again.");
                setShowPopup(true);
            });
    };
    
    

    const closePopup = () => setShowPopup(false);

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            required
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="ml-2 text-gray-600 text-sm">
                            By continuing, I agree to the Privacy & Policy
                        </label>
                    </div>
                    <div className="text-center text-sm text-gray-600">
                        <p>
                            Create a new account? <Link to="/signin" className="text-blue-500 font-semibold">Sign up here</Link>
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full animate-popup">
                            <h3 className="text-lg font-semibold text-red-500">Error</h3>
                            <p className="mt-2 text-gray-700">{error}</p>
                            <button
                                onClick={closePopup}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Login;
