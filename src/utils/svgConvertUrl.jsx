import React from 'react'
import ReactDOMServer from 'react-dom/server'

export default function svgConvertUrl( title ) {
    const svg = (
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
        <rect x="0" y="0" width="100%" height="100%" fill="#FFF9B2" />
            <foreignObject x="0" y="0" width="100%" height="100%">
                <div xmlns="http://www.w3.org/1999/xhtml" style={{ width:"100%", height:"100%", fontSize:"40px", display:"flex", justifyContent:"center", alignItems:"center"}}> 
                <span style={{ color:"black"}}>
                    {title}
                </span>
                </div>
            </foreignObject>
            {/* 到此一遊 */}
        </svg>
    )
    const svgStringify = ReactDOMServer.renderToString(svg);
    const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStringify);
    
    return url
}


