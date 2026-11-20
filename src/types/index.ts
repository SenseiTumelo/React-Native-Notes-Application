export type Category = "Work" | "Study" | "Personal";

export type User = {
  id: string;
  username: string;
  email: string;
  salt: string;
  passwordHash: string;
};

export type Note = {
  id: string;
  userId: string;
  title?: string;
  content: string;
  category: Category;
  createdAt: string;
  updatedAt?: string;
};