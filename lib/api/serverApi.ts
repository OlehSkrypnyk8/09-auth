import { cookies } from "next/headers";
import { AxiosResponse } from "axios";
import { nextServer } from "./api";
import { User } from "@/types/user";
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
  const response = await nextServer.get<Note>(
    `/notes/${id}`,
    await authHeaders()
  );
  return response.data;
};

export async function checkSession(): Promise<
  AxiosResponse<{ success: boolean }>
> {
  const response = await nextServer.get<{ success: boolean }>(
    "/auth/session",
    await authHeaders()
  );
  return response;
}

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me", await authHeaders());
  return data;
};
