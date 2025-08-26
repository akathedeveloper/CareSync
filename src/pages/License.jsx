import React from "react";
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ScaleIcon,
  GlobeAltIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  HeartIcon
} from "@heroicons/react/24/outline";
import Footer from "./Footer";
import Navbar from "../components/common/Navbar";

const LicensePage = () => {
  const licenseTerms = [
    {
      title: "Healthcare Data Protection",
      description: "All patient data is encrypted and HIPAA compliant",
      type: "allowed",
      icon: ShieldCheckIcon
    },
    {
      title: "Multi-Provider Access",
      description: "Licensed for use across multiple healthcare facilities",
      type: "allowed",
      icon: BuildingOfficeIcon
    },
    {
      title: "Educational Use",
      description: "Free licensing available for educational institutions",
      type: "allowed",
      icon: AcademicCapIcon
    },
    {
      title: "Commercial Redistribution",
      description: "Redistribution of the software for commercial purposes is prohibited",
      type: "restricted",
      icon: XCircleIcon
    },
    {
      title: "Source Code Modification",
      description: "Core healthcare algorithms may not be modified without authorization",
      type: "restricted",
      icon: ExclamationTriangleIcon
    },
    {
      title: "Data Export",
      description: "You retain full rights to export your healthcare data at any time",
      type: "allowed",
      icon: CheckCircleIcon
    }
  ];

  const licenseTypes = [
    {
      name: "Individual Practice",
      description: "For single healthcare providers and small clinics",
      features: ["Up to 5 users", "Basic support", "Core features"],
      price: "Free Trial Available"
    },
    {
      name: "Enterprise Healthcare",
      description: "For hospitals and large healthcare organizations",
      features: ["Unlimited users", "Priority support", "Advanced analytics", "Custom integrations"],
      price: "Custom Pricing"
    },
    {
      name: "Educational Institution",
      description: "For medical schools and training facilities",
      features: ["Student access", "Training modules", "Academic support"],
      price: "Contact for Pricing"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation Spacer */}
      <div className="pt-16"></div>
      <Navbar/>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 dark:from-emerald-400/5 dark:to-teal-400/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/10 to-blue-400/10 dark:from-teal-400/5 dark:to-blue-400/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-emerald-200 dark:border-emerald-800 mb-8">
              <ScaleIcon className="w-4 h-4 mr-2" />
              Legal & Licensing Information
            </div>

            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 dark:text-gray-100 leading-tight mb-8">
              Software
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {" "}License
              </span>
              <br />
              Agreement
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium max-w-3xl mx-auto mb-12">
              Understanding your rights and responsibilities when using the CareSync healthcare platform
            </p>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: ShieldCheckIcon,
                  title: "HIPAA Compliant",
                  description: "Full healthcare data protection"
                },
                {
                  icon: GlobeAltIcon,
                  title: "Global Access",
                  description: "Licensed for worldwide use"
                },
                {
                  icon: UserGroupIcon,
                  title: "Multi-User Support",
                  description: "Team and organization licensing"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* License Types Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-gray-100 mb-8">
              License Types
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose the licensing option that best fits your healthcare organization's needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {licenseTypes.map((license, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <HeartIcon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {license.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {license.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {license.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-2xl font-bold gradient-accent bg-clip-text text-transparent mb-6">
                    {license.price}
                  </div>

                  <button className="w-full gradient-accent text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                    Contact Sales
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* License Terms Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-gray-100 mb-8">
              License Terms & Conditions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Key terms and conditions governing your use of the CareSync platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {licenseTerms.map((term, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    term.type === 'allowed' 
                      ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                      : 'bg-red-100 dark:bg-red-900/30'
                  }`}>
                    <term.icon className={`h-6 w-6 ${
                      term.type === 'allowed' 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {term.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {term.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed License Text Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center">
                <DocumentTextIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  CareSync Software License Agreement
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Version 2.1 | Effective Date: January 2025
                </p>
              </div>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">1. Grant of License</h3>
                  <p>
                    Subject to the terms and conditions of this Agreement, CareSync Inc. grants you a non-exclusive, 
                    non-transferable license to use the CareSync healthcare management platform in accordance with 
                    your subscription plan and applicable healthcare regulations.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">2. Healthcare Compliance</h3>
                  <p>
                    This software is designed to comply with HIPAA, GDPR, and other applicable healthcare data 
                    protection regulations. Users are responsible for implementing proper safeguards and following 
                    best practices for patient data protection.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">3. Permitted Uses</h3>
                  <p>
                    You may use this software for legitimate healthcare operations including patient management, 
                    appointment scheduling, prescription management, and healthcare analytics within your licensed 
                    organization.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">4. Restrictions</h3>
                  <p>
                    You may not redistribute, sublicense, reverse engineer, or use the software for any unlawful 
                    purposes. Commercial redistribution requires separate licensing agreements.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">5. Data Ownership</h3>
                  <p>
                    You retain full ownership of all healthcare data entered into the system. CareSync provides 
                    data export capabilities to ensure you can access your data at any time.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">6. Support and Updates</h3>
                  <p>
                    Licensed users receive software updates, security patches, and technical support according to 
                    their subscription plan. Critical security updates are provided to all users regardless of plan.
                  </p>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-start space-x-3">
                <InformationCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Important Legal Notice
                  </h4>
                  <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                    This is a simplified version of our license agreement. The complete legal document 
                    contains additional terms and conditions. By using CareSync, you agree to be bound 
                    by the full license agreement available in your account dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-8">
            Questions About Licensing?
          </h2>
          <p className="text-xl text-white/90 mb-12 font-medium leading-relaxed max-w-2xl mx-auto">
            Our legal team is here to help you understand licensing options for your healthcare organization
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg shadow-xl">
              Contact Legal Team
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-emerald-600 transition-all duration-300 font-bold text-lg backdrop-blur-sm">
              Download Full License
            </button>
          </div>
        </div>
      </section>

      {/* Footer Spacer */}
      <Footer/>
    </div>
  );
};

export default LicensePage;