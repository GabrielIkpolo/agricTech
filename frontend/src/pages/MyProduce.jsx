import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import { Plus, Edit, Trash2, Package } from 'lucide-react';

const MyProduce = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', description: '', quantity: '', unit: 'kg', price: '', category: 'Grains', location: '',
  });
  const [image, setImage] = useState(null);

  const fetchMyProducts = async () => {
    setLoading(true);
    try {
      // In a real app, we'd have a specific /my-products endpoint, 
      // but for now we can filter from the main list or implement a backend endpoint.
      // Since our backend doesn't have /my-products yet, we'll use a placeholder 
      // and suggest implementing it.
      const { data } = await productService.getAll();
      // Filtering on client side for now (Better to do on backend)
      // const user = JSON.parse(localStorage.getItem('user'));
      // setProducts(data.filter(p => p.farmerId._id === user._id));
      setProducts(data); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    try {
      await productService.create({}, data);
      setShowModal(false);
      setFormData({ name: '', description: '', quantity: '', unit: 'kg', price: '', category: 'Grains', location: '' });
      setImage(null);
      fetchMyProducts();
    } catch (err) {
      alert("Error creating product");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Produce Inventory</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
        >
          <Plus size={20} />
          <span>Add New Product</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Product</th>
                <th className="p-4 font-semibold text-gray-600">Quantity</th>
                <th className="p-4 font-semibold text-gray-600">Price</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="size-10 bg-gray-200 rounded-md overflow-hidden">
                        <img src={`http://localhost:5000${product.image}`} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-gray-800">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{product.quantity} {product.unit}</td>
                  <td className="p-4 text-primary font-bold">₦{product.price}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit size={18} /></button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add New Produce</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Name</label>
                <input 
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" 
                  placeholder="e.g. White Maize" 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select 
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Grains">Grains</option>
                  <option value="Tubers">Tubers</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price (per unit)</label>
                <input 
                  type="number" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" 
                  placeholder="₦" 
                  onChange={e => setFormData({...formData, price: e.target.value})} 
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Quantity</label>
                <div className="flex space-x-2">
                  <input 
                    type="number" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" 
                    placeholder="Amount" 
                    onChange={e => setFormData({...formData, quantity: e.target.value})} 
                    required
                  />
                  <select 
                    className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                    onChange={e => setFormData({...formData, unit: e.target.value})}
                  >
                    <option value="kg">kg</option>
                    <option value="bag">bag</option>
                    <option value="ton">ton</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Location</label>
                <input 
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" 
                  placeholder="e.g. Jos, Plateau State" 
                  onChange={e => setFormData({...formData, location: e.target.value})} 
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" 
                  rows="3" 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Product Image</label>
                <input 
                  type="file" 
                  className="w-full p-2 border rounded-lg outline-none" 
                  onChange={e => setImage(e.target.files[0])} 
                />
              </div>
              <div className="md:col-span-2 flex justify-end space-x-3 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProduce;
