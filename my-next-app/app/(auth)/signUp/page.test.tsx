import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUpForm } from "@/lib/ui/forms/signUpForm";
import { prisma } from "@/prisma/prisma";
import SignUp from "./page";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: vi.fn(),
    replace: vi.fn(),
  }),
}));

vi.mock("nextjs-toast-notify", () => ({
  showToast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("SignUp form + action integration", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await prisma.user.deleteMany();
  });

  it("registers user, persists it and redirects", async () => {
    render(<SignUpForm />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@test.com");
    await user.type(screen.getByLabelText(/password/i), "Password#1");
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    let createdUser = null;

    await waitFor(async () => {
      createdUser = await prisma.user.findUnique({
        where: { email: "john@test.com" },
      });
    });

    expect(createdUser).not.toBeNull();
    expect(createdUser!.name).toBe("John Doe");
    expect(createdUser!.password).not.toBe("Password#1");

    expect(pushMock).toHaveBeenCalledWith("/logIn");
  });

  it("does not submit if username is shorter than 8 chars", async () => {
    render(<SignUpForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), "John");
    await user.type(screen.getByLabelText(/email/i), "john@test.com");
    await user.type(screen.getByLabelText(/password/i), "Password#1");
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(
      await screen.findByText(/username must have more than 8 characters/i),
    ).toBeInTheDocument();

    expect(pushMock).not.toHaveBeenCalled();

    const createdUser = await prisma.user.findUnique({
      where: { email: "john@test.com" },
    });

    expect(createdUser).toBeNull();
  });

  it("does not submit if email is invalid", async () => {
    render(<SignUpForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "invalid-email");
    await user.type(screen.getByLabelText(/password/i), "Password#1");
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(await screen.findByText(/Email must be valid/i)).toBeInTheDocument();

    expect(pushMock).not.toHaveBeenCalled();

    const createdUser = await prisma.user.findUnique({
      where: { email: "invalid-email" },
    });

    expect(createdUser).toBeNull();
  });

  it("does not submit if password is shorter than 8 characters", async () => {
    render(<SignUpForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@test.com");
    await user.type(screen.getByLabelText(/password/i), "Pass#1");
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(
      await screen.findByText(/password must have more than 8 characters/i),
    ).toBeInTheDocument();

    expect(pushMock).not.toHaveBeenCalled();

    const createdUser = await prisma.user.findUnique({
      where: { email: "john@test.com" },
    });

    expect(createdUser).toBeNull();
  });

  it("does not submit if password has no uppercase letter", async () => {
    render(<SignUpForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@test.com");
    await user.type(screen.getByLabelText(/password/i), "password#1");
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(
      await screen.findByText(
        /Password must contain at least one uppercase letter/i,
      ),
    ).toBeInTheDocument();

    expect(pushMock).not.toHaveBeenCalled();

    const createdUser = await prisma.user.findUnique({
      where: { email: "john@test.com" },
    });

    expect(createdUser).toBeNull();
  });

  it("does not submit if password has no special character", async () => {
    render(<SignUpForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@test.com");
    await user.type(screen.getByLabelText(/password/i), "Password1");
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(
      await screen.findByText(
        /Password must contain at least one special character/i,
      ),
    ).toBeInTheDocument();

    expect(pushMock).not.toHaveBeenCalled();

    const createdUser = await prisma.user.findUnique({
      where: { email: "john@test.com" },
    });

    expect(createdUser).toBeNull();
  });

  it("log in link redirects to /logIn", async () => {
    render(<SignUp />);

    const link = screen.getByRole("link", { name: /log in/i });

    expect(link).toHaveAttribute("href", "/logIn");
  });
});
