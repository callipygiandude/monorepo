import React from "react";
import './IconStash.css'
import IconCard from "../IconCard/IconCard";

export default function IconStash({iconData, searching, firstLoad}) {
    const exactMatch = iconData.filter(icon => icon.exactMatch)[0];
    let similarSVGs = (exactMatch) 
                        ? iconData.filter(icon => icon.id != exactMatch.id) 
                        : iconData;

    let displayText;
    if(iconData.length === 0 && !searching) {
        displayText = (firstLoad) ? "Please paste SVG." : "No icons found.";
    } else if (iconData.length > 0 && !searching) {
        if(similarSVGs.length > 0) {
            displayText = similarSVGs.length + " icons similar to input:";
        } else {
            displayText = "";
        }
    } else {
        displayText = "Searching for icons...";
    }
    function ExactMatch({ icon }) {
      if (!icon) return null;
      return (
        <div className="iconStash">
          <span className="iconAmount">Exact match found!</span>
          <div className="iconGrid">
            <IconCard
                svgsrc={icon.svgsrc}
                svgpath={icon.svgpath}
                svgname={icon.svgname}
                exactMatch={true}
                key={icon.id}
            />
          </div>
        </div>
      );
    }
    
    return (
      <div className="iconStash">
          <ExactMatch icon={exactMatch} />
        <span className="iconAmount">{displayText}</span>
        <div className="iconGrid">
          {similarSVGs.map((icon) => (
            <IconCard
              svgsrc={icon.svgsrc}
              svgpath={icon.svgpath}
              svgname={icon.svgname}
              mismatch={icon.mismatch}
              key={icon.id}
            />
          ))}
        </div>
      </div>
    );
}