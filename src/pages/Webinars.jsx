import React, { useState } from 'react';
import { MagnifyingGlassIcon, CalendarIcon, ClockIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/common/Navbar';
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Webinars = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWebinar, setSelectedWebinar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [registrationEmail, setRegistrationEmail] = useState('');
  const { user } = useAuth();

  const handleRegister = (webinar) => {
    if (user) {
      setRegistrationEmail(user.email);
    }
    setSelectedWebinar(webinar);
    setShowModal(true);
  };

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to register the user
    toast.success(
      selectedWebinar.isLive
        ? 'Joining webinar session...'
        : `Successfully registered for "${selectedWebinar.title}"! Check your email for details.`
    );
    setShowModal(false);
    setSelectedWebinar(null);
    setRegistrationEmail('');
  };

  // Sample webinar data - in a real app, this would come from an API
  const webinars = [
    {
      id: 1,
      title: "Introduction to Telemedicine",
      description: "Learn the basics of telemedicine and how it's transforming healthcare delivery.",
      date: "2025-09-20",
      time: "10:00 AM EST",
      duration: "60 mins",
      speaker: "Dr. Sarah Johnson",
      category: "healthcare",
      attendees: 156,
      imageUrl: "/webinar-images/telemedicine-consultation.jpg",
      tags: ["telemedicine", "healthcare", "technology"],
      isLive: false
    },
    {
      id: 2,
      title: "Digital Health Records Management",
      description: "Best practices for managing electronic health records securely and efficiently.",
      date: "2025-09-25",
      time: "2:00 PM EST",
      duration: "45 mins",
      speaker: "Dr. Michael Chen",
      category: "technology",
      attendees: 89,
      imageUrl: "/webinar-images/digital-health-records.jpg",
      tags: ["EHR", "digital health", "security"],
      isLive: false
    },
    {
      id: 3,
      title: "Patient Care in the Digital Age",
      description: "Exploring modern approaches to patient care using digital tools and technologies.",
      date: "2025-09-15",
      time: "11:30 AM EST",
      duration: "90 mins",
      speaker: "Dr. Emily Williams",
      category: "patient-care",
      attendees: 234,
      imageUrl: "/webinar-images/digital-patient-care.jpg",
      tags: ["patient care", "digital health", "technology"],
      isLive: true
    },
    {
      id: 4,
      title: "Healthcare Cybersecurity Essentials",
      description: "Understanding and implementing cybersecurity measures in healthcare settings.",
      date: "2025-10-01",
      time: "1:00 PM EST",
      duration: "75 mins",
      speaker: "Alex Thompson",
      category: "security",
      attendees: 167,
      imageUrl: "/webinar-images/healthcare-security.jpg",
      tags: ["security", "healthcare", "technology"],
      isLive: false
    },
    {
      id: 5,
      title: "Future of Healthcare Technology",
      description: "Exploring upcoming trends and innovations in healthcare technology.",
      date: "2025-10-05",
      time: "3:00 PM EST",
      duration: "60 mins",
      speaker: "Dr. Robert Martinez",
      category: "technology",
      attendees: 312,
      imageUrl: "/webinar-images/future-healthcare.jpg",
      tags: ["innovation", "healthcare", "technology"],
      isLive: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Webinars' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'technology', name: 'Technology' },
    { id: 'patient-care', name: 'Patient Care' },
    { id: 'security', name: 'Security' }
  ];

  const filteredWebinars = webinars.filter(webinar => {
    const matchesSearch = 
      webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webinar.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webinar.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webinar.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || webinar.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 pt-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
            CareSync Webinars
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Join our expert-led webinars to stay updated with the latest in healthcare technology, 
            best practices, and industry insights.
          </p>

          {/* Search and Filter Controls */}
          <div className="max-w-4xl mx-auto mb-12 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search webinars by title, speaker, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 pl-12 pr-4 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Webinars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredWebinars.map((webinar) => (
              <div
                key={webinar.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
              >
                {/* Webinar Image */}
                <div className="relative h-48">
                  <img
                    src={webinar.imageUrl}
                    alt={webinar.title}
                    className="w-full h-full object-cover"
                  />
                  {webinar.isLive && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                      LIVE NOW
                    </span>
                  )}
                </div>

                {/* Webinar Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {webinar.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {webinar.description}
                  </p>

                  {/* Metadata */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      <span className="text-sm">{formatDate(webinar.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      <span className="text-sm">{webinar.time} • {webinar.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <UserGroupIcon className="h-5 w-5 mr-2" />
                      <span className="text-sm">{webinar.attendees} registered</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {webinar.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Speaker */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p className="text-gray-500 dark:text-gray-400">Speaker</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {webinar.speaker}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleRegister(webinar)}
                      className="gradient-accent text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg"
                    >
                      {webinar.isLive ? 'Join Now' : 'Register'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Registration Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
                <div className="fixed inset-0 transition-opacity" onClick={() => setShowModal(false)}>
                  <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                </div>

                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      {selectedWebinar?.isLive ? 'Join Webinar' : 'Register for Webinar'}
                    </h3>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-emerald-600 dark:text-emerald-400 font-medium mb-2">
                      {selectedWebinar?.title}
                    </h4>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-1">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span>{formatDate(selectedWebinar?.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      <span>{selectedWebinar?.time} • {selectedWebinar?.duration}</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitRegistration} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={registrationEmail}
                        onChange={(e) => setRegistrationEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="gradient-accent text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg"
                      >
                        {selectedWebinar?.isLive ? 'Join Now' : 'Confirm Registration'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* No Results Message */}
          {filteredWebinars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No webinars found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Webinars;