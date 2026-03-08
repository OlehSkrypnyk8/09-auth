import { nextServer } from "./api";
import { User, RegisterRequest, LoginRequest } from "@/types/auth";
import { Note, CreateNote, NoteTag } from "@/types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  tag?: NoteTag;
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}

export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(note: CreateNote): Promise<Note> {
  const { data } = await nextServer.post<Note>("/notes", note);
  return data;
}

export async function deleteNote(id: string): Promise<void> {
  await nextServer.delete(`/notes/${id}`);
}

export async function register(payload: RegisterRequest): Promise<User> {
  const { data } = await nextServer.post<User>("/auth/register", payload);
  return data;
}

export async function login(payload: LoginRequest): Promise<User> {
  const { data } = await nextServer.post<User>("/auth/login", payload);
  return data;
}

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export async function getMe(): Promise<User> {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}

export async function checkSession(): Promise<boolean> {
  try {
    await getMe();
    return true;
  } catch {
    return false;
  }
}

export async function updateMe(username: string): Promise<User> {
  const { data } = await nextServer.patch<User>("/users/me", { username });
  return data;
}
