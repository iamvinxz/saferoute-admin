// lib/deviceHelper.ts
export const isMobileDevice = (): boolean => {
  return (
    window.innerWidth <= 768 ||
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
};
