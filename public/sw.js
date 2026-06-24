self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/icons/logo.png",
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});

// listen for message from the app to show notification
self.addEventListener("message", (event) => {
  if (event.data?.type === "SHOW_NOTIFICATION") {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: "/icons/logo.png",
    });
  }
});
