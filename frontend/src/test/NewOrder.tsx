import React, { useState } from 'react';
import { ArrowLeft, Package, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewOrderFormData {
  name: string;
  category: string;
  quantity: number;
  price: number;
  stockLevel: number;
}

const initialFormData: NewOrderFormData = {
  name: '',
  category: '',
  quantity: 0,
  price: 0,
  stockLevel: 0,
};

const categories = ['Electronics', 'Cybernetics', 'Display', 'Components', 'Accessories'];

export const NewOrderForm: React.FC = () => {
  const [formData, setFormData] = useState<NewOrderFormData>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' || name === 'stockLevel' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  return (
    <div className="min-h-screen bg-white from-gray-900 via-gray-800 to-gray-900 text-black p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/order"
            className="p-2 hover:bg-gray rounded-lg transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-blue-600 bg-clip-text text-transparent">
              New Order
            </h1>
            <p className="text-gray-400 mt-1">Create a new Order</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/5 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm">
            {/* Product Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-medium text-blue-500 mb-4">
                <Package className="h-5 w-5" />
                <span>Order Information</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter customer name"
                    className="w-full px-5 py-2 bg-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-black"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="mt-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-4 py-2 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
                    Price (Bath ฿)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="stockLevel" className="block text-sm font-medium text-gray-300 mb-1">
                    Initial Stock Level
                  </label>
                  <input
                    type="number"
                    id="stockLevel"
                    name="stockLevel"
                    value={formData.stockLevel}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-2 bg-white/5 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <Link
              to="/"
              className="px-4 py-2 text-gray-400 hover:text-gray-100 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              <Save className="h-5 w-5" />
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};