import { create } from "domain";
import L from "leaflet";

const createIcon = (svgContent: string) =>
  L.divIcon({
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        background: white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      ">
        <div style="transform: rotate(45deg);">
          ${svgContent}
        </div>
      </div>
    `,
    className: "",
    iconAnchor: [20, 40], // aim the tip of the marker below to the coordinate
    popupAnchor: [-6, -40], // popup appears above the marker
  });

export const barangayHall = createIcon(`
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    <g fill="blue">
      <path fill-rule="evenodd" d="M4.286 8L12 2l7.714 6H21v3H3V8zm6.964 1V7.75H10v-1.5h1.25V5h1.5v1.25H14v1.5h-1.25V9z" clip-rule="evenodd"/>
      <path d="M21 17v3H3v-3h2v-4.5h2V17h2v-4.5h2V17h2v-4.5h2V17h2v-4.5h2V17z"/>
    </g>
  </svg>
`);

export const healthCenter = createIcon(
  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" color="#fb542b" viewBox="0 0 24 24"><path fill="currentColor" d="M4 22h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2m12-7h-3v3h-2v-3H8v-2h3v-3h2v3h3zM9 4h6v2H9z"/></svg>`,
);
