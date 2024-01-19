import { invoke } from "@tauri-apps/api";
import { createResource } from "solid-js";

interface Settings {
    remind_time: string;
    show_when_reminidng: boolean;
}

const [settings, { refetch }] = createResource<Settings>(async () => {
    const settings: string = await invoke("get_settings");
    return JSON.parse(settings);
});

export function useSettings() { return [settings, refetch] as const }
