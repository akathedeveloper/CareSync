import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function Pricing() {
  const { t } = useTranslation();
  const plans = [
    {
      name: t('pricing.starter', 'Starter'),
      price: 29,
      period: t('pricing.perMonth', '/month'),
      description: t('pricing.starterDesc', 'Perfect for small clinics'),
      features: [
        t('pricing.f.upTo100', 'Up to 100 patients'),
        t('pricing.f.basicDashboard', 'Basic dashboard'),
        t('pricing.f.rxManagement', 'Prescription management'),
        t('pricing.f.emailSupport', 'Email support'),
        t('pricing.f.mobileAccess', 'Mobile app access'),
      ],
      cta: t('pricing.startTrial', 'Start Free Trial'),
      popular: false,
    },
    {
      name: t('pricing.professional', 'Professional'),
      price: 99,
      period: t('pricing.perMonth', '/month'),
      description: t('pricing.professionalDesc', 'Best for growing practices'),
      features: [
        t('pricing.f.upTo1000', 'Up to 1,000 patients'),
        t('pricing.f.advancedAnalytics', 'Advanced analytics'),
        t('pricing.f.aiInsights', 'AI-powered insights'),
        t('pricing.f.prioritySupport', 'Priority support'),
        t('pricing.f.apiIntegrations', 'API integrations'),
        t('pricing.f.customBranding', 'Custom branding'),
      ],
      cta: t('pricing.startTrial', 'Start Free Trial'),
      popular: true,
    },
    {
      name: t('pricing.enterprise', 'Enterprise'),
      price: 0,
      period: "",
      description: t('pricing.enterpriseDesc', 'For large healthcare systems'),
      features: [
        t('pricing.f.unlimited', 'Unlimited patients'),
        t('pricing.f.customIntegrations', 'Custom integrations'),
        t('pricing.f.dedicatedSupport', 'Dedicated support'),
        t('pricing.f.advancedSecurity', 'Advanced security'),
        t('pricing.f.customWorkflows', 'Custom workflows'),
        t('pricing.f.sla', 'SLA guarantee'),
      ],
      cta: t('pricing.contactSales', 'Contact Sales'),
      popular: false,
    },
  ];

  const [displayPrices, setDisplayPrices] = useState(plans.map(() => 0));

  // Price counting animation
  useEffect(() => {
    plans.forEach((plan, i) => {
      if (plan.price > 0) {
        let start = 0;
        const step = plan.price / 25;
        const interval = setInterval(() => {
          start += step;
          setDisplayPrices((prev) => {
            const updated = [...prev];
            updated[i] = Math.floor(start);
            return updated;
          });
          if (start >= plan.price) clearInterval(interval);
        }, 30);
      } else {
        setTimeout(() => {
          setDisplayPrices((prev) => {
            const updated = [...prev];
            updated[i] = "Custom";
            return updated;
          });
        }, 500);
      }
    });
  }, []);

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
      <style>
        {`
          @keyframes badgeBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .badge-bounce { animation: badgeBounce 0.6s ease forwards; }

          @keyframes pulseOnce {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          .pulse-once { animation: pulseOnce 0.8s ease forwards; }

          @keyframes tickPop {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); }
          }
          .tick-animate { animation: tickPop 0.4s ease forwards; }

          @keyframes fadeInCustom {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-in-custom { animation: fadeInCustom 0.5s ease forwards; }
          
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          .pricing-card {
            position: relative;
            overflow: hidden;
            border-radius: 1rem;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            border: 2px solid transparent;
            background-clip: padding-box;
            transform: translateZ(0) scale(0.98);
            will-change: transform, box-shadow;
          }
          
          .pricing-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 1rem;
            padding: 2px;
            background: linear-gradient(45deg, #10b981, #34d399);
            -webkit-mask: 
              linear-gradient(#fff 0 0) content-box, 
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
          }
          
          .pricing-card:hover {
            transform: translateY(-12px) scale(1.05);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            z-index: 10;
          }
          
          .pricing-card:hover::before {
            opacity: 1;
          }
          
          .pricing-card:hover .popular-badge {
            animation: float 2s ease-in-out infinite;
          }
          
          .feature-item {
            transition: all 0.3s ease;
          }
          
          .pricing-card:hover .feature-item {
            transform: translateX(5px);
          }
          
          .pricing-card:hover .feature-item:nth-child(2n) {
            transition-delay: 0.1s;
          }
          
          .pricing-card:hover .feature-item:nth-child(3n) {
            transition-delay: 0.2s;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            data-aos="fade-up"
            className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            {t('pricing.title', 'Simple, Transparent Pricing')}
          </h2>
          <p
            data-aos="fade-up"
            data-aos-duration="900"
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            {t('pricing.subtitle', "Choose the plan that's right for your healthcare needs")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 150}
              className={`flex flex-col bg-white dark:bg-gray-800 p-8 relative pricing-card ${
                plan.popular ? "scale-105" : ""
              } `}
            >
              {plan.popular && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 badge-bounce popular-badge">
                  <span className="bg-emerald-400 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  {displayPrices[index] === "Custom" ? (
                    <span className="text-4xl font-bold text-gray-900 dark:text-gray-100 fade-in-custom">
                      Custom
                    </span>
                  ) : (
                    <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                      ${displayPrices[index]}
                    </span>
                  )}
                  <span className="text-gray-600 dark:text-gray-400">
                    {plan.period}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-sm text-gray-600 dark:text-gray-300 feature-item"
                  >
                    <CheckIcon className="h-4 w-4 text-green-500 mr-3 tick-animate" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`relative overflow-hidden group w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/20"
                    : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-gray-100 hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span className="transition-transform group-hover:scale-105">
                    {plan.cta}
                  </span>
                  {!plan.popular && (
                    <svg
                      className="w-4 h-4 ml-2 transition-all transform -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  )}
                </span>
                {plan.popular && (
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
