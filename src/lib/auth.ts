/**
 * Simulated authentication.
 *
 * The brief specifies a "simulated SSO" — no backend. We model a signed-in
 * user entirely in localStorage so every other module (history, favourites,
 * scoring) can read the current user from one place. Replace `login()` with a
 * real Cisco SSO handshake later without touching consumers.
 */

export type UserStatus =
  | "Explorer"
  | "Practitioner"
  | "Contributor"
  | "Specialist"
  | "Expert"
  | "Advisor"
  | "Strategist"
  | "Leader"
  | "Master"
  | "Visionary";

export interface User {
  name: string;
  email: string;
  /** Seller persona — drives how technical the surfaced content is. */
  role: "Solutions Engineer" | "Account Manager" | "Partner SE" | "Customer";
  status: UserStatus;
  points: number;
}

const STORAGE_KEY = "dcloud.user";

/** The demo identity returned by the simulated Cisco SSO. */
const SIMULATED_USER: User = {
  name: "Jimmy Doran",
  email: "jimmy@the-dorans.com",
  role: "Solutions Engineer",
  status: "Explorer",
  points: 0,
};

export function getUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw) as User;
    if ((user as { role: string }).role === "Sales Engineer") {
      return { ...user, role: "Solutions Engineer" };
    }
    return user;
  } catch {
    return null;
  }
}

export function isAuthed(): boolean {
  return getUser() !== null;
}

/** Simulate the Cisco SSO round-trip and persist the resulting session. */
export function login(): User {
  const existing = getUser();
  const user = existing ?? SIMULATED_USER;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}
