import * as Crypto from "expo-crypto";
import { KEYS, loadData, saveData } from "./storage";
import { Category, Note } from "../types";

export type NoteInput = {
  title?: string;
  content: string;
  category: Category;
};

async function loadAllNotes(): Promise<Note[]> {
  return loadData<Note[]>(KEYS.notes, []);
}

export async function getUserNotes(userId: string): Promise<Note[]> {
  const all = await loadAllNotes();
  return all.filter((note) => note.userId === userId);
}

export async function createNote(userId: string, input: NoteInput): Promise<Note> {
  const all = await loadAllNotes();

  const note: Note = {
    id: Crypto.randomUUID(),
    userId,
    title: input.title?.trim() || undefined,
    content: input.content.trim(),
    category: input.category,
    createdAt: new Date().toISOString(),
  };

  await saveData(KEYS.notes, [...all, note]);
  return note;
}

export async function updateNote(
  userId: string,
  noteId: string,
  input: NoteInput
): Promise<Note> {
  const all = await loadAllNotes();
  const existing = all.find((n) => n.id === noteId && n.userId === userId);
  if (!existing) throw new Error("Note not found");

  const updated: Note = {
    ...existing,
    title: input.title?.trim() || undefined,
    content: input.content.trim(),
    category: input.category,
    updatedAt: new Date().toISOString(),
  };

  await saveData(
    KEYS.notes,
    all.map((n) => (n.id === noteId ? updated : n))
  );
  return updated;
}

export async function deleteNote(userId: string, noteId: string): Promise<void> {
  const all = await loadAllNotes();
  await saveData(
    KEYS.notes,
    all.filter((n) => !(n.id === noteId && n.userId === userId))
  );
}