import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(SplitText, ScrollTrigger);

const RotatingHeader = () => {
  const headerRefs = useRef([]);

  useEffect(() => {
    headerRefs.current.forEach((header, index) => {
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
        .to(cloneSplit.chars, { duration: duration, rotationX: 0, stagger: stagger }, 0);

      ScrollTrigger.create({
        trigger: header,
        start: "top 50%",
        end: "bottom 30%",
        markers: true,
        toggleActions: "play none none reverse",
        animation: tl
      });
    });
  }, []);

  return (
    <div className="rotatingHeaders">
      <div className="rotatingHeader" ref={el => headerRefs.current[0] = el}>
        <h1>SPINNING TEXT</h1>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <RotatingHeader />
    </div>
  );
};

export default App;
