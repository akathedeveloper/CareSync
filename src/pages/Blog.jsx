import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../pages/Footer";

// Add CSS to hide scrollbar but keep functionality
const scrollbarHideStyles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const posts = [
  {
    id: 1,
    title: "The Future of Healthcare Technology",
    excerpt:
      "Discover how AI, telemedicine, and blockchain are reshaping the healthcare industry for patients and providers. Artificial intelligence is revolutionizing diagnosis accuracy, while telemedicine platforms are making healthcare accessible to remote areas. Blockchain technology ensures secure and transparent health records management, empowering both healthcare providers and patients. These technological advancements are not just changing how we deliver healthcare but are fundamentally transforming the patient experience, making it more efficient, personalized, and accessible than ever before.",
    date: "August 10, 2025",
    author: "Dr. Emily Carter",
    image:
      "https://media.licdn.com/dms/image/v2/D4D12AQEvQ8UL95lmYQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1686633384469?e=2147483647&v=beta&t=VppIEMW79Kn8ugrFP74HCsu8yUEhsjqd3ul8zaywgrQ",
  },
  {
    id: 2,
    title: "Improving Patient Care with Collaboration",
    excerpt:
      "Seamless collaboration between doctors, patients, and pharmacists can drastically improve treatment outcomes. When healthcare providers work together, they create a comprehensive care ecosystem that benefits everyone involved. Real-time communication, shared medical records, and coordinated treatment plans lead to better patient outcomes. This collaborative approach reduces medical errors, improves medication adherence, and ensures that all aspects of a patient's health are considered in their treatment journey.",
    date: "August 5, 2025",
    author: "Michael Johnson",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Heart Attack Prevention: Essential Steps for a Healthy Heart",
    excerpt:
      "Understanding and preventing heart attacks is crucial for long-term health. Regular exercise, maintaining a heart-healthy diet rich in omega-3 fatty acids, and managing stress are key preventive measures. Learn about warning signs, risk factors, and lifestyle modifications that can significantly reduce your risk of heart disease. Discover how modern technology and regular health monitoring can help you maintain optimal cardiovascular health. Our comprehensive guide includes expert advice on nutrition, exercise routines, and stress management techniques specifically designed for heart health.",
    date: "September 1, 2025",
    author: "Dr. Sarah Chen, Cardiologist",
    image:
      "https://images.unsplash.com/photo-1543333995-a78aea2eee50?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Stroke Prevention: Understanding the Signs and Risk Factors",
    excerpt:
      "Stroke prevention starts with awareness and proactive health management. This comprehensive guide covers the FAST method for recognizing stroke symptoms: Face drooping, Arm weakness, Speech difficulty, and Time to call emergency services. Learn about modifiable risk factors such as blood pressure management, lifestyle changes, and the importance of regular medical check-ups. We also discuss how advanced medical technologies are improving stroke detection and prevention strategies, along with rehabilitation approaches for stroke survivors.",
    date: "September 5, 2025",
    author: "Dr. James Wilson, Neurologist",
    image:
      "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "COVID-19 in 2025: Updated Prevention Guidelines",
    excerpt:
      "Stay informed about the latest COVID-19 prevention strategies and variants. While the pandemic has evolved, staying vigilant remains important. This article covers current vaccination recommendations, emerging treatments, and practical prevention measures. Learn about the latest air purification technologies, proper mask usage when necessary, and how to maintain a strong immune system. We also discuss long COVID management and the integration of COVID-19 prevention into regular healthcare practices.",
    date: "September 10, 2025",
    author: "Dr. Maria Rodriguez, Infectious Disease Specialist",
    image:
      "https://images.unsplash.com/photo-1584634731339-252c581abfc5?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Mental Health and Technology: Digital Wellness Solutions",
    excerpt:
      "Explore how digital health technologies are revolutionizing mental healthcare accessibility and treatment. From AI-powered therapy apps to virtual reality exposure therapy, technology is making mental health support more accessible than ever. Learn about evidence-based digital interventions, teletherapy best practices, and how to maintain digital wellness in an increasingly connected world. Discover tools for stress management, meditation, and mood tracking that can complement traditional mental health care.",
    date: "September 8, 2025",
    author: "Dr. Alex Thompson, Digital Health Psychologist",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Nutrition and Chronic Disease Management",
    excerpt:
      "The role of nutrition in managing and preventing chronic diseases cannot be overstated. This comprehensive guide explores the latest research on dietary approaches to managing conditions like diabetes, hypertension, and autoimmune disorders. Learn about anti-inflammatory foods, the gut-brain connection, and personalized nutrition plans. Discover how AI-powered meal planning and smart kitchen devices are making it easier to maintain a healthy diet tailored to your specific health needs.",
    date: "September 7, 2025",
    author: "Lisa Morgan, Clinical Nutritionist",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2940&auto=format&fit=crop",
  }
];

