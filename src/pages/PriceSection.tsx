import { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: 29,
      period: "/month",
      description: "Perfect for small clinics",
      features: [
        "Up to 100 patients",
        "Basic dashboard",
        "Prescription management",
        "Email support",
        "Mobile app access",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      price: 99,
      period: "/month",
      description: "Best for growing practices",
      features: [
        "Up to 1,000 patients",
        "Advanced analytics",
        "AI-powered insights",
        "Priority support",
        "API integrations",
        "Custom branding",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: 0,
      period: "",
      description: "For large healthcare systems",
      features: [
        "Unlimited patients",
        "Custom integrations",
        "Dedicated support",
        "Advanced security",
        "Custom workflows",
        "SLA guarantee",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  // ✅ Fixed: Type allows both number & string
  const [displayPrices, setDisplayPrices] = useState<(number | string)[]>(
    plans.map(() => 0)
  );

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
        }, 500); // delay for smooth fade-in
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
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            data-aos="fade-up"
            className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Simple, Transparent Pricing
          </h2>
          <p
            data-aos="fade-up"
            data-aos-duration="900"
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Choose the plan that's right for your healthcare needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 150}
              className={`flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-8 relative transform transition-transform duration-300 hover:rotate-x-2 hover:rotate-y-2 hover:scale-105 hover:shadow-xl dark:hover:shadow-gray-900/50 ${
                plan.popular ? "ring-2 ring-primary-600 scale-105" : ""
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 badge-bounce">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
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
                    className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                  >
                    <CheckIcon className="h-4 w-4 text-green-500 mr-3 tick-animate" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? "bg-primary-600 text-white hover:bg-primary-700 pulse-once"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
