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
  Zap,
  Heart,
  Users,
  ArrowRight,
  Search,
  Github,
} from "lucide-react";
import {
  Mail,
  Lock,
  Loader2,
  Eye,
  EyeOff,
  Home,
  UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Enhanced Button component with dark/light mode
const Button = ({
  children,
  variant = "solid",
  size = "md",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105";
  const variants = {
    solid:
      "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 backdrop-blur-sm",
    ghost:
      "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
  };
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
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

// Enhanced Badge component with dark/light mode
const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
    primary:
      "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30",
    secondary:
      "bg-gray-500/20 text-gray-700 dark:text-gray-300 border border-gray-500/30",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

// Enhanced Skeleton component with dark/light mode
const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg ${className}`}
  ></div>
);

const getLevelBadge = (contributions) => {
  if (contributions >= 30) {
    return {
      icon: <Trophy className="h-4 w-4" />,
      text: "Expert",
      color: "bg-gradient-to-r from-yellow-400 to-orange-500 text-black",
      level: 3,
      requirement: "30+",
    };
  } else if (contributions >= 15) {
    return {
      icon: <Medal className="h-4 w-4" />,
      text: "Advanced",
      color: "bg-gradient-to-r from-purple-400 to-purple-600 text-white",
      level: 2,
      requirement: "15-29",
    };
  } else {
    return {
      icon: <Award className="h-4 w-4" />,
      text: "Contributor",
      color: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white",
      level: 1,
      requirement: "1-14",
    };
  }
};

const getRankIcon = (rank) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-8 w-8 text-yellow-400" />;
    case 2:
      return <Medal className="h-8 w-8 text-gray-300" />;
    case 3:
      return <Award className="h-8 w-8 text-amber-500" />;
    default:
      return (
        <span className="text-2xl font-bold text-gray-400">#{rank}</span>
      );
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

// Enhanced ContributorAvatar component
const ContributorAvatar = ({ contributor, size = "md" }) => {
  const sizes = {
    sm: "h-12 w-12",
    md: "h-20 w-20",
    lg: "h-28 w-28",
  };

  return (
    <div
      className={`${sizes[size]} rounded-full overflow-hidden bg-gradient-to-r from-emerald-500/20 to-teal-500/20 flex items-center justify-center ring-4 ring-emerald-500/30 group-hover:ring-emerald-500/60 transition-all duration-300`}
    >
      <img
        src={contributor.avatar_url}
        alt={`Avatar of ${contributor.login}`}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          const fallbackDiv = e.currentTarget.nextElementSibling;
          if (fallbackDiv) {
            fallbackDiv.classList.remove("hidden");
            fallbackDiv.classList.add("flex");
          }
        }}
      />
      <div className="hidden w-full h-full items-center justify-center text-lg font-bold text-emerald-300">
        {contributor.login.charAt(0).toUpperCase()}
      </div>
    </div>
  );
};

// Loading component with dark/light mode
const LoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="p-8 text-center bg-gray-50 dark:bg-gray-900 backdrop-blur-md border border-emerald-500/20 rounded-2xl"
        >
          <Skeleton className="h-10 w-16 mx-auto mb-3" />
          <Skeleton className="h-4 w-24 mx-auto" />
        </div>
      ))}
    </div>
  </div>
);

// Error component with dark/light mode
const ErrorMessage = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 space-y-8">
    <div className="text-8xl">🚫</div>
    <div className="text-center space-y-4">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Oops! Something went wrong
      </h3>
      <p className="text-red-500 dark:text-red-400 text-lg max-w-md mx-auto">
        {error}
      </p>
    </div>
    <Button onClick={onRetry} variant="solid">
      <Zap className="h-5 w-5 mr-2" />
      Try Again
    </Button>
  </div>
);

// Stats Cards component with dark/light mode
const StatsCards = ({ stats }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
    {[
      {
        label: "Contributors",
        value: stats.total,
        color: "text-emerald-600 dark:text-emerald-400",
        icon: Users,
      },
      {
        label: "Total Commits",
        value: stats.totalContributions,
        color: "text-purple-600 dark:text-purple-400",
        icon: GitBranch,
      },
      {
        label: "Experts",
        value: stats.level3,
        color: "text-yellow-500 dark:text-yellow-400",
        icon: Trophy,
      },
      {
        label: "Advanced",
        value: stats.level2,
        color: "text-blue-500 dark:text-blue-400",
        icon: Medal,
      },
    ].map((stat, index) => (
      <div
        key={index}
        className="group p-8 text-center bg-gray-50 dark:bg-gray-900 backdrop-blur-md rounded-2xl border border-emerald-500/20 hover:border-emerald-500/40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-emerald-500/20 rounded-full group-hover:bg-emerald-500/30 transition-colors duration-300">
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
          </div>
        </div>
        <div className={`text-4xl font-black mb-2 ${stat.color}`}>
          {stat.value.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          {stat.label}
        </div>
      </div>
    ))}
  </div>
);

// Top Contributors component with dark/light mode
const TopContributors = ({ contributors }) => (
  <div className="mb-20">
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-4 flex items-center justify-center gap-3">
        <Trophy className="h-10 w-10 text-yellow-400" />
        Hall of Fame
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Celebrating our top contributors who are driving CareSync forward
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {contributors.slice(0, 3).map((contributor, index) => {
        const badge = getLevelBadge(contributor.contributions);
        return (
          <div
            key={contributor.id}
            className="group relative overflow-hidden bg-gray-50 dark:bg-gray-900 backdrop-blur-md border border-emerald-500/20 rounded-3xl hover:border-emerald-500/40 transition-all duration-500 transform hover:scale-105 hover:rotate-1"
          >
            {/* Rank badge */}
            <div className="absolute top-6 right-6 z-20">
              {getRankIcon(index)}
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <div className="relative z-10 p-8 text-center">
              <div className="relative mx-auto mb-6">
                <ContributorAvatar contributor={contributor} size="lg" />
                <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                {contributor.login}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                @{contributor.login}
              </p>

              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-lg mb-6 ${badge.color}`}
              >
                {badge.icon}
                {badge.text}
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 backdrop-blur-md rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex items-center justify-center gap-3">
                  <GitBranch className="h-6 w-6 text-emerald-400" />
                  <span className="text-3xl font-black text-emerald-400">
                    {contributor.contributions}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    contributions
                  </span>
                </div>
              </div>

              <a
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full">
                  <Github className="w-5 h-5 mr-2" />
                  View Profile
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// Level Requirements component with dark/light mode
const LevelRequirements = ({ activeLevel, setActiveLevel }) => {
  const levelRequirements = [
    {
      level: "Level 1 - Contributor",
      icon: <Award className="h-8 w-8" />,
      requirement: "1-14 contributions",
      description:
        "Welcome to the community! Every journey starts with a single contribution.",
      color: "from-emerald-500 to-teal-600",
      benefits: [
        "Community recognition",
        "Contributor badge",
        "GitHub profile visibility",
      ],
    },
    {
      level: "Level 2 - Advanced",
      icon: <Medal className="h-8 w-8" />,
      requirement: "15-29 contributions",
      description:
        "You're getting serious! Your consistent contributions are making a real impact.",
      color: "from-purple-400 to-purple-600",
      benefits: [
        "Advanced badge",
        "Priority issue assignment",
        "Code review privileges",
      ],
    },
    {
      level: "Level 3 - Expert",
      icon: <Trophy className="h-8 w-8" />,
      requirement: "30+ contributions",
      description:
        "You're a true champion! Your expertise drives the project forward.",
      color: "from-yellow-400 to-orange-500",
      benefits: [
        "Expert status",
        "Mentorship opportunities",
        "Project decision input",
      ],
    },
  ];

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-4 flex items-center justify-center gap-3">
          <Target className="h-10 w-10 text-emerald-400" />
          Contribution Levels
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Climb the ranks and earn recognition for your contributions! Here's
          how our leveling system works.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {levelRequirements.map((level, index) => (
          <div
            key={index}
            onClick={() => setActiveLevel(index + 1)}
            className={`cursor-pointer transition-all duration-500 bg-gray-50 dark:bg-gray-900 backdrop-blur-md border rounded-3xl p-8 transform hover:scale-105 ${
              activeLevel === index + 1
                ? "border-emerald-500 shadow-2xl shadow-emerald-500/20 ring-2 ring-emerald-500/30"
                : "border-emerald-500/20 hover:border-emerald-500/40"
            }`}
          >
            <div className="text-center mb-6">
              <div
                className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${level.color} flex items-center justify-center mb-6 text-white shadow-lg`}
              >
                {level.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {level.level}
              </h3>
              <p className="text-lg font-semibold text-emerald-500 dark:text-emerald-400 mb-4">
                {level.requirement}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {level.description}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Star className="h-5 w-5 text-emerald-400" />
                Benefits:
              </h4>
              <ul className="space-y-3">
                {level.benefits.map((benefit, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-emerald-400" />
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Leaderboard Table component with dark/light mode
const LeaderboardTable = ({ contributors, loading ,searchUser , setSearchUser}) => (
  <div className="mb-20">
    <div className="bg-gray-50 dark:bg-gray-900 backdrop-blur-md border border-emerald-500/20 rounded-3xl overflow-hidden">
      <div className="p-8 border-b flex item-center flex-col sm:flex-row border-emerald-500/20">
        <div className="flex-1 ">
          <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 flex items-center gap-3 mb-2">
            <TrendingUp className="h-8 w-8 text-emerald-400" />
            Contributors Leaderboard
          </h2>
          <p className="text-gray-600 ml-8 dark:text-gray-400 text-lg">
            Complete list of all contributors ranked by their contributions
          </p>
        </div>
        <div className="relative w-full max-w-md flex-1 mt-4 sm:mt-0 sm:ml-4">
          
          <Search className="absolute inset-y-0 left-4 top-3.5 flex items-center w-5 h-5 text-gray-500 dark:text-gray-300" />
          <input
            className="w-full rounded-full pl-12 pr-4 py-3 text-gray-700 dark:text-gray-100 bg-white/80 dark:bg-green-800/60 border border-green-300 dark:border-green-700 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
            type="search"
            placeholder="Search Contributer..."
            value={searchUser}
            onChange={(e) => {setSearchUser(e.target.value)}}
            
          /> 
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-8 space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-6 py-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-20 ml-auto" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr className="border-b border-emerald-500/20">
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Contributor
                </th>
                <th className="px-8 py-6 text-center text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Contributions
                </th>
                <th className="px-8 py-6 text-center text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-8 py-6 text-center text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Profile
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              {contributors.map((contributor, index) => {
                const badge = getLevelBadge(contributor.contributions);
                return (
                  <tr
                    key={contributor.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center">
                        {index < 3 ? (
                          getRankIcon(contributor.rank)
                        ) : (
                          <span className="text-xl font-bold text-gray-400">
                            #{contributor.rank}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <ContributorAvatar
                          contributor={contributor}
                          size="sm"
                        />
                        <div>
                          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            {contributor.login}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            @{contributor.login}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <Badge variant="primary" className="text-lg font-bold">
                        {contributor.contributions}
                      </Badge>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-sm ${badge.color}`}
                      >
                        {badge.icon}
                        {badge.text}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <a
                        href={contributor.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-5 w-5" />
                        </Button>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  </div>
);

export default function Contributors() {
  const [contributors, setContributors] = useState([]);
  const [searchUser , setSearchUser] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [repoStats, setRepoStats] = useState({ stars: 0, forks: 0 });
  const [activeLevel, setActiveLevel] = useState(1);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const owner = "akathedeveloper";
      const repo = "CareSync";

      const repoRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`
      );
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

      // on searching it will comes with real rank 
      const rankWiseContributors = allContributors.map((c , index) =>({
        ...c , rank : index + 1,
      }))

      setContributors(rankWiseContributors);
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
    level1: contributors.filter(
      (c) => c.contributions >= 1 && c.contributions < 15
    ).length,
    level2: contributors.filter(
      (c) => c.contributions >= 15 && c.contributions < 30
    ).length,
    level3: contributors.filter((c) => c.contributions >= 30).length,
    totalContributions: contributors.reduce(
      (sum, c) => sum + c.contributions,
      0
    ),
    stars: repoStats.stars,
    forks: repoStats.forks,
  };

  // searching contributros
  const filterContributers = contributors.filter((c) =>
    c.login.toLowerCase().includes(searchUser.toLowerCase())
  )
  console.log(filterContributers);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white relative overflow-hidden">
      {/* Background effects - subtle for light mode, more prominent for dark mode */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/20 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] bg-teal-500/10 dark:bg-teal-500/15 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[200px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-20 py-24 relative z-10">
        {/* Home Button */}
        <motion.div
          className="absolute top-6 left-6 z-20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 dark:border-gray-700/50 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 group"
          >
            <motion.div
              whileHover={{ x: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Home className="w-5 h-5" />
            </motion.div>
            <span className="font-medium text-sm">Home</span>
          </Link>
        </motion.div>
        {/* Header Section */}
        <div className="text-center mb-20">
          <a
            href="https://github.com/akathedeveloper/CareSync"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 font-bold text-emerald-600 dark:text-emerald-400 shadow-lg hover:shadow-emerald-500/20 hover:scale-105 transition-all duration-300 mb-8 backdrop-blur-md"
          >
            <Flame className="h-6 w-6" />
            Open Source on GitHub
            <ArrowRight className="h-5 w-5" />
          </a>

          <h1 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-gray-900 via-emerald-600 to-teal-600 dark:from-white dark:via-emerald-200 dark:to-teal-200 bg-clip-text text-transparent leading-tight">
            Our Amazing{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Contributors
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 font-medium">
            Meet the talented individuals who are building CareSync. Their
            dedication and passion make this open-source healthcare platform
            possible, transforming patient care one contribution at a time.
          </p>

          {/* Last Updated Banner */}
          {lastUpdated && (
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-gray-100 dark:bg-gray-800 backdrop-blur-md px-6 py-3 rounded-full border border-emerald-500/30 hover:border-emerald-500/50 transition-colors duration-300">
                <Clock className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Last updated: {formatDate(lastUpdated)}
                </span>
              </div>
            </div>
          )}

          {/* Stats Section */}
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorMessage error={error} onRetry={loadData} />
          ) : (
            <StatsCards stats={stats} />
          )}
        </div>

        {/* Level Requirements Section */}
        {!loading && !error && (
          <LevelRequirements
            activeLevel={activeLevel}
            setActiveLevel={setActiveLevel}
          />
        )}

        {/* Top Contributors Section */}
        {!loading && !error && contributors.length > 0 && (
          <TopContributors contributors={contributors} />
        )}

        {/* Leaderboard Table */}
        {!error && (
          <LeaderboardTable contributors={filterContributers} loading={loading} searchUser={searchUser} setSearchUser={setSearchUser} />
        )}

        {/* Call to Action Section */}
        <section className="text-center space-y-12 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent backdrop-blur-md rounded-3xl p-12 md:p-16 border border-emerald-500/20 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent transform -skew-y-1" />

          <div className="relative z-10">
            <div className="space-y-8 mb-12">
              <h3 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
                Ready to Join the
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                  Adventure?
                </span>
              </h3>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
                Every expert was once a beginner. Start your contribution
                journey today and become part of our amazing community building
                the future of healthcare technology!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
              <a
                href="https://github.com/akathedeveloper/CareSync"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-xl px-12 py-6 shadow-2xl"
                >
                  <Github className="w-6 h-6 mr-3" />
                  Contribute on GitHub
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </a>

              <a
                href="https://github.com/akathedeveloper/CareSync/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-xl px-12 py-6 border-2 border-emerald-500/30 hover:border-emerald-500"
                >
                  <Code className="w-6 h-6 mr-3" />
                  Find Your First Issue
                </Button>
              </a>
            </div>

            {/* Contributor Journey Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "New Contributors",
                  description:
                    'Start with "good first issue" labels to get familiar with our codebase and community.',
                  icon: Star,
                  color: "emerald",
                },
                {
                  title: "Regular Contributors",
                  description:
                    "Take on feature requests and bug fixes to level up your impact and expertise.",
                  icon: Flame,
                  color: "teal",
                },
                {
                  title: "Expert Contributors",
                  description:
                    "Lead discussions, mentor others, and help shape the future of CareSync.",
                  icon: Trophy,
                  color: "yellow",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group p-8 bg-gray-50 dark:bg-gray-900 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-emerald-500/30 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center justify-center mb-6">
                    <div
                      className={`p-4 bg-${item.color}-500/20 rounded-full group-hover:bg-${item.color}-500/30 transition-colors duration-300`}
                    >
                      <item.icon
                        className={`w-8 h-8 text-${item.color}-500 dark:text-${item.color}-400`}
                      />
                    </div>
                  </div>
                  <h4 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
