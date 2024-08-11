import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const tokenStorageAtom = atomWithStorage("token", null);
export const emailStorageAtom = atomWithStorage("email", null);
export const languageStorageAtom = atomWithStorage("language", "id");

export const emailAtom = atom(null);
export const idMovieAtom = atom(null);
export const isEmailValid = atom(false);
export const isFetchingAtom = atom(false);
export const isOpenModalAtom = atom(false);
export const searchMoviesAtom = atom(null);
export const isFavoritedAtom = atom(false);
