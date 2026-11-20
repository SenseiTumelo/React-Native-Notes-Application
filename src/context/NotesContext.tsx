import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Note } from "../types";
import { useAuth } from "./AuthContext";
import {
  NoteInput,
  createNote,
  deleteNote,
  getUserNotes,
  updateNote,
} from "../services/notes";

type NotesContextType = {
  notes: Note[];
  loading: boolean;
  addNote: (input: NoteInput) => Promise<void>;
  editNote: (id: string, input: NoteInput) => Promise<void>;
  removeNote: (id: string) => Promise<void>;
};

const NotesContext = createContext<NotesContextType | null>(null);

export function NotesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setNotes([]);
      return;
    }
    setLoading(true);
    getUserNotes(user.id)
      .then(setNotes)
      .finally(() => setLoading(false));
  }, [user?.id]);

  const addNote = async (input: NoteInput) => {
    if (!user) throw new Error("Not logged in");
    const created = await createNote(user.id, input);
    setNotes((prev) => [...prev, created]);
  };

  const editNote = async (id: string, input: NoteInput) => {
    if (!user) throw new Error("Not logged in");
    const updated = await updateNote(user.id, id, input);
    setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
  };

  const removeNote = async (id: string) => {
    if (!user) throw new Error("Not logged in");
    await deleteNote(user.id, id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, loading, addNote, editNote, removeNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used inside NotesProvider");
  return context;
}