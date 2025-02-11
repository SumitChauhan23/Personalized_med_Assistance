import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      const templateParams = { firstName, lastName, email, message };
      emailjs.send('service_cvfcjt5', 'template_ogxaxnc', templateParams, 'OeKX5AIVyuAXJUURZ')
        .then((response) => {
          console.log('Email sent successfully!', response.status, response.text);
          setSuccess(true);
          resetForm();
        }, (error) => {
          console.error('Failed to send email. Error:', error);
          setSuccess(false);
        }).finally(() => {
          setLoading(false);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!firstName) errors.firstName = 'First name is required.';
    if (!lastName) errors.lastName = 'Last name is required.';
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }
    if (!message) errors.message = 'Message is required.';
    return errors;
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setMessage('');
    setErrors({});
  };

  return (
    <div className="flex max-w-10xl mx-auto p-7 bg-gradient-to-b from-[#D6EFD8] to-[#f0f0f0]">
      {/* Left Side Background Image */}
      <div className="relative w-1/2 h-full bg-cover bg-center">
        <div className="flex flex-col items-center justify-center h-full p-10 ">
          <div className="relative w-48 h-48 rounded-full overflow-hidden bg-green-600 flex items-center justify-center mb-4 shadow-lg">
            <img 
              src="./contact.jpg" 
              // alt="Contact Us" 
              className="w-full h-full object-cover"
            />
            <span className="absolute text-white text-center font-bold">Contact Us</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-green-600">Get in Touch!</h2>
          <p className="text-lg mb-4">
            We would love to hear from you. Please fill out the form on the right to reach us.
          </p>
          <div className="flex items-center mb-2">
            <FaPhone className="mr-2 text-green-600" />
            <span>+91 7058241573</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2 text-green-600" />
            <span>symptomseer@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative flex-grow justify-end">
        <form id='contact' onSubmit={handleSubmit} className="max-w-md ml-auto mr-10 p-5 border-2 border-green-600 rounded-lg bg-blue-100 shadow-lg">
          {/* Form Fields */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block mt-10 mb-1">First Name:</label>
            <input
              placeholder='Firstname'
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-1">Last Name:</label>
            <input
              placeholder='Lastname'
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">Email:</label>
            <input
              placeholder='Enter your email'
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-1">Message:</label>
            <textarea
              placeholder='Enter your message'
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.message && <p className="text-red-500">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="border border-black p-3 w-32 mb-10 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
          {success && <p className="text-green-500 mt-4">Message sent successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
