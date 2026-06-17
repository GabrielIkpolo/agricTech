import React, { useState, useEffect, useContext } from 'react';
import { orderService, userService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Package, Truck, CheckCircle, Clock, AlertCircle, User } from 'lucide-react';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigningDriverId, setAssigningDriverId] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await orderService.getMyOrders();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDrivers = async () => {
    try {
      const { data } = await userService.getDrivers();
      setDrivers(data);
    } catch (err) {
      console.error("Error fetching drivers", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    if (user?.role === 'FARMER' || user?.role === 'AGENT') {
      fetchDrivers();
    }
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, { status: newStatus });
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleAssignDriver = async (e) => {
    e.preventDefault();
    try {
      await orderService.assignDriver(assigningDriverId, { driverId: selectedDriver });
      setAssigningDriverId(null);
      setSelectedDriver('');
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to assign driver");
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'DELIVERED': return <CheckCircle className="text-green-500" size={18} />;
      case 'SHIPPED': return <Truck className="text-blue-500" size={18} />;
      case 'PENDING': return <Clock className="text-yellow-500" size={18} />;
      case 'CANCELLED': return <AlertCircle className="text-red-500" size={18} />;
      default: return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Orders & Trades</h1>
        <p className="text-gray-500">Track your purchases and sales</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : orders.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Package className="text-gray-600" size={24} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-gray-800 text-lg">{order.productId?.name}</h3>
                    <div className="flex items-center space-x-1 text-sm font-medium px-2 py-1 bg-gray-100 rounded-md">
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Quantity: {order.quantity} {order.productId?.unit} | Total: <span className="font-bold text-primary">₦{order.totalPrice}</span>
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                    <span className="flex items-center space-x-1">
                      <User size={12} /> 
                      <span>Buyer: {order.buyerId?.name}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <User size={12} /> 
                      <span>Seller: {order.sellerId?.name}</span>
                    </span>
                    {order.driverId && (
                      <span className="flex items-center space-x-1 text-blue-500 font-medium">
                        <Truck size={12} /> 
                        <span>Driver: {order.driverId?.name || 'Assigned'}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 w-full md:w-auto">
                {/* Farmer's Action: Assign Driver */}
                {user.role === 'FARMER' && order.sellerId._id === user._id && order.status === 'PENDING' && !order.driverId && (
                  <button 
                    onClick={() => {
                      setAssigningDriverId(order._id);
                      setSelectedDriver('');
                    }}
                    className="flex-1 md:flex-none px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition"
                  >
                    Assign Driver
                  </button>
                )}

                {/* Farmer's Action: Mark as Shipped */}
                {user.role === 'FARMER' && order.sellerId._id === user._id && order.status === 'PENDING' && order.driverId && (
                  <button 
                    onClick={() => handleUpdateStatus(order._id, 'SHIPPED')}
                    className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Mark as Shipped
                  </button>
                )}

                {/* Buyer's Action: Mark as Delivered */}
                {user.role === 'BUYER' && order.buyerId._id === user._id && order.status === 'SHIPPED' && (
                  <button 
                    onClick={() => handleUpdateStatus(order._id, 'DELIVERED')}
                    className="flex-1 md:flex-none px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
                  >
                    Confirm Delivery
                  </button>
                )}

                {/* Driver's Action: Mark as Delivered */}
                {user.role === 'DRIVER' && order.driverId === user._id && order.status === 'SHIPPED' && (
                  <button 
                    onClick={() => handleUpdateStatus(order._id, 'DELIVERED')}
                    className="flex-1 md:flex-none px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
                  >
                    Mark Delivered
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="flex justify-center mb-4">
            <Package size={48} className="text-gray-300" />
          </div>
          <p className="text-gray-500 text-xl">No orders found. Start trading today!</p>
        </div>
      )}

      {/* Assign Driver Modal */}
      {assigningDriverId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Assign Driver to Order</h2>
            <form onSubmit={handleAssignDriver} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Driver</label>
                <select 
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  required
                >
                  <option value="">-- Select a Driver --</option>
                  {drivers.map(d => (
                    <option key={d._id} value={d._id}>{d.name} ({d.phoneNumber})</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setAssigningDriverId(null)} 
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
                >
                  Assign Driver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
