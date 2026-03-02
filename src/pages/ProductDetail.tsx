import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { fetchProducts, Product as ProductType } from '../feature/product/productsSlice';
import { usePersistence } from '../hooks/usePersistence';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { products, loading } = useAppSelector((state: RootState) => state.products);

  const [quantity, setQuantity] = useState(1);
  const {
    handleAddToCart: addToCartWithPersistence,
    handleAddToWishlist: addToWishlistWithPersistence
  } = usePersistence();

  // 🔥 Fetch products if page refreshed
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // 🔥 IMPORTANT: match correct id field
  const product = products.find((p: ProductType) => p.id === id);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  const handleAddToCart = async () => {
    for (let i = 0; i < quantity; i++) {
      await addToCartWithPersistence(product);
    }
  };

  const handleAddToWishlist = async () => {
    await addToWishlistWithPersistence(product);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="outline"
        onClick={() => navigate('/products')}
        className="mb-6"
      >
        ← Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <div className="text-sm text-gray-500 mb-2">{product.category}</div>

          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-xl">⭐</span>
            <span className="ml-2 text-lg">{product.rating}</span>
            <span className="ml-4 text-gray-500">
              ({product.stock} in stock)
            </span>
          </div>

          <div className="text-4xl font-bold text-blue-600 mb-6">
            ${product.price}
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>High quality materials</li>
              <li>Durable construction</li>
              <li>1-year warranty included</li>
              <li>Fast shipping available</li>
            </ul>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <label className="font-semibold">Quantity:</label>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className={`px-4 py-2 hover:bg-gray-100 ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={product.stock === 0}
              >
                -
              </button>
              <span className="px-6 py-2 border-x">{product.stock === 0 ? 0 : quantity}</span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className={`px-4 py-2 hover:bg-gray-100 ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={product.stock === 0}
              >
                +
              </button>
            </div>
          </div>

          {product.stock === 0 && (
            <div className="text-red-500 font-semibold mb-6">
              This product is out of stock.
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button size="lg" onClick={handleAddToCart} className={`flex-1 ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={product.stock === 0}>
              Add to Cart
            </Button>

            <Button size="lg" variant="outline" onClick={handleAddToWishlist}>
              ❤️ Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
