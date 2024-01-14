import NumberInput from "../components/NumberInput";
import TimePicker from "../components/TimePicker";

export default function SettingsView() {
    return <div>
        <h1 class="my-4 text-lg font-bold text-soothe-400">Settings</h1>
        <div class="bg-gaze-700/50 my-4 rounded-md px-4 py-4 flex justify-between items-center">
            <div>
                <p class="text-calm-400 font-bold">Remind time</p>
                <p class="text-soothe-400 text-sm max-w-xs">Goel will automatically remind you at 10:00 of your goals for which reflection on your progress is due.</p>
            </div>
            <div class="flex">
                <TimePicker />
            </div>
        </div>
        <div class="bg-gaze-700/50 my-4 rounded-md px-4 py-4 flex justify-between items-center">
            <div>
                <p class="text-calm-400 font-bold">Font size</p>
                <p class="text-soothe-400 text-sm max-w-xs">Size of fonts throughout this Application</p>
            </div>
            <div>
                <p class="text-calm-400 font-bold">Coming soon</p>
            </div>
        </div>
    </div>;
}
