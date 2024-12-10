import React from "react";

const Footer = () => {
  return (
    <div className="bg-black text-yellow-400 py-2">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-sm">
          Made with{" "}
          <span role="img" aria-label="love">
            ❤️✨
          </span>{" "}
          by{" "}
          <a
            href="https://www.linkedin.com/in/sujay-pagam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-500 transition-colors"
          >
            Sujay Pagam
          </a>{" "}
          <span role="img" aria-label="computer">
            💻
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
