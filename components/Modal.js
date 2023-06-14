import React from "react";

export default function Modal({ showModal, onClose, children }) {
  return (
    <div
      style={{
        transform: showModal ? "translateX(0%)" : "translateX(-200%)",
      }}
      className="absolute top-0 left-0 w-full h-full  z-10 transition-all duration-500"
    >
      <div className="container mx-auto max-w-2xl h-[80vh] rounded-3xl bg-gray-700 py-6 px-4 mt-3">
        <button
          onClick={() => {
           onClose(false);
          }}
          className="w-10 h-10 mb-4 font-bold rounded-full bg-gray-500"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}
