import React, { useState } from 'react';
import Card from '../components/ui/Card';

const faqs = [
  {
    question: 'What is your shipping policy?',
    answer:
      'We offer free shipping on all orders over $50. Standard shipping takes 5-7 business days, while express shipping takes 2-3 business days.',
  },
  {
    question: 'How can I track my order?',
    answer:
      "Once your order ships, you will receive a tracking number via email. You can use this number to track your package on our website or the carrier's website.",
  },
  {
    question: 'What is your return policy?',
    answer:
      'We accept returns within 30 days of purchase. Items must be unused and in their original packaging. Please contact our customer service to initiate a return.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.',
  },
  {
    question: 'How do I cancel my order?',
    answer:
      'Orders can be cancelled within 1 hour of placement. Please contact our customer service immediately if you need to cancel an order.',
  },
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Frequently Asked Questions
      </h1>
      <p className="text-gray-600 text-center mb-12">
        Find answers to common questions about our products and services
      </p>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index}>
            <button
              onClick={() => toggleFaq(index)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50"
            >
              <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
              <span className="text-2xl text-blue-600">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Still have questions?</p>
        <a
          href="mailto:support@eshop.com"
          className="text-blue-600 hover:underline font-semibold"
        >
          Contact our support team
        </a>
      </div>
    </div>
  );
};

export default Faq;
