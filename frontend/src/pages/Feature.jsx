import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  ChartBarIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClockIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: <ShieldCheckIcon className="w-8 h-8" />,
    title: "Enterprise Security",
    description: "SOC 2 Type II & HIPAA compliant with end-to-end encryption, audit trails, and advanced access controls.",
    highlights: ["256-bit encryption", "Multi-factor authentication", "Compliance reporting"],
    category: "Security"
  },
  {
    icon: <ChartBarIcon className="w-8 h-8" />,
    title: "Advanced Analytics",
    description: "Real-time health insights, predictive analytics, and comprehensive reporting for data-driven decisions.",
    highlights: ["Predictive modeling", "Custom dashboards", "Performance metrics"],
    category: "Analytics"
  },
  {
    icon: <UserGroupIcon className="w-8 h-8" />,
    title: "Care Team Collaboration",
    description: "Seamless communication between doctors, nurses, pharmacists, and patients with role-based permissions.",
    highlights: ["Team messaging", "Task management", "Role-based access"],
    category: "Collaboration"
  },
  {
    icon: <CloudIcon className="w-8 h-8" />,
    title: "Cloud Infrastructure",
    description: "99.9% uptime guarantee with automatic backups, disaster recovery, and global CDN for optimal performance.",
    highlights: ["99.9% uptime SLA", "Auto-scaling", "Global availability"],
    category: "Infrastructure"
  },
  {
    icon: <DocumentTextIcon className="w-8 h-8" />,
    title: "Smart Documentation",
    description: "AI-powered clinical documentation with voice-to-text, templates, and automated coding assistance.",
    highlights: ["Voice recognition", "Auto-coding", "Template library"],
    category: "Documentation"
  },
  {
    icon: <DevicePhoneMobileIcon className="w-8 h-8" />,
    title: "Omnichannel Access",
    description: "Native mobile apps, responsive web portal, and API integrations for seamless workflow continuity.",
    highlights: ["Native mobile apps", "REST API", "Third-party integrations"],
    category: "Accessibility"
  },
  {
    icon: <ClockIcon className="w-8 h-8" />,
    title: "Real-time Monitoring",
    description: "24/7 system monitoring, automated alerts, and proactive issue resolution with dedicated support.",
    highlights: ["24/7 monitoring", "Automated alerts", "Proactive support"],
    category: "Monitoring"
  },
  {
    icon: <CpuChipIcon className="w-8 h-8" />,
    title: "AI-Powered Insights",
    description: "Machine learning algorithms for clinical decision support, risk assessment, and treatment recommendations.",
    highlights: ["Clinical AI", "Risk scoring", "Treatment insights"],
    category: "AI/ML"
  }
];

const Feature = () => {
  return (
    <section
      id="features"
      className="py-24 bg-white dark:bg-gray-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-emerald-200 dark:border-emerald-800 mb-6">
            Enterprise-Grade Features
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-gray-100 mb-6">
            Built for 
            <span className="gradient-accent bg-clip-text text-transparent"> Healthcare</span>
            <br />
            Professionals
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive healthcare management platform designed to meet the demanding requirements 
            of modern healthcare organizations with enterprise-grade security and scalability.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Category Badge */}
              <div className="absolute top-4 right-4">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                  {feature.category}
                </span>
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-emerald-100 dark:border-emerald-800">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Feature Highlights */}
              <div className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
                    {highlight}
                  </div>
                ))}
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:via-emerald-500/5 group-hover:to-teal-500/10 transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 rounded-3xl border border-emerald-200 dark:border-emerald-800 p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Ready to Experience Enterprise Healthcare?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join leading healthcare organizations that trust CareSync for their critical operations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="gradient-accent text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                Request Enterprise Demo
              </button>
              <button className="border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 px-8 py-4 rounded-xl font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300">
                View Technical Specs
              </button>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { value: "99.9%", label: "Uptime SLA" },
            { value: "SOC 2", label: "Type II Certified" },
            { value: "HIPAA", label: "Compliant" },
            { value: "24/7", label: "Enterprise Support" }
          ].map((stat, index) => (
            <div key={index} className="p-6">
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Feature;
