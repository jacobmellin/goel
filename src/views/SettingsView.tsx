import { invoke } from "@tauri-apps/api";
import TimePicker from "../components/TimePicker";
import { useSettings } from "../store/settings";
import { Show, createSignal } from "solid-js";
import { useInfoBar } from "../components/InfoBar";
import Switch from "../components/Switch";
import NumberInput from "../components/NumberInput";
import { useFontSize } from "../store/fontSize";

export default function SettingsView() {
    const [fontSize, refetchFontSize] = useFontSize();
    const [settings, refetchSettings] = useSettings();
    const infoBar = useInfoBar();
    refetchSettings();
    const [enableReminder, setEnableReminder] = createSignal(settings()?.enable_reminder);
    return <div>
        <h1 class="my-4 text-lg font-bold text-soothe-400">Settings</h1>
        <div class="bg-gaze-700/50 my-4 rounded-md px-4 py-4 flex justify-between items-center">
            <div>
                <p class="text-calm-400 font-bold">Track Progress Reminder</p>
                <p class="text-gaze-400 text-sm max-w-sm">Goel will automatically remind you of goals for which reflection on your progress is due at a time set here.</p>
            </div>
            <div class="flex gap-8">
                <div class="">
                    <div class="text-gaze-400 mb-1 mx-0.5 relative text-sm font-bold">Enable reminder</div>
                        <Switch initialValue={enableReminder() || false} onChange={(value) => {
                            try {
                                invoke("set_reminder_enabled", { enabled: JSON.stringify(value) }); 
                                setEnableReminder(value);
                                refetchSettings();
                            } catch (e: any) {
                                infoBar.showError("Error enabling reminder: " + e.toString());
                            }
                        }} />
                </div>
                <Show when={settings()}>
                    <TimePicker label="Remind time" initialTime={settings()?.remind_time} onChange={async (v) => {
                        try {
                            await invoke('save_settings', {
                                settings: JSON.stringify({
                                    remind_time: v.toLocaleTimeString('de')
                                })
                            });
                            infoBar.showInfo(`Remind time set!`);
                        } catch (e: any) {
                            infoBar.showError("Error saving reimnd time: " + e.toString());
                        }
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
                <Show when={typeof fontSize() !== 'undefined'}>
                    <p class="text-calm-400 font-bold"><NumberInput onChange={(v) => {
                       invoke('set_font_size', { fontSize: JSON.stringify(v) });
                       refetchFontSize();
                    }} min={14} max={18} default={fontSize()} label="Font size (px)" /></p>
                </Show>
            </div>
        </div>
    </div>;
}
