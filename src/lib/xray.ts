// Bookkeeping for X-ray mode (hold ⌥ / Alt).
//
// Components call `useXray("Name")` and spread the result on their root
// element. That tags the DOM node with its component name and counts how
// many times React has rendered it, so the overlay can show real numbers
// instead of made-up ones. Names are explicit on purpose: production builds
// minify function names, so reading them from React internals would show
// garbage like `<a/>`.

const renders = new Map<string, number>();

export function useXray(name: string) {
  // Counting during render is deliberately impure: it is exactly the number
  // we want to show (StrictMode in dev will double it, production won't).
  renders.set(name, (renders.get(name) ?? 0) + 1);
  return { "data-xray": name } as const;
}

export function renderCount(name: string) {
  return renders.get(name) ?? 0;
}
