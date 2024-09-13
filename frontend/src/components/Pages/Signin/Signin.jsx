import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/signin', { name, email, password })
            .then(result => {
                localStorage.setItem("Email", email);
                localStorage.setItem("Name", name);
                navigate('/');
            })
            .catch(err => {
                console.error(err);
                setError(err.response?.data?.error || "An error occurred. Please try again.");
            });
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Sign Up</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handlesubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
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
                            Already have an account? <Link to="/login" className="text-blue-500 font-semibold">Login here</Link>
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </main>
    );
};

export default SignUp;
