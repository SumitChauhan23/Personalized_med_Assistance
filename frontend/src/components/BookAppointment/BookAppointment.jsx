import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import Navbar from '../shared/Navbar';

const BookAppointment = () => {
  const { hospitalName } = useParams();
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patientMobile: '',
    appointmentDate: '',
    appointmentTime: '',
    purpose: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add content to PDF
    doc.setFontSize(20);
    doc.text('Appointment Confirmation', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Hospital: ${hospitalName}`, 20, 40);
    doc.text(`Patient Name: ${formData.patientName}`, 20, 50);
    doc.text(`Age: ${formData.patientAge}`, 20, 60);
    doc.text(`Mobile: ${formData.patientMobile}`, 20, 70);
    doc.text(`Purpose: ${formData.purpose}`, 20, 80);
    doc.text(`Appointment Date: ${formData.appointmentDate}`, 20, 90);
    doc.text(`Appointment Time: ${formData.appointmentTime}`, 20, 100);
    doc.text(`Allotted Doctor: Dr. XYZ`, 20, 110);
    
    // Save the PDF
    doc.save('appointment-receipt.pdf');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    toast.success('Appointment booked successfully!', {
      position: "top-right",
      autoClose: 3000,
      onClose: () => {
        generatePDF();
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Book your Appointment</h2>
          <h3 className="text-xl mb-4 text-center text-gray-700">{hospitalName}</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Patient Name</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Patient Age</label>
              <input
                type="number"
                name="patientAge"
                value={formData.patientAge}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Patient Mobile Number</label>
              <input
                type="tel"
                name="patientMobile"
                value={formData.patientMobile}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Purpose of Visit</label>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
                rows="3"
                placeholder="Please describe the reason for your appointment"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Appointment Date</label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Appointment Time</label>
              <input
                type="time"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookAppointment;
