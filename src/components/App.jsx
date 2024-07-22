import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Intro from "./Intro";
import Skills from "./Skills";
import Qualifications from "./Qualifications";
import Showcase from "./Showcase";
import Testimonials from "./Testimonials";
import Contact from "./Contact";

function App() {
  const [isIntersecting, setIsIntersecting] = useState(true);

  useEffect(
    function () {
      const headerObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries.at(0);
          setIsIntersecting(entry.isIntersecting);
          console.log(isIntersecting);
          // observer.unobserve(ref.current);
        },
        {
          root: null,
          threshold: [0],
          rootMargin: "-80px",
        }
      );

      headerObserver.observe(document.querySelector("section"));

      return () => headerObserver.disconnect();
    },
    [isIntersecting]
  );
  return (
    <div>
      <Header isIntersecting={isIntersecting} />
      <Intro />
      <Skills />
      <Qualifications />
      <Showcase />
      <Testimonials />
      <Contact />
      <Footer />
      {/* <Motion /> */}
    </div>
  );
}

export default App;
