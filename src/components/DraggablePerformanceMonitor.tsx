// Performance monitor disabled for production builds
// Only shows in development when explicitly enabled

export function DraggablePerformanceMonitor() {
  // Completely disabled - remove FPS monitoring overhead
  return null;
}
