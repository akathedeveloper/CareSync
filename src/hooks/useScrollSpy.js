import { useState, useEffect } from 'react';

/**
 * Custom hook to track the currently visible section based on scroll position.
 * @param {string[]} sectionIds - Array of section element IDs to track.
 * @param {number} offset - Optional offset to adjust the scroll position check.
 * @returns {string} - The ID of the currently active section.
 */
const useScrollSpy = (sectionIds = [], offset = 80) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (!Array.isArray(sectionIds) || sectionIds.length === 0) {
      console.warn('useScrollSpy: sectionIds must be a non-empty array');
      return;
    }

    let timeoutId;

    const handleScroll = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const scrollPosition = window.scrollY + offset;
        let currentSection = '';

        // Loop through sections in reverse to find the current section
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const sectionId = sectionIds[i];
          const element = document.getElementById(sectionId);

          if (!element) {
            console.warn(`useScrollSpy: No element found with id "${sectionId}"`);
            continue;
          }

          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            currentSection = sectionId;
            break;
          }
        }

        if (currentSection !== activeSection) {
          setActiveSection(currentSection);
          // Optional: Debug log
          // console.log('Active section changed to:', currentSection);
        }
      }, 50); // debounce delay
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [sectionIds, offset, activeSection]);

  return activeSection;
};

export default useScrollSpy;
