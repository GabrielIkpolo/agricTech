import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Lock, Phone, MapPin } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'FARMER',
    phoneNumber: '',
    address: '',
  });
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary">Create Account</h2>
          <p className="text-gray-500">Join the AgriTech Pipeline</p>
        </div>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400 size-5" />
            <input 
              type="text" placeholder="Full Name" 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 size-5" />
            <input 
              type="email" placeholder="Email Address" 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 size-5" />
            <input 
              type="password" placeholder="Password" 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400 size-5" />
            <input 
              type="text" placeholder="Phone Number" 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400 size-5" />
            <input 
              type="text" placeholder="Address/Location" 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">I am a:</label>
            <select 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="FARMER">Farmer</option>
              <option value="BUYER">Buyer</option>
              <option value="DRIVER">Driver</option>
              <option value="AGENT">Agent</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-primary font-bold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
