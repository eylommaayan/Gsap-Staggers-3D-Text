// ייבוא ספריות React ו-Hooks
import React, { useEffect, useRef } from 'react';

// ייבוא הספריות GSAP ו-SplitText לאנימציות
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

// ייבוא קובץ ה-CSS עבור הסטיילינג
import './App.css';

// רישום הפלאגין SplitText ב-GSAP
gsap.registerPlugin(SplitText);

// הגדרת רכיב React בשם RotatingHeader
const RotatingHeader = ({ text }) => {
  // יצירת רפרנס עבור הכותרת
  const headerRef = useRef(null);

  // שימוש ב-useEffect כדי להפעיל את הקוד לאחר שהרכיב נטען
  useEffect(() => {
    // פונקציה לאתחול הכותרת והאנימציות
    function initHeaders() {
      // יצירת משתנה עבור הכותרת
      const header = headerRef.current;
      // מציאת האלמנט h1 בתוך הכותרת
      const original = header.querySelector("h1");
      // יצירת העתק של האלמנט h1
      const clone = original.cloneNode(true);
      // הוספת ההעתק לכותרת
      header.appendChild(clone);
      // הגדרת מיקום ההעתק בהתחלה מחוץ לתצוגה
      gsap.set(clone, { yPercent: -100 });

      // פיצול הטקסט של האלמנט המקורי וההעתק לתווים
      const originalSplit = SplitText.create(original, { type: "chars" });
      const cloneSplit = SplitText.create(clone, { type: "chars" });

      // הגדרת הגדרות כלליות לאנימציה
      const duration = 1;
      const stagger = { each: 0.02, from: "start", ease: "power2" };

      // הגדרת מיקום וסיבוב התווים של ההעתק בהתחלה
      gsap.set(cloneSplit.chars, { rotationX: -90, opacity: 0, transformOrigin: "50% 50% -50" });

      // יצירת אנימציה לסיבוב התווים של המקור וההעתק
      const tl = gsap.timeline();
      tl.to(originalSplit.chars, { duration: duration, rotationX: 90, transformOrigin: "50% 50% -50", stagger: stagger })
        .to(originalSplit.chars, { duration: duration, opacity: 0, stagger: stagger, ease: "power2.in" }, 0)
        .to(cloneSplit.chars, { opacity: 1, duration: 0.1, stagger: stagger }, 0)
        .to(cloneSplit.chars, { duration: duration, rotationX: 0, stagger: stagger }, 0)
 
    }

    // קריאת הפונקציה לאתחול הכותרת והאנימציות
    initHeaders();

  }, []);

  // החזרת ה-HTML של רכיב הכותרת
  return (
    <div className="rotatingHeader" ref={headerRef}>
      <h1>{text}</h1>
    </div>
  );
}

// הגדרת רכיב האפליקציה הראשי
const App = () => {
  // מערך של טקסטים עבור הכותרות
  const headers = ["LEARN TO MAKE", "AWARD WINNING", "TEXT EFFECTS"];

  // החזרת ה-HTML של האפליקציה עם הכותרות
  return (
    <div className="App">
      {headers.map((text, index) => (
        // יצירת רכיב RotatingHeader עבור כל טקסט במערך
        <RotatingHeader key={index} text={text} />
      ))}
    </div>
  );
}

// ייצוא רכיב האפליקציה הראשי כברירת מחדל
export default App;
