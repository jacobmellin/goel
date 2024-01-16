import { invoke } from "@tauri-apps/api";
import TimePicker from "../components/TimePicker";
import { useSettings } from "../store/settings";
import { Show } from "solid-js";

export default function SettingsView() {
    const [settings, refetchSettings] = useSettings();
    refetchSettings();
    return <div>
        <h1 class="my-4 text-lg font-bold text-soothe-400">Settings</h1>
        <div class="bg-gaze-700/50 my-4 rounded-md px-4 py-4 flex justify-between items-center">
            <div>
                <p class="text-calm-400 font-bold">Track Progress Reminder</p>
                <p class="text-gaze-400 text-sm max-w-sm">Goel will automatically remind you of goals for which reflection on your progress is due at a time set here.</p>
            </div>
            <div class="flex">
                <Show when={settings()}>
                    <TimePicker label="Remind time" initialTime={settings()?.remind_time} labelRight onChange={async (v) => {
                        await invoke('save_settings', { 
                            settings: JSON.stringify({ 
                                remind_time : v.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).slice(0,5)
                            })
                        });
                    }} />
                </Show>
            </div>
        </div>
        <div class="bg-gaze-700/50 my-4 rounded-md px-4 py-4 flex justify-between items-center">
            <div>
                <p class="text-calm-400 font-bold">Font size</p>
                <p class="text-gaze-400 text-sm max-w-xs">Size of fonts throughout this Application</p>
            </div>
            <div>
                <p class="text-calm-400 font-bold">Coming soon</p>
            </div>
        </div>
    </div>;
}
