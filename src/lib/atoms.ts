import { User } from "@/types/Users";
import { atom } from "jotai";

export const userAtom = atom<User | null>(null);
