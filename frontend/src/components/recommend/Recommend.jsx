import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import axios from 'axios';

function Recommend() {
  const [searchQuery, setSearchQuery] = useState('');
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/disease', { params: { disease: searchQuery } });
      setDiseaseInfo(response.data);
      setError(null);
    } catch (err) {
      setError("Disease not found.");
      setDiseaseInfo(null);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow p-4 bg-gray-100 rounded-lg shadow-inner">
        <form onSubmit={handleSearch} className="mb-4 flex items-center mx-auto max-w-7xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a disease..."
            className="w-3/4 p-2 border border-gray-300 rounded-md"
          />
          <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-md">Search</button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {diseaseInfo && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <h3 className="text-lg font-bold text-blue-600">How to Prevent</h3>
              <ul className="mt-2">{diseaseInfo.prevention.map((item, index) => <li key={index} className="ml-4 list-disc">{item}</li>)}</ul>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <h3 className="text-lg font-bold text-blue-600">Popular Medicines</h3>
              <ul className="mt-2">{diseaseInfo.medicines.map((item, index) => <li key={index} className="ml-4 list-disc">{item}</li>)}</ul>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <h3 className="text-lg font-bold text-blue-600">Home Remedies</h3>
              <ul className="mt-2">{diseaseInfo.homeRemedies.map((item, index) => <li key={index} className="ml-4 list-disc">{item}</li>)}</ul>
            </div>
          </div>
        )}
        <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-blue-600"></h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15077.141755457013!2d72.83973144416119!3d19.138978820092714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1shospital!5e0!3m2!1sen!2sin!4v1739018702273!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Recommend;
