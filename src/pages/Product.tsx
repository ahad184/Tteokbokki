import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { MOCK_PRODUCTS } from '../utils/constant';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../feature/cart/cartSlice';
import { addToWishlist } from '../feature/wishlist/wishlistSlice';

const Product: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(MOCK_PRODUCTS.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === 'All'
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: (typeof MOCK_PRODUCTS)[0]) => {
    dispatch(addToCart(product));
  };

  const handleAddToWishlist = (product: (typeof MOCK_PRODUCTS)[0]) => {
    dispatch(addToWishlist(product));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>

      {/* Category Filter */}
      <div className="mb-8 flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'outline'}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <button
                onClick={() => handleAddToWishlist(product)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                ❤️
              </button>
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-1">
                {product.category}
              </div>
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {product.description.substring(0, 60)}...
              </p>
              <div className="flex items-center mb-3">
                <span className="text-yellow-500">⭐</span>
                <span className="ml-1 text-sm">{product.rating}</span>
                <span className="ml-2 text-sm text-gray-500">
                  ({product.stock} in stock)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">
                  ${product.price}
                </span>
                <div className="flex gap-2">
                  <Link to={`/products/${product.id}`}>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </Link>
                  <Button size="sm" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Product;
