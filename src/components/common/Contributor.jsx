"use client";
import React, { useEffect, useState } from "react";
import {
  GitBranch,
  Code,
  ExternalLink,
  Trophy,
  Medal,
  Award,
  Target,
  TrendingUp,
  Check,
  Clock,
  Star,
  Flame,
} from "lucide-react";

// Simple Button component
const Button = ({ children, variant = "solid", size = "md", className = "", ...props }) => {
  const base = "inline-flex items-center justify-center rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
  const variants = {
    solid: "bg-primary text-white hover:bg-primary-dark",
    outline: "border border-white/40 text-white hover:border-white hover:bg-white/10",
    ghost: "text-white hover:text-primary",
  };
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

// Simple Badge component
const Badge = ({ children, className = "" }) => (
  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full bg-white/20 ${className}`}>
    {children}
  </span>
);

// Simple Skeleton component for loading placeholders
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-white/20 rounded ${className}`}></div>
);

const getLevelBadge = (contributions) => {
  if (contributions >= 30) {
    return {
      icon: <Trophy className="h-4 w-4 inline-block mr-1" />,
      text: "Expert",
      color: "bg-yellow-400 text-black",
    };
  } else if (contributions >= 15) {
    return {
      icon: <Medal className="h-4 w-4 inline-block mr-1" />,
      text: "Advanced",
      color: "bg-purple-600 text-white",
    };
  } else {
    return {
      icon: <Award className="h-4 w-4 inline-block mr-1" />,
      text: "Contributor",
      color: "bg-green-400 text-black",
    };
  }
};

const getRankIcon = (index) => {
  switch (index) {
    case 0:
      return <Trophy className="h-6 w-6 text-yellow-400" />;
    case 1:
      return <Medal className="h-6 w-6 text-gray-300" />;
    case 2:
      return <Award className="h-6 w-6 text-amber-500" />;
    default:
      return <span className="text-lg font-bold text-gray-400">#{index + 1}</span>;
  }
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
};

