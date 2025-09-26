import { registerSW } from "virtual:pwa-register";

// Function to handle PWA updates and offline readiness
const swUpdate = registerSW({
  // Called when a new SW is available and app can be updated
  onNeedRefresh() {
    try {
      // You can customize: show a toast/banner instead of confirm
      if (window.confirm("New content available. Reload to update?")) {
        updateServiceWorker(true); // reload immediately
      }
    } catch (error) {
      console.error("Error while updating service worker:", error);
    }
  },

  // Called when the app is ready to work offline
  onOfflineReady() {
    try {
      console.log("App is ready for offline use");
    } catch (error) {
      console.error("Error in offline ready handler:", error);
    }
  },
});

// Separate function to safely update the SW
async function updateServiceWorker(reload = false) {
  try {
    if (swUpdate) {
      await swUpdate(reload); // reload = true forces page reload
      console.log("Service worker updated successfully");
    }
  } catch (error) {
    console.error("Failed to update service worker:", error);
  }
}

export default swUpdate;
