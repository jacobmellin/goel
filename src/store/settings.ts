import { invoke } from "@tauri-apps/api";
import { createResource } from "solid-js";

const [settings, { refetch }] = createResource<any>(async () => {
    const settings: string = await invoke("get_settings");
    return JSON.parse(settings);
});

export function useSettings() { return [settings, refetch] as const }
