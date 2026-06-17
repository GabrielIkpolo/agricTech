import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Search, Filter, X, ArrowUpDown } from 'lucide-react';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await productService.getAll({ search, category, sort: sort === 'newest' ? undefined : sort === 'low' ? 'price_asc' : 'price_desc' });
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort]);

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setSort('newest');
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Agricultural Marketplace</h1>
          <p className="text-gray-500">Fresh produce directly from Nigerian farmers</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {(search || category || sort !== 'newest') && (
            <button 
              onClick={clearFilters}
              className="flex items-center space-x-1 text-sm text-red-500 hover:text-red-700 font-medium transition"
            >
              <X size={14} />
              <span>Clear All</span>
            </button>
          )}
          
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 size-5" />
            <input 
              type="text" 
              placeholder="Search crops, locations..." 
              className="pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary w-full sm:w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-2.5 text-gray-400 size-5" />
            <select 
              className="pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary w-full sm:w-48 appearance-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Grains">Grains</option>
              <option value="Tubers">Tubers</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
            </select>
          </div>

          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-2.5 text-gray-400 size-5" />
            <select 
              className="pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary w-full sm:w-40 appearance-none"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <div className="flex justify-center mb-4">
            <Package size={48} className="text-gray-300" />
          </div>
          <p className="text-gray-500 text-xl font-medium">No products found matching your criteria.</p>
          <button 
            onClick={clearFilters}
            className="mt-4 text-primary font-bold hover:underline"
          >
            Reset filters and try again
          </button>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
