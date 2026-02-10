import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { removeFromCart, updateQuantity } from '../feature/cart/cartSlice';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, total } = useAppSelector((state) => state.cart);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started!</p>
        <Link to="/products">
          <Button>Shop Now</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <div className="p-4 flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                  <p className="text-blue-600 font-bold">${item.price}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(total * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${(total * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>

              <Link to="/products">
                <Button variant="outline" className="w-full mt-3">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
