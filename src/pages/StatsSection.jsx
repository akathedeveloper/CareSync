import { UsersIcon, HeartIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function StatsSection() {
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

  const stats = [
    { label: 'Healthcare Providers', value: 10000, suffix: '+', icon: UsersIcon },
    { label: 'Patients Served', value: 500000, suffix: '+', icon: HeartIcon },
    { label: 'Prescriptions Processed', value: 2000000, suffix: '+', icon: ClockIcon },
    { label: 'Uptime Guarantee', value: 99.9, suffix: '%', icon: ShieldCheckIcon },
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
    <section id="stats-section" className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center hover:scale-105 transition-transform duration-300"
              custom={index}
              variants={cardVariants}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <stat.icon className="h-10 w-10 text-primary-400" />
              </div>

              {/* Animated Counter */}
              <div className="text-3xl font-bold text-white mb-2">
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
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
