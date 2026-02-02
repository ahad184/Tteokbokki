import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const blogPosts = [
  {
    id: 1,
    title: '10 Must-Have Gadgets for 2024',
    excerpt:
      'Discover the latest tech gadgets that will revolutionize your daily life.',
    date: 'Jan 15, 2024',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500',
    author: 'John Doe',
  },
  {
    id: 2,
    title: 'Fashion Trends This Season',
    excerpt: 'Stay ahead of the curve with these fashion must-haves.',
    date: 'Jan 10, 2024',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1f57?w=500',
    author: 'Jane Smith',
  },
  {
    id: 3,
    title: 'Home Decor Ideas on a Budget',
    excerpt: 'Transform your space without breaking the bank.',
    date: 'Jan 5, 2024',
    image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=500',
    author: 'Mike Johnson',
  },
];

const Blog: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">
                {post.date} • {post.author}
              </div>
              <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Button variant="outline">Read More</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
