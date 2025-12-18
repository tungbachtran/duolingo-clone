import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./msw/server";


// MSW lifecycle
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock những thứ hay gây drama
Object.defineProperty(window, "scrollTo", { value: () => {}, writable: true });

// Mock HTMLMediaElement.play (audio exercise)
Object.defineProperty(HTMLMediaElement.prototype, "play", {
  configurable: true,
  value: async () => {},
});
