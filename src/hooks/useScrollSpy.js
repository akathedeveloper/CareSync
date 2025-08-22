import { useState, useEffect } from 'react';

const useScrollSpy = (sectionIds, offset = 80) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let timeoutId;
    
    const handleScroll = () => {
      // Clear previous timeout
      clearTimeout(timeoutId);
      
      // Add small delay for smoother transitions
      timeoutId = setTimeout(() => {
        const scrollPosition = window.scrollY + offset;

        // Find which section is currently in view
        let currentSection = '';
        
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const sectionId = sectionIds[i];
          const element = document.getElementById(sectionId);
          
          if (element) {
            const elementTop = element.offsetTop;
            const elementBottom = elementTop + element.offsetHeight;
            
            if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
              currentSection = sectionId;
              break;
            }
          }
        }

        setActiveSection(currentSection);
        // Debug logging (remove in production)
        if (currentSection !== activeSection) {
          console.log('Active section changed to:', currentSection);
        }
      }, 50); // 50ms delay for smoother transitions
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Call once to set initial state
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [sectionIds, offset]);

  return activeSection;
};

export default useScrollSpy;
