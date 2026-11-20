import * as Crypto from "expo-crypto";
import { KEYS, loadData, saveData } from "./storage";
import { User } from "../types";

async function hashPassword(password: string, salt: string): Promise<string> {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    salt + password
  );
}

export async function registerUser(
  username: string,
  email: string,
  password: string
): Promise<User> {
  const users = await loadData<User[]>(KEYS.users, []);
  const cleanEmail = email.trim().toLowerCase();

  if (users.some((u) => u.email === cleanEmail)) {
    throw new Error("An account with this email already exists");
  }

  const salt = Crypto.randomUUID();
  const user: User = {
    id: Crypto.randomUUID(),
    username: username.trim(),
    email: cleanEmail,
    salt,
    passwordHash: await hashPassword(password, salt),
  };

  await saveData(KEYS.users, [...users, user]);
  return user;
}

export type ProfileUpdate = {
  username: string;
  email: string;
  currentPassword: string;
  newPassword?: string;
};

export async function updateUser(
  userId: string,
  update: ProfileUpdate
): Promise<User> {
  const users = await loadData<User[]>(KEYS.users, []);
  const existing = users.find((u) => u.id === userId);
  if (!existing) throw new Error("User not found");

  const currentHash = await hashPassword(update.currentPassword, existing.salt);
  if (currentHash !== existing.passwordHash) {
    throw new Error("Current password is incorrect");
  }

  const cleanEmail = update.email.trim().toLowerCase();
  if (users.some((u) => u.id !== userId && u.email === cleanEmail)) {
    throw new Error("Another account already uses this email");
  }

  let salt = existing.salt;
  let passwordHash = existing.passwordHash;
  if (update.newPassword) {
    salt = Crypto.randomUUID();
    passwordHash = await hashPassword(update.newPassword, salt);
  }

  const updated: User = {
    ...existing,
    username: update.username.trim(),
    email: cleanEmail,
    salt,
    passwordHash,
  };

  await saveData(
    KEYS.users,
    users.map((u) => (u.id === userId ? updated : u))
  );
  return updated;
}

export async function loginUser(email: string, password: string): Promise<User> {
  const users = await loadData<User[]>(KEYS.users, []);
  const user = users.find((u) => u.email === email.trim().toLowerCase());

  if (!user) throw new Error("Invalid email or password");

  const hash = await hashPassword(password, user.salt);
  if (hash !== user.passwordHash) throw new Error("Invalid email or password");

  await saveData(KEYS.session, user.id);
  return user;
}

export async function getCurrentUser(): Promise<User | null> {
  const userId = await loadData<string | null>(KEYS.session, null);
  if (!userId) return null;
  const users = await loadData<User[]>(KEYS.users, []);
  return users.find((u) => u.id === userId) ?? null;
}

export async function logoutUser(): Promise<void> {
  await saveData(KEYS.session, null);
}