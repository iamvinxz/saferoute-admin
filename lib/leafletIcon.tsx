import L from "leaflet";

const createIcon = (svgContent: string) =>
  L.divIcon({
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
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
    popupAnchor: [0, -40], // popup appears above the marker
  });

export const barangayHall = createIcon(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g fill="blue">
      <path fill-rule="evenodd" d="M4.286 8L12 2l7.714 6H21v3H3V8zm6.964 1V7.75H10v-1.5h1.25V5h1.5v1.25H14v1.5h-1.25V9z" clip-rule="evenodd"/>
      <path d="M21 17v3H3v-3h2v-4.5h2V17h2v-4.5h2V17h2v-4.5h2V17h2v-4.5h2V17z"/>
    </g>
  </svg>
`);

export const healthCenter = createIcon(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="#fb542b" viewBox="0 0 24 24"><path fill="currentColor" d="M4 22h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2m12-7h-3v3h-2v-3H8v-2h3v-3h2v3h3zM9 4h6v2H9z"/></svg>`,
);

export const shelter = createIcon(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="#328315" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M12.5 20v-2.5s-1.5-1-4-1s-4 1-4 1V20m15 0v-2.5s-1.5-1-4-1a9 9 0 0 0-1.5.124m8.5-6.374l-.247-.113a20 20 0 0 1-8.942-8.104L13 1.5h-2l-.311.533a20 20 0 0 1-8.942 8.104l-.247.113V22.5h21zM8.35 14.5s-1.6-1-1.6-2.25a1.747 1.747 0 1 1 3.496 0c0 1.25-1.596 2.25-1.596 2.25zm7 0s-1.6-1-1.6-2.25a1.747 1.747 0 1 1 3.496 0c0 1.25-1.596 2.25-1.596 2.25z" stroke-width="1"/></svg>`,
);

export const mapPinIcon = L.divIcon({
  className: "",
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#df3d15" d="M12 2a9 9 0 0 1 9 9c0 3.074-1.676 5.59-3.442 7.395a20.4 20.4 0 0 1-2.876 2.416l-.426.29l-.2.133l-.377.24l-.336.205l-.416.242a1.87 1.87 0 0 1-1.854 0l-.416-.242l-.52-.32l-.192-.125l-.41-.273a20.6 20.6 0 0 1-3.093-2.566C4.676 16.589 3 14.074 3 11a9 9 0 0 1 9-9m0 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6"/></g></svg>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32], // tip of pin on the coordinate
  popupAnchor: [0, -32],
});
