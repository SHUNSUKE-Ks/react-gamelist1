import React, { useState } from "react";
import "../test.css";

export default function TestList() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-screen">
      <img
        src={isOpen ? "box_opened.webp" : "/box_closed.webp"}
        alt="treasure"
        className="item"
        style={{ left: "200px", top: "200px" }}
        onClick={handleToggle}
      />
    </div>
  );
}
