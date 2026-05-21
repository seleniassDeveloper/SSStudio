import admin from "firebase-admin";
import { env, firebaseEnabled } from "../config/env.js";

let initialized = false;

export function initFirebase() {
  if (!firebaseEnabled || initialized) return false;

  const privateKey = env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n");

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.FIREBASE_PROJECT_ID!,
      clientEmail: env.FIREBASE_CLIENT_EMAIL!,
      privateKey,
    }),
  });

  initialized = true;
  return true;
}

export function getFirebaseAuth() {
  if (!initialized) return null;
  return admin.auth();
}

export async function verifyIdToken(token: string) {
  const auth = getFirebaseAuth();
  if (!auth) return null;
  return auth.verifyIdToken(token);
}
