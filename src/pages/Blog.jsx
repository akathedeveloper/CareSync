import React, { useState } from "react";

import { Link } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import EmptyState from "../components/EmptyState";

export default function Blog() {

  const posts = [

    // your posts array

  ];

  return (

    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-950 min-h-screen py-16 px-6 lg:px-20 relative">

      {/* Back Button */}

      <Link

        to="/"

        tabIndex={0}

        className="absolute top-6 left-6 flex items-center gap-2 text-green-700 dark:text-green-300 font-semibold hover:scale-105 focus:outline focus:outline-2 focus:outline-green-500 transition-transform"

      >

        <ArrowLeft className="w-5 h-5" />

        Back

      </Link>

      {/* Page Title */}

      <h1 className="text-5xl font-extrabold text-center text-green-800 dark:text-green-200 mb-14 drop-shadow-lg">

        Our Blog

      </h1>

      {/* EmptyState or Posts */}

      {posts.length === 0 ? (

        <EmptyState message="No blog posts available!" />

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">

          {posts.map((post) => (

            <div

              key={post.id}

              tabIndex={0}

              aria-label={`Read blog: ${post.title}`}

              className="bg-white dark:bg-green-800/90 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 focus:outline focus:outline-2 focus:outline-green-500 transition-all duration-300 overflow-hidden group cursor-pointer"

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

      )}

    </div>

  );

}
    

          