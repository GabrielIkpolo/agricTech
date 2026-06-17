import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Package, ShoppingCart, Truck, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-green-800">
          AgriTech Pipeline
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => navigate('/marketplace')}
            className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-green-800 transition"
          >
            <Package size={20} />
            <span>Marketplace</span>
          </button>
          {user?.role === 'FARMER' && (
            <button 
              onClick={() => navigate('/my-produce')}
              className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-green-800 transition"
            >
              <Package size={20} />
              <span>My Produce</span>
            </button>
          )}
          {user?.role === 'BUYER' && (
            <button 
              onClick={() => navigate('/my-orders')}
              className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-green-800 transition"
            >
              <ShoppingCart size={20} />
              <span>My Orders</span>
            </button>
          )}
          {user?.role === 'DRIVER' && (
            <button 
              onClick={() => navigate('/my-orders')}
              className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-green-800 transition"
            >
              <Truck size={20} />
              <span>Available Loads</span>
            </button>
          )}
          <button className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-green-800 transition">
            <UserIcon size={20} />
            <span>Profile</span>
          </button>
        </nav>
        <div className="p-4 border-t border-green-800">
          <button 
            onClick={logout}
            className="flex items-center space-x-3 w-full p-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}!</h1>
            <p className="text-gray-500">You are logged in as a <span className="font-semibold text-primary">{user?.role}</span></p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-full shadow-sm border">
              <UserIcon className="text-gray-600" />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Stats / Cards */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium uppercase">Active Listings</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium uppercase">Pending Orders</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">5</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium uppercase">Total Earnings</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">₦45,000</p>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <p className="text-gray-500 italic">No recent activity to show. Start trading!</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
