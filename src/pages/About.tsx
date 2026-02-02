import React from 'react';
import Card from '../components/ui/Card';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About E-Shop</h1>

      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded in 2020, E-Shop has grown from a small startup to one of
              the leading e-commerce platforms. Our mission is to provide
              quality products at affordable prices while delivering exceptional
              customer service.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe in making online shopping easy, secure, and enjoyable
              for everyone. With a vast selection of products across multiple
              categories, we're committed to being your one-stop shopping
              destination.
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-semibold text-xl mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To provide quality products and exceptional service to customers
                worldwide.
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">👁️</div>
              <h3 className="font-semibold text-xl mb-2">Our Vision</h3>
              <p className="text-gray-600">
                To become the most trusted and preferred online shopping
                platform globally.
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-semibold text-xl mb-2">Our Values</h3>
              <p className="text-gray-600">
                Integrity, quality, customer satisfaction, and continuous
                innovation.
              </p>
            </div>
          </Card>
        </div>

        <Card>
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">
                  Wide selection of high-quality products
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">
                  Competitive prices and regular discounts
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">
                  Fast and reliable shipping worldwide
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Secure payment processing</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">24/7 customer support</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">
                  Easy returns and exchanges
                </span>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
