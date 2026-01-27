import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { prisma } from "@/prisma/prisma";
import userEvent from "@testing-library/user-event";
import { signUpAction } from "@/app/(auth)/signUp/actions";
import * as loginActions from "./actions";
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
    expect(link).toHaveAttribute("href", "/signUp");
  });

  it("forgot your password link redirects to /forgotpassword", async () => {
    render(<LogIn />);
    const link = screen.getByRole("link", { name: /Forgot your password?/i });
    expect(link).toHaveAttribute("href", "/forgotpassword");
  });

  it("can not login with a non-existent account", async () => {
    render(<LogIn />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), "nonexistent@test.com");
    await user.type(screen.getByLabelText(/password/i), "Password#");

    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(
      await screen.findByText(/invalid email or password/i),
    ).toBeInTheDocument();

    expect(pushMock).not.toHaveBeenCalled();

    const userInDb = await prisma.user.findUnique({
      where: { email: "nonexistent@test.com" },
    });

    expect(userInDb).toBeNull();
  });

  it("can log in with an existent account", async () => {
    await signUpAction({
      name: "John Doe",
      email: "login@test.com",
      password: "Password#",
    });

    render(<LogIn />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), "login@test.com");
    await user.type(screen.getByLabelText(/password/i), "Password#");

    await user.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/");
    });

    expect(
      screen.queryByText(/invalid email or password/i),
    ).not.toBeInTheDocument();

    const userInDb = await prisma.user.findUnique({
      where: { email: "login@test.com" },
    });

    expect(userInDb).not.toBeNull();
  });

  it("can not log in with an incorrect password", async () => {
    await signUpAction({
      name: "John Doe",
      email: "wrongpass@test.com",
      password: "Password#",
    });

    render(<LogIn />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), "wrongpass@test.com");
    await user.type(screen.getByLabelText(/password/i), "WrongPassword#");

    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(
      await screen.findByText(/invalid email or password/i),
    ).toBeInTheDocument();

    expect(pushMock).not.toHaveBeenCalled();
  });

  it("can not log in with an incorrect email", async () => {
    await signUpAction({
      name: "John Doe",
      email: "email@test.com",
      password: "Password#",
    });

    render(<LogIn />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), "wrongemail@test.com");
    await user.type(screen.getByLabelText(/password/i), "Password#");

    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(
      await screen.findByText(/invalid email or password/i),
    ).toBeInTheDocument();

    expect(pushMock).not.toHaveBeenCalled();
  });

  it("should not call the action if data doesn't follow the schema rules", async () => {
    const logInSpy = vi.spyOn(loginActions, "logInAction");

    render(<LogIn />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), "email@test.com");
    await user.type(screen.getByLabelText(/password/i), "pass");

    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(
      await screen.findByText(/Invalid email or password/i),
    ).toBeInTheDocument();

    expect(logInSpy).not.toHaveBeenCalled();
  });
});
