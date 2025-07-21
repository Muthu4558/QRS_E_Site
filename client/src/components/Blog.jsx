import { motion } from 'framer-motion';

const blogs = [
  {
    title: "The Rise of Online Shopping in 2025",
    excerpt: "Explore how e-commerce is transforming the way people shop and why it's here to stay...",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRreDOuVhmRz8sTFWE7eP9zGxVQwq644CeACA&s",
    link: "#"
  },
  {
    title: "Top 10 Tips to Boost Your E-Commerce Sales",
    excerpt: "Want to scale your e-store revenue? Learn actionable tips to increase conversions and customer trust.",
    image: "https://cdn.prod.website-files.com/637610b6e8be873142dadb34/63e2302ae1684903276c313e_Blog-image-website-increase-sales.png",
    link: "#"
  },
  {
    title: "How AI is Shaping the Future of Retail",
    excerpt: "AI-driven recommendations and chatbots are redefining how customers experience online shopping.",
    image: "https://www.retailbiz.com.au/wp-content/uploads/2019/03/iStock-1067359184-1.jpg",
    link: "#"
  }
];

const Blog = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-4">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">E-Commerce Insights & Tips</h1>
        <p className="text-gray-600 text-lg">Stay ahead of the digital shopping trends with our latest blogs curated for you.</p>
      </div>

      {/* Blog Cards */}
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            className="bg-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <a
                href={blog.link}
                className="text-purple-600 hover:text-purple-800 font-medium transition"
              >
                Read more →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;