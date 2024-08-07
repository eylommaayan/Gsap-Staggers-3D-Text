import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import './App.css'; // הקובץ CSS שלנו

gsap.registerPlugin(ScrollTrigger, SplitText);

const RotatingHeaders = () => {
  useEffect(() => {
    const rotatingHeaders = document.querySelectorAll(".rotatingHeader");

    function initHeaders() {
      rotatingHeaders.forEach((header) => {
        let original = header.querySelector("h1");
        let clone = original.cloneNode(true);
        header.appendChild(clone);
        gsap.set(clone, { yPercent: -100 });

        let originalSplit = SplitText.create(original, { type: "chars" });
        let cloneSplit = SplitText.create(clone, { type: "chars" });

        let duration = 1;
        let stagger = { each: 0.02, from: "start", ease: "power2" };

        gsap.set(cloneSplit.chars, { rotationX: -90, opacity: 0, transformOrigin: "50% 50% -50" });
        let tl = gsap.timeline();
        tl.to(originalSplit.chars, { duration: duration, rotationX: 90, transformOrigin: "50% 50% -50", stagger: stagger })
        .to(originalSplit.chars, { duration: duration, opacity: 0, stagger: stagger, ease: "power2.in" }, 0)
        .to(cloneSplit.chars, { opacity: 1, duration: 0.1, stagger: stagger }, 0)
        .to(cloneSplit.chars, { duration: duration, rotationX: 0, stagger: stagger }, 0)
        .to(clone, { opacity: 0, duration: 0.3, ease: "power2.out" }); // הוספת אפקט easing להסתרת ה-clone
  
        ScrollTrigger.create({
          trigger: header,
          start: "top 50%",
          end: "bottom 30%",
          markers: true,
          toggleActions: "play none none reverse",
          animation: tl,
        });
      });
    }

    initHeaders();
  }, []);

  return (
    <div>
      <div className="spacer"></div>
      <div className="rotatingHeader">
        <h1>LEARN TO MAKE</h1>
      </div>
      <div className="rotatingHeader">
        <h1>AWARD WINNING</h1>
      </div>
      <div className="rotatingHeader">
        <h1>TEXT EFFECTS</h1>
      </div>
      <div className="spacer"></div>
    </div>
  );
};

export default RotatingHeaders;
