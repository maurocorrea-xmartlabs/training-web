import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import { vi, expect, afterEach } from "vitest";
import * as matchers from "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";

expect.extend(matchers);

// Next navigation mock
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
  redirect: vi.fn(),
}));

afterEach(() => {
  cleanup();
});