export default function Contributors() {
  const [contributors, setContributors] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [repoStats, setRepoStats] = useState({ stars: 0, forks: 0 });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const owner = "akathedeveloper";
      const repo = "CareSync";

      const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (!repoRes.ok) throw new Error("GitHub repo not found");
      const repoData = await repoRes.json();

      let allContributors = [];
      let page = 1;
      while (true) {
        const url = `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100&page=${page}`;
        const res = await fetch(url);
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) break;
        allContributors = allContributors.concat(data);
        if (data.length < 100) break;
        page++;
      }

      allContributors.sort((a, b) => b.contributions - a.contributions);

      setContributors(allContributors);
      setLastUpdated(new Date().toISOString());
      setRepoStats({
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
      });
    } catch (err) {
      setError("Failed to load contributors data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const stats = {
    total: contributors.length,
    level1: contributors.filter((c) => c.contributions >= 1 && c.contributions < 15).length,
    level2: contributors.filter((c) => c.contributions >= 15 && c.contributions < 30).length,
    level3: contributors.filter((c) => c.contributions >= 30).length,
    totalContributions: contributors.reduce((sum, c) => sum + c.contributions, 0),
    stars: repoStats.stars,
    forks: repoStats.forks,
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-primary opacity-20 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-20 right-1/4 w-[250px] h-[250px] bg-purple-500 opacity-15 blur-[120px] rounded-full"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-24 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <a
            href="https://github.com/akathedeveloper/CareSync"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-5 rounded-full bg-white/10 border border-green-500 font-semibold text-green-400 shadow-md hover:bg-white/20 transition mb-5 inline-block"
          >
            <Flame className="inline h-5 w-5 mr-1" /> Open Source on GitHub
          </a>
          <h1 className="text-4xl md:text-6xl font-extrabold my-6">
            Our Amazing <span className="text-primary">Contributors</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Meet the talented individuals who are building CareSync. Their dedication makes this open-source healthcare project possible.
          </p>
          {lastUpdated && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-gray-300 text-sm">
                  Last updated: {formatDate(lastUpdated)}
                </span>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="p-6 text-center bg-white/10 rounded-2xl border border-primary/50">
              <div className="text-3xl font-extrabold text-primary mb-2">
                {stats.total}
              </div>
              <div className="text-sm text-gray-300">Contributors</div>
            </div>
            <div className="p-6 text-center bg-white/10 rounded-2xl border border-primary/50">
              <div className="text-3xl font-extrabold text-purple-400 mb-2">
                {stats.totalContributions}
              </div>
              <div className="text-sm text-gray-300">Total Commits</div>
            </div>
            <div className="p-6 text-center bg-white/10 rounded-2xl border border-primary/50">
              <div className="text-3xl font-extrabold text-yellow-400 mb-2">
                {stats.level3}
              </div>
              <div className="text-sm text-gray-300">Experts</div>
            </div>
            <div className="p-6 text-center bg-white/10 rounded-2xl border border-primary/50">
              <div className="text-3xl font-extrabold text-blue-400 mb-2">
                {stats.level2}
              </div>
              <div className="text-sm text-gray-300">Advanced</div>
            </div>
          </div>
        </div>

        {/* Hall of Fame - Top 3 contributors */}
        {!loading && contributors.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 flex items-center justify-center gap-2">
              <Trophy className="h-8 w-8 text-yellow-400" />
              Hall of Fame - Top Contributors
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {contributors.slice(0, 3).map((contributor, index) => {
                const badge = getLevelBadge(contributor.contributions);
                return (
                  <div
                    key={contributor.id}
                    className="p-6 group relative overflow-hidden bg-white/10 border-primary/50 rounded-2xl shadow-md hover:scale-105 transition-all"
                  >
                    <div className="absolute top-4 right-4 z-10">
                      {getRankIcon(index)}
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        className="h-24 w-24 rounded-full border-4 border-primary/40 mb-4"
                      />
                      <div className="text-xl font-bold mb-1">{contributor.login}</div>
                      <div
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-black text-xs font-medium ${badge.color} shadow-lg mb-3`}
                      >
                        {badge.icon}
                        {badge.text}
                      </div>
                      <a
                        href={contributor.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-medium inline-flex items-center gap-1 hover:underline"
                      >
                        View Profile <ExternalLink className="h-4 w-4" />
                      </a>
                      <div className="mt-2 text-gray-200 text-xs">
                        {contributor.contributions} contributions
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        {!loading && contributors.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xl text-primary font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" /> Contributors Leaderboard
            </h2>
            <div className="overflow-x-auto rounded-2xl bg-white/10 p-4">
              <table className="min-w-full text-left divide-y divide-white/20 text-white rounded-2xl">
                <thead className="text-sm font-semibold">
                  <tr>
                    <th className="py-3 px-4 text-center">Rank</th>
                    <th className="py-3 px-4">Contributor</th>
                    <th className="py-3 px-4 text-center">Contributions</th>
                    <th className="py-3 px-4 text-center">Level</th>
                    <th className="py-3 px-4 text-center">Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {contributors.map((contributor, i) => {
                    const badge = getLevelBadge(contributor.contributions);
                    return (
                      <tr
                        key={contributor.id}
                        className={
                          (i % 2 === 0 ? "bg-white/5" : "") + " hover:bg-primary/5"
                        }
                      >
                        <td className="py-3 px-4 text-center font-bold">{i + 1}</td>
                        <td className="py-3 px-4 flex items-center gap-2">
                          <img
                            src={contributor.avatar_url}
                            className="h-8 w-8 rounded-full"
                            alt={contributor.login}
                          />
                          <span>{contributor.login}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {contributor.contributions}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-black text-xs font-medium ${badge.color}`}
                          >
                            {badge.icon}
                            {badge.text}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <a
                            href={contributor.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <section className="text-center mt-14 space-y-6 bg-gradient-to-br from-primary/15 via-primary/8 to-transparent backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
          <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
            Ready to Join the Adventure?
          </h3>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Every expert was once a beginner. Start your contribution journey
            today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://github.com/akathedeveloper/CareSync"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="px-8 py-3 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl">
                <Star className="w-5 h-5 mr-2" />
                Contribute on GitHub
              </Button>
            </a>
            <a
              href="https://github.com/akathedeveloper/CareSync/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="px-8 py-3 text-lg font-semibold border-2 border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
              >
                <Code className="h-5 w-5 mr-2" />
                Report an Issue
              </Button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
