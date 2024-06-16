import { useState, useEffect } from "react";

function BackToToPButton() {
  const [backToToPButton, setBackToTopButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {backToToPButton && (
        <button
          style={{
            position: "fixed",
            bottom: "50px",
            right: "35px",
            height: "50px",
            width: "50px",
            backgroundColor: "transparent",
            border: "none",
          }}
        >
          <img
            src="PokeArrowUp.png"
            alt=""
            width="50px"
            height="50px"
            onClick={scrollUp}
          />
        </button>
      )}
    </div>
  );
}

export default BackToToPButton;
