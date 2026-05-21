import { useEffect, useState } from "react";
import {
  firebaseEnabled,
  loginWithGoogle,
  logoutFirebase,
  subscribeAuth,
} from "../lib/firebase";
import type { User } from "firebase/auth";

export function AuthNav() {
  const [user, setUser] = useState<User | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => subscribeAuth(setUser), []);

  if (!firebaseEnabled) return null;

  const handleLogin = async () => {
    setBusy(true);
    try {
      await loginWithGoogle();
    } catch {
      alert("No se pudo iniciar sesión");
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    setBusy(true);
    try {
      await logoutFirebase();
    } finally {
      setBusy(false);
    }
  };

  return (
    <li>
      {user ? (
        <button type="button" className="nav-btn nav-auth-btn" onClick={handleLogout} disabled={busy}>
          {user.displayName?.split(" ")[0] ?? "Salir"}
        </button>
      ) : (
        <button type="button" className="nav-btn nav-auth-btn" onClick={handleLogin} disabled={busy}>
          Google
        </button>
      )}
    </li>
  );
}
