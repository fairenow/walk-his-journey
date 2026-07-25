# Walk His Journey

A lightweight React + Vite progressive web app for tracking generic walking distance, retaining walk sessions on-device, and reviewing past walks.

## Location behavior

Walk state and every accepted distance update are persisted immediately in `localStorage`, so an interrupted or refreshed browser session can resume. The tracker remains mounted while navigating between tabs and attempts to reconnect when the page becomes visible again. The production app also registers a service worker and can be installed for a more resilient standalone experience.

Mobile web browsers do not guarantee geolocation updates after a site or installed PWA is fully closed. True closed-app background location requires a native iOS/Android application and the corresponding background-location permissions; the web interface states this limitation rather than promising unsupported behavior.

## Getting started

```bash
npm install
npm run dev
```

Run the production build with:

```bash
npm run build
```

## Tech stack
- React with React Router
- Vite bundler
- Tailwind CSS
- LocalStorage for progress and journal persistence
