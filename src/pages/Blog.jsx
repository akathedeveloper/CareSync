import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from '../components/common/Navbar';
import Footer from '../pages/Footer'

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "The Future of Healthcare Technology",
      excerpt:
        "Discover how AI, telemedicine, and blockchain are reshaping the healthcare industry for patients and providers.",
      date: "August 10, 2025",
      author: "Dr. Emily Carter",
      image:
        "src/assets/Screenshot 2025-08-17 225634.png",
    },
    {
      id: 2,
      title: "Improving Patient Care with Collaboration",
      excerpt:
        "Seamless collaboration between doctors, patients, and pharmacists can drastically improve treatment outcomes.",
      date: "August 5, 2025",
      author: "Michael Johnson",
      image:
        "src/assets/Screenshot 2025-08-17 225209.png",
    },
    {
      id: 3,
      title: "Data Security in Healthcare",
      excerpt:
        "Learn how modern encryption and compliance standards protect sensitive patient information.",
      date: "July 28, 2025",
      author: "Sophia Williams",
      image:
        "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?w=800&q=80",
    },
  ];

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
      <h1 className="text-3xl sm:text-4xl md:text-5xl mt-16 md:mt-20 font-extrabold text-center text-emerald-600 dark:text-emerald-400 mb-8 md:mb-14 drop-shadow-lg">
        Our Blog
      </h1>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gradient-to-l dark:from-emerald-800 dark:to-teal-900 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden group"
          >
            <div className="overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 sm:h-52 object-cover transform group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-5 sm:p-6">
              <h2 className="text-xl sm:text-2xl pb-1 dark:text-emerald-100 font-bold mb-3 dark:group-hover:text-white line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed mb-4 sm:mb-5 dark:group-hover:text-white line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex justify-between text-xs dark:group-hover:text-white">
                <span className="font-medium">{post.author}</span>
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}