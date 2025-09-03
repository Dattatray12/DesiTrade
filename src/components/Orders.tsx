import React, { useState } from "react";
import Watchlist from "./Watchlist";
import { Stock } from "../types";
import { useLiveData } from "../hooks/useLiveData";
import { useTheme } from "../context/ThemeContext";

interface Order {
  id: string;
  symbol: string;
  status: string;
  time: string;
  product: string;
  side: string;
  quantity: string;
  ltp: string;
  price: string;
  triggerPrice: string;
  avgPrice: string;
}

const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState("CLOSED");
  const [searchQuery, setSearchQuery] = useState("");
  const { watchlist } = useLiveData();
  const { theme } = useTheme();

  const tabs = ["OPEN", "CLOSED", "GTT", "BASKET"];

  // Mock data for orders - matching the image
  const orders: Order[] = [
    {
      id: "1",
      symbol: "BANKNIFTY 53800 CE NFO 30SEP25",
      status: "Failed",
      time: "10:13:29 AM",
      product: "Delivery",
      side: "Buy",
      quantity: "0/70",
      ltp: "794.20",
      price: "0.00",
      triggerPrice: "0.00",
      avgPrice: "0.00"
    },
    {
      id: "2",
      symbol: "BANKNIFTY 53800 CE NFO 30SEP25",
      status: "Failed",
      time: "10:13:25 AM",
      product: "Delivery",
      side: "Sell",
      quantity: "0/70",
      ltp: "794.20",
      price: "0.00",
      triggerPrice: "0.00",
      avgPrice: "0.00"
    },
    {
      id: "3",
      symbol: "BANKNIFTY 53800 CE NFO 30SEP25",
      status: "Failed",
      time: "10:06:05 AM",
      product: "Delivery",
      side: "Buy",
      quantity: "0/70",
      ltp: "794.20",
      price: "0.00",
      triggerPrice: "0.00",
      avgPrice: "0.00"
    },
    {
      id: "4",
      symbol: "BANKNIFTY 53800 CE NFO 30SEP25",
      status: "Failed",
      time: "10:02:14 AM",
      product: "Delivery",
      side: "Sell",
      quantity: "0/70",
      ltp: "794.20",
      price: "0.00",
      triggerPrice: "0.00",
      avgPrice: "0.00"
    }
  ];

  const filteredOrders = orders.filter(order =>
    order.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render content based on active tab
  const renderTabContent = () => {
    if (activeTab === "OPEN") {
      return (
        <div className="text-center py-16">
          {/* Large clipboard icon */}
          <div className="mx-auto w-24 h-24 text-blue-400 dark:text-blue-300 mb-6 relative">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            {/* Small floating documents around the clipboard */}
            <div className="absolute -top-2 -right-2 w-8 h-8 text-blue-300 dark:text-blue-200 opacity-60">
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
              </svg>
            </div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 text-blue-300 dark:text-blue-200 opacity-50">
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
              </svg>
            </div>
            <div className="absolute top-1 -left-2 w-5 h-5 text-blue-300 dark:text-blue-200 opacity-40">
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
              </svg>
            </div>
          </div>
          
          {/* Message */}
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
            Your pending orders from today will appear here.
          </p>
        </div>
      );
    }

    if (activeTab === "GTT") {
      return (
        <div className="text-center py-16">
          {/* Large clipboard icon with line graph */}
          <div className="mx-auto w-24 h-24 text-blue-400 dark:text-blue-300 mb-6 relative">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            {/* Line graph overlay on clipboard */}
            <div className="absolute inset-0 flex items-end justify-center pb-2">
              <svg className="w-16 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 16 8">
                <path strokeWidth="2" d="M0 6 L4 4 L8 5 L12 2 L16 3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {/* Small floating documents around the clipboard */}
            <div className="absolute -top-2 -right-2 w-8 h-8 text-blue-300 dark:text-blue-200 opacity-60">
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
              </svg>
            </div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 text-blue-300 dark:text-blue-200 opacity-50">
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
              </svg>
            </div>
            <div className="absolute top-1 -left-2 w-5 h-5 text-blue-300 dark:text-blue-200 opacity-40">
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
              </svg>
            </div>
            <div className="absolute top-2 -right-1 w-4 h-4 text-blue-300 dark:text-blue-200 opacity-40">
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
              </svg>
            </div>
            <div className="absolute -bottom-2 -right-3 w-5 h-5 text-blue-300 dark:text-blue-200 opacity-50">
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
              </svg>
            </div>
          </div>
          
          {/* Main Heading */}
          <h3 className="text-gray-700 dark:text-gray-600 text-xl font-semibold mb-3">
            No GTT orders...yet!
          </h3>
          
          {/* Descriptive Text */}
          <p className="text-gray-600 dark:text-gray-500 text-base leading-relaxed max-w-md mx-auto">
            With GTT orders, you can set your desired buy/ sell price and automate your trades.
          </p>
        </div>
      );
    }

    if (activeTab === "BASKET") {
      return (
        <div className="text-center py-16">
          {/* Large basket icon */}
          <div className="mx-auto w-24 h-24 text-blue-400 dark:text-blue-300 mb-6 relative">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"/>
            </svg>
            {/* Small floating items around the basket */}
            <div className="absolute -top-2 -right-2 w-8 h-8 text-blue-300 dark:text-blue-200 opacity-60">
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 text-blue-300 dark:text-blue-200 opacity-50">
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="absolute top-1 -left-2 w-5 h-5 text-blue-300 dark:text-blue-200 opacity-40">
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="absolute top-2 -right-1 w-4 h-4 text-blue-300 dark:text-blue-200 opacity-40">
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
          
          {/* Main Heading */}
          <h3 className="text-gray-700 dark:text-gray-600 text-xl font-semibold mb-3">
            No basket orders...yet!
          </h3>
          
          {/* Descriptive Text */}
          <p className="text-gray-600 dark:text-gray-500 text-base leading-relaxed max-w-md mx-auto">
            Create and manage multiple orders as a single basket for efficient trading strategies.
          </p>
        </div>
      );
    }

    // For CLOSED tab, show the orders table
    return (
      <>
        {/* Orders Table */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200 dark:bg-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-400 text-blue-600 focus:ring-blue-500" />
                      <span>Symbol (9)</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <span>Time</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Side
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    LTP
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Trigger Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Avg. Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-100 dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {order.symbol}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-red-600 dark:text-red-400 font-medium">{order.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {order.time}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {order.product}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-sm font-medium px-2 py-1 rounded ${
                        order.side === 'Buy' 
                          ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20' 
                          : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
                      }`}>
                        {order.side}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {order.quantity}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {order.ltp}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {order.price}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {order.triggerPrice}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {order.avgPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State Message for CLOSED tab when no orders */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 text-gray-500 mb-4">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Your completed, cancelled or rejected orders from today will appear here.
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Left Sidebar - Watchlist */}
      <div className="lg:col-span-1">
        <Watchlist data={watchlist} />
      </div>

      {/* Main Content - Orders */}
      <div className="lg:col-span-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
          {/* Header with tabs and search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search and Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search in closed orders"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Action Icons */}
              <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
              <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Render content based on active tab */}
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Orders;
