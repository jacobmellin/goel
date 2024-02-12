import { invoke } from "@tauri-apps/api/tauri";
import { createResource } from "solid-js";

const [fontSize, {mutate, refetch}] = createResource(async () => {
   return await invoke('get_font_size');
});

export function useFontSize() { return [fontSize, refetch] as const }
