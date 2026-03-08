import { cookies } from "next/headers";
import { AxiosResponse } from "axios";
import { nextServer } from "./api";
import { User } from "@/types/auth";
import { Note, NoteTag } from "@/types/note";

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

const authHeaders = async () => {
  const cookieStore = await cookies();

  return {
    headers: {
      Cookie: cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; "),
    },
  };
};

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await nextServer.get(
    "/notes",
    {
      ...(await authHeaders()),
      params,
    }
  );

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export async function checkSession(): Promise<boolean> {
  const { data } = await nextServer.get<{ success: boolean }>(
    "/auth/session",
    await authHeaders()
  );

  return data.success;
}

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