// Add the styles to the document
const style = document.createElement('style');
style.textContent = scrollbarHideStyles;
document.head.appendChild(style);

export default function Blog() {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null); // track the expanded card
  const [filtered, setFiltered] = useState(posts)
  const scrollContainerRef = useRef(null);

  // blogs search with 300ms delay
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filteredPosts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.author.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(filteredPosts);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search])

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 400; // Adjust this value to control scroll distance
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id); // expand or collapse card
  };

  // Reset scroll position when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br dark:from-gray-900 dark:to-gray-950 min-h-screen py-8 md:py-16 px-4 sm:px-6 lg:px-8 relative mt-16">
        {/* Back Button */}
        <Link
          to="/"
          className="fixed md:absolute z-10 mt-4 md:mt-12 top-4 md:top-6 left-4 md:left-6 flex items-center gap-2 text-green-700 dark:text-green-300 font-semibold hover:scale-105 transition-transform bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-2 md:p-0 md:bg-transparent md:dark:bg-transparent md:backdrop-blur-none"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden md:inline">Back</span>
        </Link>

        {/* Page Title */}
        <h1 className="text-5xl font-extrabold text-center text-green-800 dark:text-green-200 mb-10 drop-shadow-lg">
          Our Blog
        </h1>

        {/* Search Bar */}
        <div className="flex items-center justify-center mb-12">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search blogs by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full pl-12 pr-4 py-3 text-gray-700 dark:text-gray-100 bg-white/80 dark:bg-green-800/60 border border-green-300 dark:border-green-700 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 dark:text-gray-300" />
          </div>
        </div>

        {/* Blog Cards - Horizontal Scrolling */}
        <div className="relative max-w-7xl mx-auto">
          {/* Left scroll button */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide px-12" 
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}>
            {filtered.length > 0 ? (
              filtered.map((post) => {
                const isExpanded = expandedId === post.id;

                return (
                  <div
                    key={post.id}
                    className="rounded-2xl overflow-hidden shadow-lg 
                             bg-white/10 dark:bg-green-900/30 backdrop-blur-md 
                             border border-green-200/20 dark:border-green-700/30
                             hover:shadow-2xl hover:scale-[1.03] transition-all duration-500
                             flex-none w-[350px] snap-center"
                  >
                    {/* Image */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-60 object-cover"
                    />

                    {/* Text below image */}
                    <div className="p-6 flex flex-col gap-3">
                      <h2 className="text-2xl font-extrabold text-green-800 dark:text-green-200">
                        {post.title}
                      </h2>

                      <div className={`transition-all duration-500 ${isExpanded ? 'max-h-[1000px]' : 'max-h-24'}`}>
                        <p
                          className="text-gray-700 dark:text-gray-300"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: isExpanded ? undefined : 3,
                            WebkitBoxOrient: "vertical",
                            overflow: isExpanded ? 'visible' : 'hidden',
                          }}
                        >
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-300 mt-4">
                        <span className="font-medium">{post.author}</span>
                        <span>{post.date}</span>
                      </div>

                      <button
                        onClick={() => toggleExpand(post.id)}
                        className="mt-2 text-green-600 dark:text-green-300 font-semibold hover:underline self-start"
                      >
                        {isExpanded ? "Show Less ←" : "Read More →"}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">
                No blog posts found.
              </p>
            )}
          </div>

          {/* Right scroll button */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
