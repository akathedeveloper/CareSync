import React, { useState, useEffect } from 'react';
import { StarIcon, UserGroupIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import CountUp from 'react-countup';
import { GitBranch } from "lucide-react";


const GitHubStatsSection = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startCount, setStartCount] = useState(false);

  // GitHub repository details
  const GITHUB_OWNER = "akathedeveloper";
  const GITHUB_REPO = "CareSync";

  const fetchGitHubStats = async () => {
    try {
      const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;
      
      // Fetch main repository data
      const repoResponse = await fetch(baseUrl);
      const repoData = await repoResponse.json();

      if (!repoResponse.ok) {
        throw new Error(`GitHub API Error: ${repoData.message}`);
      }

      // Fetch contributors count
      const contributorsResponse = await fetch(`${baseUrl}/contributors?per_page=1&anon=true`);
      let contributorsCount = 0;
      
      if (contributorsResponse.ok) {
        const linkHeader = contributorsResponse.headers.get('Link');
        if (linkHeader) {
          const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
          contributorsCount = lastPageMatch ? parseInt(lastPageMatch[1]) : 1;
        } else {
          const contributorsData = await contributorsResponse.json();
          contributorsCount = contributorsData.length;
        }
      }

      // Fetch pull requests count
      const pullsResponse = await fetch(`${baseUrl}/pulls?state=all&per_page=1`);
      let pullsCount = 0;
      
      if (pullsResponse.ok) {
        const linkHeader = pullsResponse.headers.get('Link');
        if (linkHeader) {
          const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
          pullsCount = lastPageMatch ? parseInt(lastPageMatch[1]) : 0;
        } else {
          const pullsData = await pullsResponse.json();
          pullsCount = pullsData.length;
        }
      }

      // Create stats array
      const fetchedStats = [
        { 
          label: 'GitHub Stars', 
          value: repoData.stargazers_count || 0, 
          suffix: '+', 
          icon: StarIcon 
        },
        { 
          label: 'Contributors', 
          value: contributorsCount, 
          suffix: '+', 
          icon: UserGroupIcon 
        },
        { 
          label: 'Open Issues', 
          value: repoData.open_issues_count || 0, 
          suffix: '', 
          icon: GitBranch 
        },
        { 
          label: 'Pull Requests', 
          value: pullsCount, 
          suffix: '+', 
          icon: CodeBracketIcon 
        },
      ];

      setStats(fetchedStats);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching GitHub stats:', err);
      setError(err.message);
      setLoading(false);
      
      // Fallback to static data if API fails
      setStats([
        { label: 'GitHub Stars', value: 26, suffix: '+', icon: StarIcon },
        { label: 'Contributors', value: 35, suffix: '+', icon: UserGroupIcon },
        { label: 'Open Issues', value: 31, suffix: '', icon: GitBranchIcon },
        { label: 'Pull Requests', value: 63, suffix: '+', icon: CodeBracketIcon },
      ]);
    }
  };

  useEffect(() => {
    fetchGitHubStats();
    
    // Optional: Set up interval to refresh data periodically
    const interval = setInterval(fetchGitHubStats, 300000); // Refresh every 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById('github-stats');
      if (section && section.getBoundingClientRect().top < window.innerHeight - 100) {
        setStartCount(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (loading) {
    return (
      <div className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Our Open Source Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Loading real-time GitHub statistics...
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[1,2,3,4].map((index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 animate-pulse">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl mx-auto mb-6"></div>
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="github-stats" className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Our Open Source Impact
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Real-time statistics from our GitHub repository
          </p>
          {error && (
            <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
              ⚠️ Using cached data due to API limitations
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-emerald-50 group-hover:to-teal-50 dark:group-hover:from-emerald-900/20 dark:group-hover:to-teal-900/20">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-gray-100 mb-3">
                  {startCount && (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      suffix={stat.suffix}
                    />
                  )}
                </div>
                
                <div className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            View Live Stats on GitHub
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStatsSection;
