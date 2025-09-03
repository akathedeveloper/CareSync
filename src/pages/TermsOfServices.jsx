import React from 'react';
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  ScaleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import Footer from './Footer';
import Navbar from '../components/common/Navbar';

function TermsOfService() {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: CheckCircleIcon,
      content: [
        "By accessing and using CareSync's healthcare management platform, you accept and agree to be bound by the terms and provision of this agreement.",
        "If you do not agree to abide by the above, please do not use this service. These terms apply to all visitors, users, and others who access or use the service.",
        "We reserve the right to update these terms at any time without prior notice. Your continued use of the service constitutes acceptance of those changes."
      ]
    },
    {
      id: "description",
      title: "2. Service Description",
      icon: DocumentTextIcon,
      content: [
        "CareSync provides a comprehensive healthcare management platform that connects doctors, patients, and pharmacies in a secure digital ecosystem.",
        "Our services include but are not limited to: patient management, appointment scheduling, prescription management, medical record storage, and secure communication tools.",
        "We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. Maintenance windows and updates may temporarily affect service availability."
      ]
    },
    {
      id: "user-obligations",
      title: "3. User Obligations and Conduct",
      icon: ScaleIcon,
      content: [
        "Users must provide accurate, current, and complete information when creating accounts and using our services.",
        "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
        "Users must not use the service for any unlawful purpose or in any way that could damage, disable, or impair the service.",
        "Healthcare providers must maintain valid licenses and certifications required by their jurisdiction.",
        "All medical information shared through the platform must be accurate and up-to-date."
      ]
    },
    {
      id: "privacy-security",
      title: "4. Privacy and Data Security",
      icon: ShieldCheckIcon,
      content: [
        "CareSync is committed to protecting your privacy and maintaining HIPAA compliance for all healthcare-related information.",
        "We employ industry-standard security measures including end-to-end encryption, secure data centers, and regular security audits.",
        "Patient health information is only accessible to authorized healthcare providers involved in the patient's care.",
        "We do not sell, trade, or otherwise transfer personal health information to third parties without explicit consent, except as required by law.",
        "Users have the right to access, correct, or delete their personal information in accordance with applicable privacy laws."
      ]
    },
    {
      id: "medical-disclaimer",
      title: "5. Medical Disclaimer",
      icon: ExclamationTriangleIcon,
      content: [
        "CareSync is a platform tool and does not provide medical advice, diagnosis, or treatment recommendations.",
        "All medical decisions should be made in consultation with qualified healthcare professionals.",
        "The platform facilitates communication and information sharing but does not replace professional medical judgment.",
        "In case of medical emergencies, users should immediately contact emergency services and not rely on the platform for urgent care.",
        "We are not liable for any medical outcomes resulting from the use of information shared through our platform."
      ]
    },
    {
      id: "intellectual-property",
      title: "6. Intellectual Property Rights",
      icon: DocumentTextIcon,
      content: [
        "All content, features, and functionality of the CareSync platform are owned by CareSync and are protected by copyright, trademark, and other intellectual property laws.",
        "Users retain ownership of their medical data and information but grant CareSync a license to process and store this information to provide our services.",
        "Users may not reproduce, distribute, modify, or create derivative works of our platform without explicit written permission.",
        "All trademarks, service marks, and logos used on our platform are the property of their respective owners."
      ]
    },
    {
      id: "payment-terms",
      title: "7. Payment Terms and Billing",
      icon: InformationCircleIcon,
      content: [
        "Subscription fees are billed in advance on a monthly or annual basis as selected during registration.",
        "All fees are non-refundable except as expressly stated in these terms or required by applicable law.",
        "We reserve the right to change our pricing with 30 days' written notice to existing subscribers.",
        "Failed payments may result in service suspension until payment is received.",
        "Users are responsible for all taxes associated with their use of our services."
      ]
    },
    {
      id: "termination",
      title: "8. Account Termination",
      icon: ExclamationTriangleIcon,
      content: [
        "Either party may terminate this agreement at any time with or without cause.",
        "We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.",
        "Upon termination, users will lose access to the platform and all associated data.",
        "We will provide a reasonable opportunity for users to export their data before permanent deletion.",
        "Certain provisions of these terms will survive termination, including intellectual property rights and limitation of liability."
      ]
    },
    {
      id: "limitation-liability",
      title: "9. Limitation of Liability",
      icon: ScaleIcon,
      content: [
        "CareSync's total liability for any claims arising from these terms or use of our services shall not exceed the amount paid by the user in the 12 months preceding the claim.",
        "We are not liable for any indirect, incidental, special, consequential, or punitive damages.",
        "We do not warrant that our service will be uninterrupted, secure, or error-free.",
        "Users acknowledge that they use our service at their own risk.",
        "Some jurisdictions do not allow limitation of liability, so these limitations may not apply to all users."
      ]
    },
    {
      id: "governing-law",
      title: "10. Governing Law and Disputes",
      icon: ScaleIcon,
      content: [
        "These terms shall be governed by and construed in accordance with applicable healthcare regulations and laws.",
        "Any disputes arising from these terms or use of our services shall be resolved through binding arbitration.",
        "Users agree to resolve disputes individually and waive any right to participate in class action lawsuits.",
        "If any provision of these terms is found to be unenforceable, the remaining provisions shall remain in full force and effect."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar/>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 dark:from-emerald-400/5 dark:to-teal-400/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/10 to-blue-400/10 dark:from-teal-400/5 dark:to-blue-400/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-emerald-200 dark:border-emerald-800 mb-8">
            <DocumentTextIcon className="w-4 h-4 mr-2" />
            Legal Documentation
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-gray-100 leading-tight mb-6">
            Terms of
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Service</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto mb-8">
            Please read these terms carefully before using CareSync's healthcare management platform
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 inline-flex items-center space-x-3">
            <InformationCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <span className="text-blue-800 dark:text-blue-200 font-medium">
              Last updated: {lastUpdated}
            </span>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Table of Contents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors">
                    <section.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {section.title}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-20">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                    <section.icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {section.title}
                  </h2>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="space-y-6">
                    {section.content.map((paragraph, index) => (
                      <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">
              Questions About These Terms?
            </h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              If you have any questions about these Terms of Service, please don't hesitate to contact our legal team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="mailto:legal@caresync.com"
                className="bg-white text-emerald-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
              >
                <EnvelopeIcon className="h-5 w-5" />
                <span>support@caresync.com</span>
              </a>
              
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-emerald-600 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
              >
                <PhoneIcon className="h-5 w-5" />
                <span>Contact CareSync</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 bg-yellow-50 dark:bg-yellow-900/20 border-t border-yellow-200 dark:border-yellow-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-4">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-4">
                Important Notice
              </h3>
              <div className="space-y-3 text-yellow-700 dark:text-yellow-300">
                <p>
                  These terms constitute a legally binding agreement. By using CareSync, you acknowledge that you have read, understood, and agree to be bound by these terms.
                </p>
                <p>
                  We recommend consulting with legal counsel if you have questions about how these terms apply to your specific situation or organization.
                </p>
                <p className="font-semibold">
                  For medical emergencies, always contact emergency services immediately. Do not rely on this platform for urgent medical care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default TermsOfService;