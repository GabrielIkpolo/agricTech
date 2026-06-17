import React from 'react';
import { Link } from 'react-router-dom';
import { Package, MapPin, Tag } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
      <div className="relative h-48 bg-gray-200">
        {product.image ? (
          <img 
            src={`http://localhost:5000${product.image}`} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Package size={48} />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-bold text-primary shadow-sm">
          {product.category}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
          <span className="text-primary font-bold">₦{product.price}</span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin size={14} className="mr-2" />
            {product.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Tag size={14} className="mr-2" />
            {product.quantity} {product.unit} available
          </div>
        </div>
        
        <Link 
          to={`/product/${product._id}`} 
          className="block text-center w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-opacity-90 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
