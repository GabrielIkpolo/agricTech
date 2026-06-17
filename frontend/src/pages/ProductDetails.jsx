import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService, orderService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Package, MapPin, User, ShoppingCart, ArrowLeft } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await productService.getById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to place an order");
      return navigate('/login');
    }

    setOrdering(true);
    try {
      await orderService.placeOrder({ productId: id, quantity });
      alert("Order placed successfully!");
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || "Failed to place order");
    } finally {
      setOrdering(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!product) return <div className="flex justify-center items-center h-screen">Product not found</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center space-x-2 text-gray-600 hover:text-primary mb-6 transition"
      >
        <ArrowLeft size={20} />
        <span>Back to Marketplace</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="rounded-2xl overflow-hidden bg-gray-200 aspect-square relative">
          {product.image ? (
            <img src={`http://localhost:5000${product.image}`} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Package size={64} />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-800 mt-2">{product.name}</h1>
            <p className="text-2xl font-bold text-primary mt-4">₦{product.price} <span className="text-gray-500 text-lg font-normal">/ {product.unit}</span></p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3 text-gray-600">
              <MapPin className="text-primary" size={20} />
              <span>Location: {product.location}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <User className="text-primary" size={20} />
              <span>Farmer: {product.farmerId?.name || 'Available'}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Package className="text-primary" size={20} />
              <span>Available Stock: {product.quantity} {product.unit}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description || "No detailed description available for this product."}
          </p>

          {/* Order Form */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Place an Order</h3>
            <form onSubmit={handlePlaceOrder} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm text-gray-500 block mb-1">Quantity ({product.unit})</label>
                <input 
                  type="number" 
                  min="1" 
                  max={product.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-500 block mb-1">Total Price</label>
                <div className="p-2 bg-gray-100 rounded-lg font-bold text-gray-800">
                  ₦{product.price * quantity}
                </div>
              </div>
              <button 
                type="submit" 
                disabled={ordering}
                className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition disabled:bg-gray-400 flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>{ordering ? 'Processing...' : 'Order Now'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
