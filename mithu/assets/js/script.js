// Counter animation function
      function animateCounter(counter, target, duration) {
        let startTime = null;
        const startValue = parseInt(counter.textContent);
        
        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const currentValue = Math.floor(progress * (target - startValue) + startValue);
          counter.textContent = currentValue;
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            counter.textContent = target; // Ensure we end with the exact target
          }
        }
        
        window.requestAnimationFrame(step);
      }
      
      // Initialize counter animations on scroll
      document.addEventListener("DOMContentLoaded", function() {
        // Set up counters
        const counters = document.querySelectorAll('.counter');
        
        // Use Intersection Observer to detect when counters are visible
        const observerOptions = {
          root: null,
          rootMargin: '0px',
          threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const counter = entry.target;
              const target = parseInt(counter.getAttribute('data-target'));
              // Animate from 0 to target over 2 seconds
              animateCounter(counter, target, 2000);
              observer.unobserve(counter); // Stop observing once animation is triggered
            }
          });
        }, observerOptions);
        
        // Observe all counter elements
        counters.forEach(counter => {
          observer.observe(counter);
        });
        
        // Typing animation
        const typedTextSpan = document.querySelector(".typed-text");
        const cursorSpan = document.querySelector(".cursor");
        
        const textArray = [
          "YouTube Channel Manager",
          "Music Distributor", 
          "CMS &amp; MCN Work Specialist",
        ];
        
        const typingDelay = 100; // Delay between each character
        const erasingDelay = 50; // Delay when erasing
        const newTextDelay = 2000; // Delay between current and next text
        let textArrayIndex = 0;
        let charIndex = 0;
        
        function type() {
          if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
          } 
          else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
          }
        }
        
        function erase() {
          if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
          } 
          else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
          }
        }
        
        // Start the typing animation when the document loads
        if(textArray.length) setTimeout(type, newTextDelay + 250);
        
        // Handle expand/collapse functionality for service cards
        const expandButtons = document.querySelectorAll('.expand-btn');
        
        expandButtons.forEach(button => {
          button.addEventListener('click', function() {
            const cardBody = this.closest('.card-body');
            const expandableContent = cardBody.querySelector('.expandable-content');
            const toggleIcon = this.querySelector('.toggle-icon');
            const btnText = this.querySelector('.btn-text');
            
            // Toggle the collapse class
            expandableContent.classList.toggle('show');
            
            // Update the button text and icon
            if (expandableContent.classList.contains('show')) {
              btnText.textContent = 'Show less';
              toggleIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
              btnText.textContent = 'Learn more';
              toggleIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
          });
        });

      });
