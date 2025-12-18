import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { createTestQueryClient } from "./createTestQueryClient";

type Options = {
  route?: string;
  queryClient?: ReturnType<typeof createTestQueryClient>;
} & Omit<RenderOptions, "wrapper">;

export function renderWithProviders(
  ui: React.ReactElement,
  { route = "/", queryClient = createTestQueryClient(), ...options }: Options = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter initialEntries={[route]}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </MemoryRouter>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}
