import React, { useState, useEffect } from 'react';
import { 
  ShieldCheckIcon,
  UserIcon,
  KeyIcon,
  TrashIcon,
  DocumentTextIcon,
  ClockIcon,
  GlobeEuropeAfricaIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  EyeIcon,
  PencilSquareIcon,
  ArrowDownTrayIcon,
  XCircleIcon,
  InformationCircleIcon,
  LockClosedIcon,
  ScaleIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from './Footer';

const GDPRCompliance = () => {
  const [activeRight, setActiveRight] = useState(0);
  const [requestType, setRequestType] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [lastUpdated] = useState(new Date('2024-08-17'));

  const gdprPrinciples = [
    {
      title: 'Lawfulness & Fairness',
      description: 'We process personal data lawfully, fairly, and transparently',
      icon: ScaleIcon,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Purpose Limitation',
      description: 'Data is collected for specified, explicit, and legitimate purposes',
      icon: DocumentTextIcon,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Data Minimization',
      description: 'We collect only data that is adequate, relevant, and necessary',
      icon: ShieldCheckIcon,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Accuracy',
      description: 'Personal data is kept accurate and up to date',
      icon: CheckCircleIcon,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Storage Limitation',
      description: 'Data is kept only as long as necessary for the purposes',
      icon: ClockIcon,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Security',
      description: 'Appropriate technical and organizational security measures',
      icon: LockClosedIcon,
      color: 'from-red-500 to-pink-500'
    }
  ];

  const dataRights = [
    {
      title: 'Right to Information',
      description: 'Be informed about how your personal data is being used',
      icon: InformationCircleIcon,
      details: [
        'Clear privacy notices',
        'Transparent data processing',
        'Regular policy updates',
        'Contact information provided'
      ]
    },
    {
      title: 'Right of Access',
      description: 'Access your personal data and supplementary information',
      icon: EyeIcon,
      details: [
        'Request copy of personal data',
        'Information about processing',
        'Data retention periods',
        'Third-party data sharing'
      ]
    },
    {
      title: 'Right to Rectification',
      description: 'Have inaccurate personal data rectified or completed',
      icon: PencilSquareIcon,
      details: [
        'Correct inaccurate data',
        'Complete incomplete data',
        'Update outdated information',
        'Notify third parties of changes'
      ]
    },
    {
      title: 'Right to Erasure',
      description: 'Have personal data erased in certain circumstances',
      icon: TrashIcon,
      details: [
        'Data no longer necessary',
        'Withdraw consent',
        'Object to processing',
        'Unlawful processing'
      ]
    },
    {
      title: 'Right to Restrict Processing',
      description: 'Request restriction of processing in specific situations',
      icon: ExclamationTriangleIcon,
      details: [
        'Contest data accuracy',
        'Unlawful processing',
        'Data no longer needed',
        'Pending legal claims'
      ]
    },
    {
      title: 'Right to Data Portability',
      description: 'Receive personal data in a structured, commonly used format',
      icon: ArrowDownTrayIcon,
      details: [
        'Machine-readable format',
        'Transfer to another controller',
        'Direct transmission available',
        'No adverse effect on others'
      ]
    }
  ];

  const requestTypes = [
    { id: 'access', name: 'Data Access Request', icon: EyeIcon },
    { id: 'rectification', name: 'Data Correction', icon: PencilSquareIcon },
    { id: 'erasure', name: 'Data Deletion', icon: TrashIcon },
    { id: 'portability', name: 'Data Export', icon: ArrowDownTrayIcon },
    { id: 'restriction', name: 'Processing Restriction', icon: ExclamationTriangleIcon },
    { id: 'objection', name: 'Object to Processing', icon: XCircleIcon }
  ];

  const complianceMeasures = [
    {
      title: 'Data Protection by Design',
      description: 'Privacy considerations integrated into all systems from the ground up',
      icon: BuildingOfficeIcon,
      measures: [
        'Privacy impact assessments',
        'Data protection officer appointed',
        'Privacy-first architecture',
        'Regular compliance audits'
      ]
    },
    {
      title: 'Security Measures',
      description: 'Robust technical and organizational measures to protect data',
      icon: LockClosedIcon,
      measures: [
        'End-to-end encryption',
        'Access controls & authentication',
        'Regular security testing',
        'Incident response procedures'
      ]
    },
    {
      title: 'Data Processing Records',
      description: 'Comprehensive documentation of all data processing activities',
      icon: DocumentTextIcon,
      measures: [
        'Processing purpose documentation',
        'Data categories mapping',
        'Retention period schedules',
        'Third-party processor agreements'
      ]
    },
    {
      title: 'Breach Response',
      description: 'Established procedures for handling data protection incidents',
      icon: ExclamationTriangleIcon,
      measures: [
        '72-hour breach notification',
        'Risk assessment protocols',
        'Individual notification procedures',
        'Remedial action planning'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.6 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardHover = {
    scale: 1.02,
    y: -2,
    transition: { duration: 0.2, ease: "easeOut" }
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setShowRequestForm(false);
    // Show success message or redirect
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Navbar/>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 dark:from-emerald-400/10 dark:to-teal-400/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360] 
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-blue-400/20 dark:from-teal-400/10 dark:to-blue-400/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0] 
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 px-6 py-3 rounded-full text-sm font-semibold shadow-sm mb-8"
            >
              🇪🇺 GDPR Compliant Since May 2018
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-gray-100 leading-tight mb-8"
            >
              GDPR
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                {" "}Compliance
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12 font-medium"
            >
              CareSync is fully compliant with the General Data Protection Regulation (GDPR), ensuring your personal data is protected with the highest standards of privacy and security.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-base text-gray-600 dark:text-gray-400"
            >
              {["EU Data Protection Certified", "Right to Data Portability", "24/7 DPO Support"].map((text, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* GDPR Principles */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              GDPR Data Protection Principles
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              We adhere to all six fundamental principles of the GDPR
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gdprPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={cardHover}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${principle.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <principle.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {principle.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Data Rights */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Your Data Rights Under GDPR
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Exercise your rights with simple, transparent processes
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {dataRights.map((right, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={cardHover}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setActiveRight(activeRight === index ? -1 : index)}
              >
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                    <right.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {right.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {right.description}
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={false}
                  animate={{ 
                    height: activeRight === index ? 'auto' : 0,
                    opacity: activeRight === index ? 1 : 0 
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      What this includes:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {right.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircleIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Request Center */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Exercise Your Data Rights
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Submit a request to exercise any of your GDPR rights
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl"
          >
            {!showRequestForm ? (
              <div>
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Choose Your Request Type
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Select the type of data request you'd like to submit
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {requestTypes.map((type, index) => (
                    <motion.button
                      key={type.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setRequestType(type.id);
                        setShowRequestForm(true);
                      }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 transition-all duration-300 text-left group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <type.icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {type.name}
                      </h4>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-3">
                    <InformationCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Response Time
                      </h4>
                      <p className="text-blue-800 dark:text-blue-200">
                        We process all GDPR requests within 30 days as required by law. For complex requests, we may extend this by an additional 60 days with notification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Submit Your Request
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {requestTypes.find(t => t.id === requestType)?.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowRequestForm(false)}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  >
                    <XCircleIcon className="h-8 w-8" />
                  </button>
                </div>

                <form onSubmit={handleRequestSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                      Request Details
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please provide specific details about your request..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                      Identity Verification (Optional)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.png"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 dark:file:bg-emerald-900/30 file:text-emerald-700 dark:file:text-emerald-300 file:font-medium hover:file:bg-emerald-100 dark:hover:file:bg-emerald-900/50"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Upload ID document to expedite processing (optional but recommended)
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      required
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <label className="text-sm text-gray-600 dark:text-gray-300">
                      I confirm that I am the data subject or have authorization to act on their behalf
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 flex-1"
                    >
                      Submit Request
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowRequestForm(false)}
                      className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-bold text-lg hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Compliance Measures */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Our GDPR Compliance Measures
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Comprehensive safeguards to protect your personal data
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {complianceMeasures.map((measure, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={cardHover}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                    <measure.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {measure.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  {measure.description}
                </p>

                <div className="space-y-3">
                  {measure.measures.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircleIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact DPO Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-8">
                Contact Our Data Protection Officer
              </h2>
              <p className="text-xl text-white/90 mb-8 font-medium leading-relaxed">
                Have questions about GDPR compliance or need assistance with your data rights? 
                Our certified DPO is here to help you navigate data protection matters.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-white/90">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <UserIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Dr. Maria Schmidt</p>
                    <p className="text-white/80">Certified Data Protection Officer</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-white/90">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <EnvelopeIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">dpo@caresync.com</p>
                    <p className="text-white/80">Direct email for GDPR inquiries</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-white/90">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <PhoneIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">+1 (555) 123-GDPR</p>
                    <p className="text-white/80">Available Monday - Friday, 9AM - 6PM CET</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Quick GDPR Facts</h3>
              
              <div className="space-y-6">
                {[
                  { 
                    title: "30-Day Response Time",
                    description: "We respond to all GDPR requests within the legally required timeframe",
                    icon: ClockIcon 
                  },
                  { 
                    title: "Free of Charge",
                    description: "All GDPR rights can be exercised at no cost to you",
                    icon: CheckCircleIcon 
                  },
                  { 
                    title: "Secure Processing",
                    description: "All requests are handled through encrypted, secure channels",
                    icon: LockClosedIcon 
                  },
                  { 
                    title: "Identity Verification",
                    description: "We verify identity to protect against unauthorized access",
                    icon: ShieldCheckIcon 
                  }
                ].map((fact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <fact.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{fact.title}</h4>
                      <p className="text-white/80 text-sm leading-relaxed">{fact.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8"
              >
                <a href="/contact"> <button className="w-full bg-white text-emerald-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl">
                 Contact DPO Now
                </button></a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Legal Framework */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Legal Framework & Compliance
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Our comprehensive approach to GDPR compliance and data protection
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Legal Basis for Processing",
                icon: ScaleIcon,
                items: [
                  "Consent for marketing communications",
                  "Contract performance for service delivery",
                  "Legal obligation for healthcare compliance",
                  "Legitimate interest for security measures",
                  "Vital interest for emergency medical situations",
                  "Public task for public health reporting"
                ]
              },
              {
                title: "Data Categories We Process",
                icon: DocumentTextIcon,
                items: [
                  "Identity data (name, contact information)",
                  "Health and medical records",
                  "Professional credentials",
                  "Usage and technical data",
                  "Communication preferences",
                  "Payment and billing information"
                ]
              },
              {
                title: "International Transfers",
                icon: GlobeEuropeAfricaIcon,
                items: [
                  "Standard Contractual Clauses (SCCs)",
                  "Adequacy decisions where applicable",
                  "Binding Corporate Rules (BCRs)",
                  "Certification schemes compliance",
                  "Regular transfer impact assessments",
                  "Transparent transfer documentation"
                ]
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={cardHover}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                  <section.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  {section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircleIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Compliance Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl p-8"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Compliance Certifications
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We maintain the highest standards of data protection and privacy compliance
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "GDPR Certified", status: "Active", icon: "🇪🇺" },
                { name: "ISO 27001", status: "Certified", icon: "🔒" },
                { name: "HIPAA Compliant", status: "Verified", icon: "🏥" },
                { name: "SOC 2 Type II", status: "Audited", icon: "✅" }
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{cert.icon}</div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {cert.name}
                  </h4>
                  <span className="inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-sm font-medium">
                    {cert.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default GDPRCompliance;
