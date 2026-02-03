import React from 'react';
import HeroSection from '../components/homeSection/HeroSection';
import PopularCategories from '../components/homeSection/PopularCategories';
import WhyChooseUs from '../components/homeSection/WhyChooseUs';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <PopularCategories />
      {/* Why Choose US  */}
      <WhyChooseUs />
      {/* Features Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-semibold text-xl mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $50</p>
            </div>
            <div>
              <div className="text-4xl mb-4">💳</div>
              <h3 className="font-semibold text-xl mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure transactions</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="font-semibold text-xl mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
