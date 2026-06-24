export async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      return reg;
    } catch (err) {
      console.error("SW registration failed:", err);
    }
  }
}
