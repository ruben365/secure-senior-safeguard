/**
 * Clears all browser caches and performs a hard refresh
 * Used when clicking the brand logo to ensure a fresh, lightweight load
 */
export async function clearAllCachesAndReload(): Promise<void> {
  try {
    // 1. Clear all service worker caches
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
    }

    // 2. Clear sessionStorage (preserve localStorage for user preferences)
    sessionStorage.clear();

    // 3. Unregister all service workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(reg => reg.unregister()));
    }

    // 4. Hard reload with cache-bust parameter
    window.location.href = '/?refresh=' + Date.now();
  } catch (error) {
    // Fallback to simple hard reload if cache clearing fails
    window.location.reload();
  }
}
