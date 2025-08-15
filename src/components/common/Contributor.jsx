import React, { useEffect, useState } from "react";

const Contributor = () => {
  const [stats, setStats] = useState({
    stars: 0,
    forks: 0,
    contributors: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const owner = "akathedeveloper"; // Replace with your repo owner
        const repo = "CareSync"; // Replace with your repo name

        // 1. Fetch repo data (stars, forks)
        const repoRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`
        );
        const repoData = await repoRes.json();

        // 2. Fetch contributors data
        const contributorsRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`
        );
        const contributorsData = await contributorsRes.json();

        setStats({
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          contributors: contributorsData.length,
        });
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Join Our Healthcare{" "}
          <span className="gradient-accent-alt bg-clip-text text-transparent">
            Community
          </span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Built by healthcare professionals and developers, for the healthcare
          community
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* 100% Free Open Source */}
        <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-100 dark:hover:shadow-green-900/20 hover:-translate-y-1">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            100% Free
          </h3>
          <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
            Open Source
          </h4>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            MIT Licensed, free forever for healthcare providers
          </p>
        </div>

        {/* Active Contributors */}
        <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-100 dark:hover:shadow-green-900/20 hover:-translate-y-1">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {stats.contributors}+ Active
          </h3>
          <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
            Contributors
          </h4>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Healthcare professionals and developers worldwide
          </p>
        </div>

        {/* GitHub Activity */}
        <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-100 dark:hover:shadow-green-900/20 hover:-translate-y-1">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {stats.stars} <span className="text-yellow-500">⭐</span>{" "}
            {stats.forks} Forks
          </h3>
          <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
            GitHub Activity
          </h4>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Active development and community support
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
  <button className="group gradient-accent-alt text-white px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-green-200 dark:shadow-green-900/30 hover:shadow-xl hover:shadow-green-300 dark:hover:shadow-green-900/50 flex items-center gap-3 font-medium">
          {/* <Code className="w-5 h-5 group-hover:rotate-12 transition-transform" /> */}
          Contribute on GitHub
        </button>

        <button className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-green-600 dark:text-green-400 px-8 py-4 rounded-xl border border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 shadow-lg shadow-green-100 dark:shadow-green-900/20 hover:shadow-xl hover:shadow-green-200 dark:hover:shadow-green-900/40 flex items-center gap-3 font-medium">
          {/* <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" /> */}
          Report Issues
        </button>
      </div>
    </div>
  );
};

export default Contributor;
