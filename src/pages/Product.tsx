import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../feature/product/productsSlice";
import { addToCart } from "../feature/cart/cartSlice";

const Product: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);

  const [priceRange, setPriceRange] = useState<[number, number]>([50, 1500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Example filter data
  const categories = [
    { name: "Milk & Drinks", count: 120 },
    { name: "Diary & Milk", count: 143 },
    { name: "Snack & Spice", count: 142 },
  ];

  const productCategories = [
    { name: "Fruit", count: 98, color: "bg-blue-500" },
    { name: "Vegetable", count: 132, color: "bg-pink-500" },
    { name: "Meat", count: 98, color: "bg-green-500" },
    { name: "Drink", count: 121, color: "bg-yellow-500" },
  ];

  const weights = [
    { label: "50g Pack", count: 152 },
    { label: "100g Pack", count: 125 },
    { label: "150g Pack", count: 98 },
  ];

  const tags = [
    { label: "Vegetables", count: 4562 },
    { label: "Tea Fruits", count: 98 },
    { label: "Fruits", count: 4875 },
  ];

  // Toggle handlers
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleWeight = (weight: string) => {
    setSelectedWeights((prev) =>
      prev.includes(weight)
        ? prev.filter((w) => w !== weight)
        : [...prev, weight],
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  // Filtering logic
  const filteredProducts = products
    .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    .filter(
      (p) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category),
    )
    // .filter((p) => selectedWeights.length === 0 || selectedWeights.includes(p.weight))
    .filter(
      (p) =>
        selectedTags.length === 0 ||
        selectedTags.some((tag) => p.tags?.includes(tag)),
    );

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    // if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return 0; // featured
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Filters */}
          <div className="col-span-12 lg:col-span-3 space-y-5">
            {/* All Categories */}
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Product Cat</h3>
                <button
                  className="text-sm text-gray-500"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedWeights([]);
                    setSelectedTags([]);
                    setPriceRange([50, 1500]);
                  }}
                >
                  Clear
                </button>
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Product Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category.name}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => toggleCategory(category.name)}
                        className="w-4 h-4 text-red-500 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      ({category.count})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Filter by Price</h3>
              <input
                type="range"
                min={50}
                max={1500}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([50, parseInt(e.target.value)])}
                className="w-full h-1 bg-red-200 rounded-lg cursor-pointer appearance-none"
                style={{
                  background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${
                    ((priceRange[1] - 50) / (1500 - 50)) * 100
                  }%, #fee2e2 ${((priceRange[1] - 50) / (1500 - 50)) * 100}%, #fee2e2 100%)`,
                }}
              />
              <div className="flex justify-between text-sm text-gray-700 mt-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Product Category Colors */}
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Product Category</h3>
              <div className="space-y-2">
                {productCategories.map((category) => (
                  <label
                    key={category.name}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${category.color} mr-2`}
                      ></div>
                      <span className="text-sm text-gray-700">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      ({category.count})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Weight */}
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Weight</h3>
              <div className="space-y-2">
                {weights.map((weight) => (
                  <label
                    key={weight.label}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedWeights.includes(weight.label)}
                        onChange={() => toggleWeight(weight.label)}
                        className="w-4 h-4 text-red-500 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {weight.label}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      ({weight.count})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Product Tags</h3>
              <div className="space-y-2">
                {tags.map((tag) => (
                  <label
                    key={tag.label}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag.label)}
                        onChange={() => toggleTag(tag.label)}
                        className="w-4 h-4 text-red-500 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {tag.label}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">({tag.count})</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Products Section */}
          <div className="col-span-12 lg:col-span-9">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600">
                {filteredProducts.length} items found
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {paginatedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
                    >
                      {/* Product Image */}
                      <Link to={`/products/${product.id}`}>
                        <div className="relative bg-gray-50 p-6 h-56 flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="p-4">
                        <p className="text-xs text-gray-500 mb-1">
                          {product.category}
                        </p>
                        <Link to={`/products/${product.id}`}>
                          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[40px] hover:text-red-500 transition">
                            {product.name}
                          </h3>
                        </Link>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                          ))}
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-red-500 text-lg font-bold">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-gray-400 text-sm line-through">
                            ${(product.price * 1.2).toFixed(2)}
                          </span>
                        </div>

                        {/* Add to Cart */}
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded text-sm font-medium transition flex items-center justify-center gap-2"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1.5 rounded text-sm ${
                        currentPage === i + 1
                          ? "bg-red-500 text-white"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
