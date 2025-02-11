import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

const Prediction = () => {
    const [description, setDescription] = useState('');
    const [responses, setResponses] = useState([]);
    const [defaultMessage] = useState('Please describe how you are feeling and what your symptoms are.');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        setResponses([{ type: 'bot', text: defaultMessage }]);
    }, [defaultMessage]);

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
        doc.text(userInput, margin, 70, { maxWidth: pageWidth - margin * 2 });

        // Bot Response Section
        doc.setFontSize(14);
        doc.setTextColor(50, 50, 50);
        doc.text('', margin, 90);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(botResponse, margin, 110, { maxWidth: pageWidth - margin * 2 });

        // Save the PDF
        doc.save('health_report.pdf');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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

    return (
        <div className="container mx-auto p-6 bg-gradient-to-b from-[#D6EFD8] to-[#f0f0f0] h-screen flex flex-col">
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
            <div className="textarea-container flex items-center mt-auto">
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
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your feelings or symptoms (max 1000 characters)"
                        maxLength={1000}
                        className="w-full h-24 p-2 border border-gray-300 rounded mb-2 resize-none text-lg bg-[#F5F7F8]"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition text-lg"
                        disabled={loading}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Prediction;
