import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { Icon } from "@iconify/react";

export const barangayHall = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="#042ccb" viewBox="0 0 14 14"><path fill="currentColor" fill-rule="evenodd" d="M7 .05a.75.75 0 0 0-.75.75v2.305L2.963 5.27a.5.5 0 0 0-.204.561l.001.002h8.644v-.002a.5.5 0 0 0-.203-.561L7.75 2.997V1.551h.621a.75.75 0 0 0 0-1.5zm6.242 8.51h-.196v3.934h.196a.75.75 0 0 1 0 1.5H.922a.75.75 0 0 1 0-1.5h.196V8.559H.922a.75.75 0 1 1 0-1.5h12.32a.75.75 0 0 1 0 1.5m-2.106 0h-1.25v3.934h1.25zm-7.022 0h-1.25v3.934h1.25zm3.843 3.934v-2.11a.93.93 0 1 0-1.862 0v2.11z" clip-rule="evenodd"/></svg>`,
  className: "",
  iconAnchor: [12, 12],
});

export const healthCenter = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" color="#cb2b04" viewBox="0 0 24 24"><g fill="currentColor"><path fill-rule="evenodd" d="M4.286 8L12 2l7.714 6H21v3H3V8zm6.964 1V7.75H10v-1.5h1.25V5h1.5v1.25H14v1.5h-1.25V9z" clip-rule="evenodd"/><path d="M21 17v3H3v-3h2v-4.5h2V17h2v-4.5h2V17h2v-4.5h2V17h2v-4.5h2V17z"/></g></svg>`,
  className: "",
  iconAnchor: [12, 12],
});
