import { UsersIcon, HeartIcon, ClockIcon, ShieldCheckIcon, BuildingOffice2Icon, CodeBracketIcon } from '@heroicons/react/24/outline';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export default function StatsSection() {
  const { isDark } = useTheme();
  const [startCount, setStartCount] = useState(false);

  // Trigger count-up only when section is visible
  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById('stats-section');
      if (section && section.getBoundingClientRect().top < window.innerHeight - 100) {
        setStartCount(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Realistic stats for an under-development healthcare application
  const stats = [
    { 
      label: 'Beta Testing Partners', 
      value: 25, 
      suffix: '+', 
      icon: BuildingOffice2Icon,
      description: 'Healthcare facilities in our pilot program'
    },
    { 
      label: 'Active Beta Users', 
      value: 150, 
      suffix: '+', 
      icon: UsersIcon,
      description: 'Healthcare professionals testing our platform'
    },
    { 
      label: 'Test Patients Onboarded', 
      value: 750, 
      suffix: '+', 
      icon: HeartIcon,
      description: 'Patients participating in our beta program'
    },
    { 
      label: 'Platform Uptime', 
      value: 99.2, 
      suffix: '%', 
      icon: ShieldCheckIcon,
      description: 'Reliability during development phase'
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" }
    })
  };

  return (
    <section 
      id="stats-section" 
      className="py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-emerald-200 dark:border-emerald-800 mb-6">
            <CodeBracketIcon className="w-4 h-4 mr-2" />
            Currently in Development
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-gray-100 mb-4">
            Building the Future of
            <span className="gradient-accent bg-clip-text text-transparent"> Healthcare</span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're working closely with healthcare professionals to create a platform that truly serves their needs. 
            Here's our progress so far.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              custom={index}
              variants={cardVariants}
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>

              {/* Animated Counter */}
              <div className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-2">
                {startCount && (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    decimals={stat.value % 1 !== 0 ? 1 : 0}
                    suffix={stat.suffix}
                  />
                )}
              </div>

              {/* Label */}
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                {stat.label}
              </div>

              {/* Description */}
              <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Development Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 p-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Join Our Beta Program
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Be among the first healthcare professionals to experience CareSync. Get early access, 
              provide feedback, and help shape the future of healthcare technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="gradient-accent text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                Request Beta Access
              </button>
              <button className="border-2 border-blue-500 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
                View Roadmap
              </button>
            </div>
          </div>
        </motion.div>

        {/* Development Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            Development Milestones
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                phase: "Phase 1", 
                title: "Core Platform", 
                status: "Completed", 
                description: "Basic user management and dashboard",
                color: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
              },
              { 
                phase: "Phase 2", 
                title: "Healthcare Features", 
                status: "In Progress", 
                description: "Patient records, prescriptions, appointments",
                color: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
              },
              { 
                phase: "Phase 3", 
                title: "AI Integration", 
                status: "Planned", 
                description: "Smart recommendations and analytics",
                color: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              }
            ].map((milestone, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">{milestone.phase}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${milestone.color}`}>
                    {milestone.status}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {milestone.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
