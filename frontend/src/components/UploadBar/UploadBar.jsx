import React from 'react'
import './UploadBar.css'

function SVGIcon({ searching, active }) {
  return (searching && active === 'SVG') ? (
    <svg
      version="1.1"
      id="L9"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
      xmlSpace="preserve"
    >
      <path
        fill="currentColor"
        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  ) : (
    <svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h200v80H200v560h560v-214l80 80v134q0 33-23.5 56.5T760-120H200Zm40-160 120-160 90 120 120-160 150 200H240Zm622-144L738-548q-21 14-45 21t-51 7q-74 0-126-52.5T464-700q0-75 52.5-127.5T644-880q75 0 127.5 52.5T824-700q0 27-8 52t-20 46l122 122-56 56ZM644-600q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Z" />
    </svg>
  );
}

function PNGIcon({ searching, active }) {
  return (searching && active === 'PNG') ? (
    <svg
      version="1.1"
      id="L9"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
      xmlSpace="preserve"
    >
      <path
        fill="currentColor"
        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      {" "}
      <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
    </svg>
  );
}

export default function UploadBar({setUploadedSVGData, setUploadedPNGData, searching}) {
    let [currSVG, setCurrSVG] = React.useState('');
    let [active, setActive] = React.useState('');

    function checkIfSVG(value) {
      const fragment = document.createRange().createContextualFragment(value);
      const svgElement = fragment.querySelector("svg");

      if (svgElement) {
        return value;
      } else {
        alert("Please enter valid SVG code");
        return "";
      }
    }

    function handleClick() {
        let uploadedSVG = checkIfSVG(currSVG);
        setUploadedSVGData(uploadedSVG);
        setActive('SVG');
        setUploadedPNGData();
    }

    function handleChange(event) {
        setCurrSVG(event.target.value)
    }

    function handleFile(event) {
      const file = event.target.files[0];
      setUploadedPNGData(file);
      setActive('PNG');
      setUploadedSVGData('');
      setCurrSVG('');
    }
    
    return (
      <div className="uploadBar">
        <textarea
          className="uploadInput"
          onChange={handleChange}
          value={currSVG}
          disabled={active === "PNG" && searching}
        />
        <div className="uploadButtons">
          <button
            className={active === "PNG" && searching ? "disabled" : "uploadGo"}
            onClick={handleClick}
          >
            <SVGIcon searching={searching} active={active} />
          </button>
          <input
            id="uploadPNG"
            type="file"
            accept=".png"
            onChange={handleFile}
            className="uploadPNG"
          />
          <label
            htmlFor="uploadPNG"
            className={active === "SVG" && searching ? "disabled" : "uploadGo"}
          >
            <PNGIcon searching={searching} active={active} />
          </label>
        </div>
      </div>
    );
}