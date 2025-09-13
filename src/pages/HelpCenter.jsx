import React, { useState } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/common/Navbar';
import Footer from './Footer';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);

  const faqSections = [
    {
      id: 'general',
      title: 'General Questions',
      questions: [
        {
          q: 'What is CareSync?',
          a: 'CareSync is a comprehensive healthcare platform that connects patients, doctors, and pharmacists to streamline healthcare delivery and improve patient outcomes.'
        },
        {
          q: 'How do I get started with CareSync?',
          a: 'To get started, simply click the "Get Started" button and create an account. You\'ll need to select your role (patient, doctor, or pharmacist) and provide some basic information.'
        },
        {
          q: 'Is my data secure?',
          a: 'Yes, CareSync takes data security very seriously. We use industry-standard encryption and comply with HIPAA regulations to protect your personal health information.'
        }
      ]
    },
    {
      id: 'patients',
      title: 'For Patients',
      questions: [
        {
          q: 'How do I book an appointment?',
          a: 'You can book appointments through your dashboard. Simply navigate to the Appointments section, select your preferred doctor, and choose an available time slot.'
        },
        {
          q: 'Can I view my prescription history?',
          a: 'Yes, all your prescriptions are available in the Prescriptions section of your dashboard, including both current and past medications.'
        },
        {
          q: 'How do I track my health metrics?',
          a: 'Use the Health Logs section in your dashboard to record and monitor various health metrics like blood pressure, weight, and glucose levels.'
        }
      ]
    },
    {
      id: 'doctors',
      title: 'For Doctors',
      questions: [
        {
          q: 'How do I manage my schedule?',
          a: 'The Schedule section in your dashboard allows you to set your availability, manage appointments, and organize your daily calendar.'
        },
        {
          q: 'Can I access patient records securely?',
          a: 'Yes, you can securely access patient records through the Patients section. All records are encrypted and comply with privacy regulations.'
        },
        {
          q: 'How do I write digital prescriptions?',
          a: 'Digital prescriptions can be created during or after patient consultations through the Prescriptions feature in the patient\'s record.'
        }
      ]
    },
    {
      id: 'pharmacists',
      title: 'For Pharmacists',
      questions: [
        {
          q: 'How do I manage inventory?',
          a: 'Use the Inventory Management system to track stock levels, set reorder points, and manage medication expiry dates.'
        },
        {
          q: 'How do I process digital prescriptions?',
          a: 'Digital prescriptions appear in your dashboard\'s Prescriptions section. You can verify, process, and mark them as fulfilled from there.'
        },
        {
          q: 'Can I communicate with doctors directly?',
          a: 'Yes, you can communicate with doctors through the secure messaging system to clarify prescriptions or discuss medication-related concerns.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      questions: [
        {
          q: 'What browsers are supported?',
          a: 'CareSync works best on modern browsers like Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.'
        },
        {
          q: 'Is there a mobile app available?',
          a: 'Yes, CareSync is available as a progressive web app (PWA) that can be installed on your mobile device for a native app-like experience.'
        },
        {
          q: 'What should I do if I encounter technical issues?',
          a: 'For technical issues, try clearing your browser cache and refreshing the page. If problems persist, contact our support team through the Contact page.'
        }
      ]
    }
  ];

  const filteredSections = faqSections.map(section => ({
    ...section,
    questions: section.questions.filter(
      q => 
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.questions.length > 0);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 pt-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
            How can we help you?
          </h1>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 pl-12 pr-4 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
            </div>
          </div>

          {/* FAQ Sections */}
          <div className="max-w-3xl mx-auto space-y-6">
            {filteredSections.map((section) => (
              <div
                key={section.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                  <ChevronDownIcon
                    className={`w-6 h-6 text-gray-500 transition-transform duration-200 ${
                      expandedSection === section.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedSection === section.id && (
                  <div className="px-6 pb-4">
                    <div className="space-y-4">
                      {section.questions.map((qa, index) => (
                        <div key={index} className="border-t border-gray-200 dark:border-gray-700 pt-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            {qa.q}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {qa.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Can't find what you're looking for?{' '}
              <a
                href="/contact"
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HelpCenter;