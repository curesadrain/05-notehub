import axios from "axios";
import type { Note } from "../types/note";
import type { NoteFormValues } from "../components/NoteForm/NoteForm";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export const FetchNotes = async (
  page: number,
  search: string,
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search,
    },
  });
  return response.data;
};

export const CreateNote = async (newTask: NoteFormValues): Promise<Note> => {
  const result = await api.post<Note>("/notes", newTask);
  return result.data;
};

export const DeleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};
