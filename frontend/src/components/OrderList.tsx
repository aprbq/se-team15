import React, { useState, useMemo } from 'react';
import { Plus, FileText, Receipt, ArrowRightFromLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge } from './StstusBadge';
import { SearchBar } from './SearchBar';
import type { OrderItem, FilterOptions } from '../interfaces/order';

const mockOrders: OrderItem[] = [
  {
    id: '1',
    name: 'ORD0000001',
    price: 900000,
    status: 'pending',
    employee: "danuporn",
    customer: "อั้มเจริญการค้า",
  },
  {
    id: '2',
    name: 'ORD0000002',
    price: 50000,
    status: 'processing',
    employee: "chaiyarod",
    customer: "มายขายส่งกับขายเสื้อ",
  },
  {
    id: '3',
    name: 'ORD0000003',
    price: 8000,
    status: 'completed',
    employee: "thanawat",
    customer: "บุ๊คขายอย่างเดียว",
  },
  {
    id: '4',
    name: 'ORD0000004',
    price: 9000,
    status: 'cancelled',
    employee: "apirat",
    customer: "โบ๊ททั้งเสพทั้งขาย",
  },
  {
    id: '5',
    name: 'ORD0000005',
    price: 10000,
    status: 'processing',
    employee: "ohm",
    customer: "ม้าทองจำกัดมหาชน",
  }
];

export const OrderList: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    search: ''
  });

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      const matchesSearch = order.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = !filters.status || order.status === filters.status;
      return matchesSearch && matchesStatus;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-white text-primary-dark">
      {/* Main Content */}
      <div className="ml-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-blue-600 bg-clip-text">
                Order Management
              </h1>
              <p className="text-gray-400 mt-1">Manage your warehourse orders in here</p>
            </div>
            <Link
              to="/newOrder"
              className="flex items-center gap-2 px-4 py-2 bg-accent-orange hover:bg-hover-orange rounded-lg transition-colors text-white"
            >
              <Plus className="h-5 w-5" />
              New Order
            </Link>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <SearchBar 
              value={filters.search}
              onChange={(value) => setFilters(prev => ({ ...prev, search: value }))}
            />
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="bg-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Orders Table */}
          <div className="bg-white/5 border border-gray-700 rounded-2xl backdrop-blur-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 bg-gray">
                  <th className="text-left p-4 text-gray-400 font-medium">Order ID</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Order Number</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Price (Bath)</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Create By</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Detail</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-700/50 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-sm">#{order.id}</td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{order.name}</div>
                        <div className="text-sm text-gray-400 flex items-center space-x-2">
                          <ArrowRightFromLine className="h-4 w-4"/>
                          <span>{order.customer}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4"><span className='font-semibold'>฿</span>{order.price.toFixed(2)}</td>
                    <td className="p-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="p-4">{order.employee}</td>
                    <td className="p-4">
                      <Link
                        to="/newOrder"
                        className="flex items-center"
                      >
                        <FileText/>
                      </Link>
                    </td>
                    <td className="p-4">
                      <Link
                        to="/newOrder"
                        className="flex items-center"
                      >
                        <Receipt />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};