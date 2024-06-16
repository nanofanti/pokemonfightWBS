import { useState, useEffect } from "react";

function ScrollDownButton() {
  const [scrollToBottomButton, setScrollToBottomButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isNearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100; // Adjust threshold as needed
      setScrollToBottomButton(isNearBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initially check on component mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    const currentScrollY = window.scrollY;
    window.scrollTo({
      top: currentScrollY + 600,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {scrollToBottomButton && (
        <button
          style={{
            position: "fixed",
            bottom: "100px",
            right: "35px",
            height: "50px",
            width: "50px",
            backgroundColor: "transparent",
            border: "none",
          }}
        >
          <img
            src="PokeArrowDown.png" // Adjust image path for scroll-to-bottom
            alt=""
            width="50px"
            height="50px"
            onClick={scrollToBottom}
          />
        </button>
      )}
    </div>
  );
}

export default ScrollDownButton;
