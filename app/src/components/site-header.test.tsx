import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { SiteHeader } from "@/components/site-header";

vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

const mockedUseSession = vi.mocked(useSession);
const mockedSignOut = vi.mocked(signOut);
const mockedUseRouter = vi.mocked(useRouter);

function mockUnauthenticated() {
  mockedUseSession.mockReturnValue({
    data: null,
    status: "unauthenticated",
  } as unknown as ReturnType<typeof useSession>);
}

function mockAuthenticated(name?: string) {
  mockedUseSession.mockReturnValue({
    data: { user: { name } },
    status: "authenticated",
  } as unknown as ReturnType<typeof useSession>);
}

describe("SiteHeader", () => {
  const replace = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseRouter.mockReturnValue({
      replace,
    } as unknown as ReturnType<typeof useRouter>);
  });

  it("mostra el nom de l'aplicació i l'enllaç al dashboard quan no hi ha sessió", () => {
    mockUnauthenticated();

    render(<SiteHeader />);

    const link = screen.getByRole("link", { name: /sesiones/i });
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("mostra l'enllaç al dashboard també quan hi ha sessió", () => {
    mockAuthenticated("Marc Benito");

    render(<SiteHeader />);

    const link = screen.getByRole("link", { name: /sesiones/i });
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("no mostra la informació de l'usuari quan no hi ha sessió", () => {
    mockUnauthenticated();

    render(<SiteHeader />);

    expect(screen.queryByText(/salir/i)).not.toBeInTheDocument();
  });

  it("mostra el nom de l'usuari i el botó de sortir quan hi ha sessió", () => {
    mockAuthenticated("Marc Benito");

    render(<SiteHeader />);

    expect(screen.getByText("Marc Benito")).toBeInTheDocument();
    expect(screen.getByText("MB")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /salir/i })).toBeInTheDocument();
  });

  it("crida `signOut` i redirigeix a l'arrel en fer clic a Salir", async () => {
    mockAuthenticated("Marc Benito");
    mockedSignOut.mockResolvedValue(undefined as never);

    render(<SiteHeader />);

    fireEvent.click(screen.getByRole("button", { name: /salir/i }));

    expect(mockedSignOut).toHaveBeenCalledWith({ redirect: false });
    await vi.waitFor(() => expect(replace).toHaveBeenCalledWith("/"));
  });

  it("calcula una única inicial quan el nom té una sola paraula", () => {
    mockAuthenticated("ana");

    render(<SiteHeader />);

    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("es queda només amb les 2 primeres inicials quan el nom té més de dues paraules", () => {
    mockAuthenticated("Pedro Bonilla Vidal");

    render(<SiteHeader />);

    expect(screen.getByText("PB")).toBeInTheDocument();
  });

  it("no peta i no mostra cap inicial quan el nom és una cadena buida", () => {
    mockAuthenticated("");

    render(<SiteHeader />);

    const avatarFallback = document.querySelector('[class*="text-xs"]');

    expect(avatarFallback).toBeInTheDocument();
    expect(avatarFallback).toHaveTextContent("");
    expect(screen.getByRole("button", { name: /salir/i })).toBeInTheDocument();
  });

  it("no peta quan l'usuari existeix però no té nom (undefined)", () => {
    mockAuthenticated(undefined);

    render(<SiteHeader />);

    const avatarFallback = document.querySelector('[class*="text-xs"]');

    expect(avatarFallback).toBeInTheDocument();
    expect(avatarFallback).toHaveTextContent("");
    expect(screen.getByRole("button", { name: /salir/i })).toBeInTheDocument();
  });
});
