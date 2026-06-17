import React, { useState, useEffect } from 'react';
import { agentService, productService } from '../services/api';
import { UserPlus, Users, Package, Trash2, Edit } from 'lucide-react';

const AgentDashboard = () => {
  const [farmers, setFarmers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFarmerModal, setShowFarmerModal] = useState(false);
  const [farmerData, setFarmerData] = useState({
    name: '', email: '', password: '', phoneNumber: '', address: '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [farmersRes, productsRes] = await Promise.all([
        agentService.getFarmers(),
        agentService.getProducts()
      ]);
      setFarmers(farmersRes.data);
      setProducts(productsRes.data);
    } catch (err) {
      console.error("Error fetching agent data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddFarmer = async (e) => {
    e.preventDefault();
    try {
      await agentService.createFarmer(farmerData);
      setShowFarmerModal(false);
      setFarmerData({ name: '', email: '', password: '', phoneNumber: '', address: '' });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create farmer");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Agent Control Panel</h1>
          <p className="text-gray-500">Manage your linked farmers and their produce</p>
        </div>
        <button 
          onClick={() => setShowFarmerModal(true)}
          className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
        >
          <UserPlus size={20} />
          <span>Add New Farmer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Farmers List */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="text-primary" size={20} />
              <h2 className="text-xl font-bold text-gray-800">My Farmers</h2>
            </div>
            <div className="space-y-3">
              {farmers.length > 0 ? farmers.map(farmer => (
                <div key={farmer._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <p className="font-medium text-gray-800">{farmer.name}</p>
                    <p className="text-xs text-gray-500">{farmer.phoneNumber}</p>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-primary transition">
                    <Edit size={16} />
                  </button>
                </div>
              )) : (
                <p className="text-gray-400 text-sm italic">No farmers linked yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Managed Inventory */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Package className="text-primary" size={20} />
              <h2 className="text-xl font-bold text-gray-800">Managed Inventory</h2>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : products.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-sm text-gray-500 border-b">
                      <th className="pb-3 font-medium">Product</th>
                      <th className="pb-3 font-medium">Farmer</th>
                      <th className="pb-3 font-medium">Price</th>
                      <th className="pb-3 font-medium">Stock</th>
                      <th className="pb-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {products.map(product => (
                      <tr key={product._id} className="hover:bg-gray-50 transition">
                        <td className="py-4 font-medium text-gray-800">{product.name}</td>
                        <td className="py-4 text-sm text-gray-600">{product.farmerId?.name}</td>
                        <td className="py-4 text-primary font-bold">₦{product.price}</td>
                        <td className="py-4 text-sm text-gray-600">{product.quantity} {product.unit}</td>
                        <td className="py-4 text-right space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit size={16} /></button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10 text-gray-400">
                No produce listed by your farmers yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Farmer Modal */}
      {showFarmerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Register New Farmer</h2>
            <form onSubmit={handleAddFarmer} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <input 
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" 
                  placeholder="Full Name" 
                  onChange={e => setFarmerData({...farmerData, name: e.target.value})} 
                  required
                />
                <input 
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" 
                  type="email" placeholder="Email" 
                  onChange={e => setFarmerData({...farmerData, email: e.target.value})} 
                  required
                />
                <input 
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" 
                  type="password" placeholder="Password" 
                  onChange={e => setFarmerData({...farmerData, password: e.target.value})} 
                  required
                />
                <input 
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" 
                  placeholder="Phone Number" 
                  onChange={e => setFarmerData({...farmerData, phoneNumber: e.target.value})} 
                />
                <input 
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" 
                  placeholder="Village/Location" 
                  onChange={e => setFarmerData({...farmerData, address: e.target.value})} 
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowFarmerModal(false)} 
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
                >
                  Create Farmer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDashboard;
