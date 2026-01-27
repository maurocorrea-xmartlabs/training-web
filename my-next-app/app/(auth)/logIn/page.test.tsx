import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { prisma } from "@/prisma/prisma";
import LogIn from "./page";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: vi.fn(),
    replace: vi.fn(),
  }),
}));

describe("logIn page + action integration", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await prisma.user.deleteMany();
  });

  it("sign up link redirects to /signUp", async () => {
    render(<LogIn />);
    const link = screen.getByRole("link", { name: /Sign up/i });
    expect(link).toHaveAttribute("href", "signUp");
  });

  it("forgot your password link redirects to /forgotpassword", async () => {
    render(<LogIn />);
    const link = screen.getByRole("link", { name: /Forgot your password?/i });
    expect(link).toHaveAttribute("href", "/forgotpassword");
  });
});
