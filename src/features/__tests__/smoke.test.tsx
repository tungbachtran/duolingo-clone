import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/utils/renderWithProviders";
import { expect, test } from "vitest";

function DummyLanding() {
  return (
    <main>
      <h1>Landing</h1>
      <button>Đăng nhập</button>
    </main>
  );
}

test("smoke: test runner hoạt động", () => {
  renderWithProviders(<DummyLanding />);
  expect(screen.getByRole("heading", { name: /landing/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /đăng nhập/i })).toBeInTheDocument();
});
