import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import Navbar from '../components/common/Navbar';
import Footer from '../pages/Footer';

export default function Blog() {
  const [search, setSearch] = useState("");
  const posts = [
    {
      id: 1,
      title: "The Future of Healthcare Technology",
      excerpt:
        "Discover how AI, telemedicine, and blockchain are reshaping the healthcare industry for patients and providers.",
      date: "August 10, 2025",
      author: "Dr. Emily Carter",
      image: "src/assets/Screenshot 2025-08-17 225634.png",
    },
    {
      id: 2,
      title: "Improving Patient Care with Collaboration",
      excerpt:
        "Seamless collaboration between doctors, patients, and pharmacists can drastically improve treatment outcomes.",
      date: "August 5, 2025",
      author: "Michael Johnson",
      image: "src/assets/Screenshot 2025-08-17 225209.png",
    },
    {
      id: 3,
      title: "Data Security in Healthcare",
      excerpt:
        "Learn how modern encryption and compliance standards protect sensitive patient information.",
      date: "July 28, 2025",
      author: "Sophia Williams",
      image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?w=800&q=80",
    },
  ];
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br dark:from-gray-900 dark:to-gray-950 min-h-screen py-8 md:py-16 px-4 sm:px-6 lg:px-8 relative">
        {/* Back Button */}
        <Link
          to="/"
          className="fixed md:absolute z-10 mt-4 md:mt-12 top-4 md:top-6 left-4 md:left-6 flex items-center gap-2 text-green-700 dark:text-green-300 font-semibold hover:scale-105 transition-transform bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-2 md:p-0 md:bg-transparent md:dark:bg-transparent md:backdrop-blur-none"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden md:inline">Back</span>
        </Link>
        {/* Page Title */}
        <h1 className="text-5xl font-extrabold text-center text-green-800 dark:text-green-200 mb-10 drop-shadow-lg">
          Our Blog
        </h1>
        {/* Search Bar */}
        <div className="flex items-center justify-center mb-12">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search blogs by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full pl-12 pr-4 py-3 text-gray-700 dark:text-gray-100 bg-white dark:bg-green-800/80 border border-green-300 dark:border-green-700 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 dark:text-gray-300" />
          </div>
        </div>
        {/* Blog Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-green-800/90 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden group"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-green-700 dark:text-green-200 mb-3 group-hover:text-green-600">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span className="font-medium">{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                  {/* Read More Button */}
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-block text-green-600 dark:text-green-300 font-semibold hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">
              No blog posts found.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
