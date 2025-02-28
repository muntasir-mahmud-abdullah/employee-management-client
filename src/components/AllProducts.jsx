import React, { useState, useEffect } from "react";

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: "Product A",
    price: 49.99,
    image: "https://i.ibb.co.com/hHr0B6Y/high-angle-gaming-setup-indoors-23-2149829123.jpg",
    description: "Description for Product A",
  },
  {
    id: 2,
    name: "Product B",
    price: 29.99,
    image: "https://i.ibb.co.com/sKcySMf/workspace-with-blank-computer-screen-autumn-decoration-workspace-with-computer-58797-1195.jpg",
    description: "Description for Product B",
  },
  {
    id: 3,
    name: "Product C",
    price: 99.99,
    image: "https://i.ibb.co.com/ChbBVjN/halfclosed-laptop-wooden-table-screen-glows-with-colors-169016-33669.jpg",
    description: "Description for Product C",
  },
  {
    id: 4,
    name: "Product D",
    price: 19.99,
    image: "https://i.ibb.co.com/LrR8WxN/modern-computer-monitor-with-black-screen-system-unit-keyboard-mouse-white-background-495423-41040.jpg",
    description: "Description for Product D",
  },
  // Add more products as needed
];

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  // Initialize with sample data on component mount
  useEffect(() => {
    setProducts(sampleProducts);
  }, []);

  // Sort products by ascending price
  const sortAscending = () => {
    const sorted = [...products].sort((a, b) => a.price - b.price);
    setProducts(sorted);
  };

  // Sort products by descending price
  const sortDescending = () => {
    const sorted = [...products].sort((a, b) => b.price - a.price);
    setProducts(sorted);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>

      {/* Sorting Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={sortAscending}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Sort by Ascending Price
        </button>
        <button
          onClick={sortDescending}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Sort by Descending Price
        </button>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-lg overflow-hidden flex flex-col items-center"
            style={{ width: "16rem", height: "24rem" }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
              <a
                href="#"
                className="mt-4 block text-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                View More / Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
