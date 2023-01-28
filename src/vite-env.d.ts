/// <reference types="vite/client" />

declare global {
  interface Window {
    gtag?: (key: string, trackingId: string, config: { page_path: string }) => void
    ym?: (key: number, action: string, params: string) => void
  }
}
