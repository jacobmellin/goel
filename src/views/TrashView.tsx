import { For } from "solid-js";
import { useGoals } from "../store/goals";
import Button from "../components/Button";

export default function SettingsView() {
    const [goals, refetchGoals] = useGoals();

    return <div> 
        <h1 class="my-4 text-lg font-bold text-soothe-400">Trash</h1>
        <ul class="bg-gaze-900/50 my-4 rounded-lg px-4 py-4 flex flex-col gap-4">
            <For each={goals()}>{
                (goal) => <li class="border text-gaze-300 bg-gaze-700/20 hover:bg-gaze-700/50 transition-colors border-white/10 rounded-md px-4 py-2">{goal.description}</li>
            }
            </For>
        </ul>
        <div class="flex justify-center gap-2">
            <div class="grow">
                <Button>
                    Deselect all
                </Button>
            </div>
            <Button>
                Delete 5 Selected goals
            </Button>
            <Button>
                Delete all goals
            </Button>
        </div>
    </div>;
}
