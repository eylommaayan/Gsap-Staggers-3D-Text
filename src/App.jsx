import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import './App.css'; // עבור קובץ ה-CSS

gsap.registerPlugin(SplitText);

const RotatingHeader = () => {
  const headerRef = useRef(null);
  const tl = gsap.timeline();

  useEffect(() => {
    const header = headerRef.current;
    const original = header.querySelector("h1");
    const clone = original.cloneNode(true);
    header.appendChild(clone);

    const originalSplit = SplitText.create(original, { type: "chars" });
    const cloneSplit = SplitText.create(clone, { type: "chars" });

    const duration = 1;
    const stagger = { each: 0.02, from: "start", ease: "power2" };

    tl.to(originalSplit.chars, { duration: duration, yPercent: -100, stagger: stagger })
      .to(cloneSplit.chars, { duration: duration, yPercent: -100, stagger: stagger }, 0);
  }, [tl]);

  return (
    <div className="rotatingHeader" ref={headerRef}>
      <h1>SPINNING TEXT</h1>
    </div>
  );
}

const App = () => {
  return (
    <div className="App">
      <RotatingHeader />
    </div>
  );
}

export default App;
