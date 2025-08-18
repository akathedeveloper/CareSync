import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-950 min-h-screen py-16 px-6 lg:px-20 relative">
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-green-700 dark:text-green-300 font-semibold hover:scale-105 transition-transform"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </Link>

      {/* Page Title */}
      <h1 className="text-5xl font-extrabold text-center text-green-800 dark:text-green-200 mb-14 drop-shadow-lg">
        Our Blog
      </h1>

      {/* Blog Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {posts.map((post) => (
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
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">{post.author}</span>
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
