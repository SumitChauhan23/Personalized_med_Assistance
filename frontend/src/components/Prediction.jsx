import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

const Prediction = () => {
    const [description, setDescription] = useState('');
    const [responses, setResponses] = useState([]);
    const [defaultMessage] = useState('Please describe how you are feeling and what your symptoms are.');
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    // Create a reference to store the recognition instance
    const recognitionRef = useRef(null);

    useEffect(() => {
        setResponses([{ type: 'bot', text: defaultMessage }]);

        // Initialize speech recognition
        if (!recognitionRef.current) {
            recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = false; // Changed to false to get final results only
            recognitionRef.current.lang = 'en-US';
        }

        const recognition = recognitionRef.current;

        recognition.onstart = () => {
            console.log('Speech recognition started');
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const last = event.results.length - 1;
            const transcript = event.results[last][0].transcript;
            console.log('Transcript:', transcript);
            setDescription(prev => prev + ' ' + transcript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            console.log('Speech recognition ended');
            setIsListening(false);
        };

        return () => {
            recognition.stop();
        };
    }, [defaultMessage]);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    const generatePDF = (userInput, botResponse) => {
        const doc = new jsPDF();
        const margin = 20;
        const pageWidth = doc.internal.pageSize.getWidth();

        // Set title - Symptom Seer
        doc.setFontSize(28);
        doc.setTextColor(0, 102, 204);
        doc.text('Symptom Seer', pageWidth / 2, 30, { align: 'center' });

        // Health Report subtitle
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.text('Health Report', pageWidth / 2, 40, { align: 'center' });

        // User Input Section
        doc.text('User Input:', margin, 60);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        const userInputLines = doc.splitTextToSize(userInput, pageWidth - margin * 2);
        doc.text(userInputLines, margin, 70);

        // Calculate dynamic position for Bot Response Section
        const userInputHeight = userInputLines.length * 7; // Assuming 10 units per line
        const botResponseStartY = 70 + userInputHeight; // Removed the 20 units padding

        // Bot Response Section
        doc.setFontSize(14);
        doc.setTextColor(50, 50, 50);
        doc.text('Bot Response:', margin, botResponseStartY);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        const botResponseLines = doc.splitTextToSize(botResponse, pageWidth - margin * 2);
        doc.text(botResponseLines, margin, botResponseStartY + 10);

        // Save the PDF
        doc.save('health_report.pdf');
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if description is empty or only contains whitespace
    if (!description.trim()) {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000); // Hide error after 3 seconds
        return;
    }

    // Check if description is less than 100 characters
    if (description.trim().length < 100) {
        setResponses((prev) => [
            ...prev,
            { type: 'bot', text: 'Please provide a bigger and proper descrption on how you are feeling' }
        ]);
        return;
    }

    setResponses((prev) => [...prev, { type: 'user', text: description }]);
    setDescription('');
    setLoading(true);

    try {
        const res = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description }),
        });

        if (!res.ok) throw new Error('Network response was not ok');

        const data = await res.json();
        const botResponse = data.response;

        setResponses((prev) => [...prev, { type: 'bot', text: botResponse }]);
        generatePDF(description, botResponse);
    } catch (error) {
        setResponses((prev) => [...prev, { type: 'bot', text: 'Error fetching response. Please try again.' }]);
        console.error('Fetch error:', error);
    } finally {
        setLoading(false);
    }
};


    const handleKnowMore = () => {
        navigate('/Recommend'); // Navigate to the Recommend page
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent default to avoid new line
            handleSubmit(e);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gradient-to-b from-[#D6EFD8] to-[#f0f0f0] h-screen flex flex-col">
            {showError && (
                <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
                    Please enter your symptoms or feelings before submitting
                </div>
            )}
            <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Health Chatbot</h1>
            <div className="chat-history flex-1 overflow-y-auto mb-4 p-3 border border-gray-300 rounded-lg bg-[#F5F7F8] max-h-[600px]">
                {responses.map((resp, index) => (
                    <div key={index} className={`flex ${resp.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-7xl p-4 rounded-lg shadow-md ${resp.type === 'user' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>
                            <p className="whitespace-pre-wrap text-lg">{resp.text}</p>
                            <span className="text-xs text-white">{new Date().toLocaleTimeString()}</span>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-center">
                        <p className="text-left text-lg text-gray-800">Thinking...</p>
                    </div>
                )}
            </div>
            <div className="textarea-container flex items-center mt-auto p-3">
                <button
                    className="font-bold know-more-button bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 h-36"
                    onClick={handleKnowMore}
                >
                    Know More 
                    <span className='block font-bold'>about</span>
                    <span 
                        className='block font-bold' 
                    >the disease</span> 
                </button>
                <form onSubmit={handleSubmit} className="flex-grow">
                    <div className="relative">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Describe your feelings or symptoms (max 1000 characters) or click the microphone to speak"
                            maxLength={1000}
                            className="w-full h-24 p-2 border border-gray-300 rounded mb-2 resize-none text-lg bg-[#F5F7F8]"
                        />
                        <button
                            type="button"
                            onClick={toggleListening}
                            className={`absolute right-2 top-2 p-2 rounded-full ${
                                isListening ? 'bg-red-500' : 'bg-gray-200'
                            } hover:bg-opacity-80 transition-colors`}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-6 w-6" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke={isListening ? 'white' : 'currentColor'}
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
                                />
                            </svg>
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition text-lg"
                        disabled={loading}
                    >
                        Submit
                    </button>
                </form>
            </div>
            <style jsx>{`
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translateY(-20px); }
                    10% { opacity: 1; transform: translateY(0); }
                    90% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-20px); }
                }
                .animate-fade-in-out {
                    animation: fadeInOut 3s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default Prediction;