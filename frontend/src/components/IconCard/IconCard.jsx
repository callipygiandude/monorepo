import React from "react";
import './IconCard.css'
import parse from 'html-react-parser'

export default function IconCard({svgsrc, svgname, svgpath, exactMatch}) {
    let className = "iconCard"
    if(exactMatch)
        className = "iconCardGold"
    return (
        <div className={className}>
            <div className="iconImage">
                {parse(svgsrc)}
                {/* <img src={svgpath}></img> */}
            </div>
            <div className="iconName">
                <span>{svgname}</span>
            </div>
        </div>
    )
}