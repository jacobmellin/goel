import { invoke } from "@tauri-apps/api/tauri";
import { createResource } from "solid-js";

const [fontSize, {refetch}] = createResource(async(): Promise<number> => {
   const fs: number = await invoke('get_font_size');
   return fs;
});

export function useFontSize() { return [fontSize, refetch] as const }
