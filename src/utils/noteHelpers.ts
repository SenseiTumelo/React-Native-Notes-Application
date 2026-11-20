import { Category, Note } from "../types";

export type SortOrder = "newest" | "oldest";

export function filterByCategory(notes: Note[], category: Category): Note[] {
  return notes.filter((note) => note.category === category);
}

export function searchNotes(notes: Note[], query: string): Note[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return notes;

  return notes.filter((note) => {
    const text = `${note.title ?? ""} ${note.content}`.toLowerCase();
    return words.every((word) => text.includes(word));
  });
}

export function sortNotes(notes: Note[], order: SortOrder): Note[] {
  return [...notes].sort((a, b) =>
    order === "newest"
      ? b.createdAt.localeCompare(a.createdAt)
      : a.createdAt.localeCompare(b.createdAt)
  );
}