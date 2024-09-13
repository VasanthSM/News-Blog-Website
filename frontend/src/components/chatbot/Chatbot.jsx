import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        axios.post("http://localhost:5000/chat", { prompt })
            .then((res) => {
                const processedResponse = processResponse(res.data.generatedText);
                setResponse(processedResponse.split('\n'));
            })
            .catch((err) => {
                console.error(err);
                setError("Error: Something went wrong");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const processResponse = (text) => {
        return text.replace(/\*/g, '').trim();
    };

    const isHeading = (text) => {
        return text.trim().endsWith(':');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Chat with AI</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <label className="block text-gray-600 font-medium mb-2" htmlFor="prompt">
                        Ask a question:
                    </label>
                    <input 
                        type="text" 
                        id="prompt"
                        value={prompt} 
                        onChange={(e) => setPrompt(e.target.value)} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
                        placeholder="Type your question here..."
                    />
                    <button 
                        className={`w-full px-4 py-2 rounded-md font-semibold text-white ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-400'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105`} 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>

                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                
                {response.length > 0 && (
                    <div className="mt-6 space-y-4">
                        {response.map((paragraph, index) => (
                            paragraph.trim() ? (
                                isHeading(paragraph) ? (
                                    <div key={index} className="text-xl font-semibold text-gray-700">{paragraph}</div>
                                ) : (
                                    <p key={index} className="text-base text-gray-600">{paragraph}</p>
                                )
                            ) : (
                                <div key={index} className="mb-4">&nbsp;</div>
                            )
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chatbot;
