import React from "react";
import parse from "html-react-parser";
import './Preview.css'

export default function Preview({uploadedSVGData, uploadedPNGData}) {
    if(!uploadedSVGData && !uploadedPNGData) return null;
    
    function RenderSVG({uploadedSVGData}) {
        if(!uploadedSVGData) return null;
        return (
            <div className="previewImage">
                {parse(uploadedSVGData)}
            </div>
        );
    }

    function RenderPNG({uploadedPNGData}) {
      if (!uploadedPNGData) return null;
      return (
        <div className="previewImage">
            <img src={URL.createObjectURL(uploadedPNGData)}/>
        </div>
      );
    }
    
    return (
        <div className="preview">
            <span>Preview</span>
            <RenderSVG uploadedSVGData={uploadedSVGData} />
            <RenderPNG uploadedPNGData={uploadedPNGData} />
        </div>
    )
}