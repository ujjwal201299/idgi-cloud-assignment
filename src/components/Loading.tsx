import React from "react";
import "./styles/loading.css";
import ClipLoader from "react-spinners/ClipLoader";

export const Loading: React.FC = () => {
  return (
    <div className="overlay">
      <div className="center">
        <ClipLoader size={50} />
      </div>
    </div>
  );
};
