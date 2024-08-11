import React from "react";

const DefaultButton = ({ text, onClick, styles, isArrowIcon = false }) => {
  return (
    <button
      className={`bg-red-600 text-white py-1 px-3 rounded ${styles}`}
      onClick={onClick}
    >
      {text}
      {isArrowIcon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z"
            fill="currentColor"
          ></path>
        </svg>
      )}
    </button>
  );
};

export default DefaultButton;
