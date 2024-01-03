import { For } from "solid-js";
import GoalReflectForm from "../components/GoalReflectForm";
import { useGoals } from "../store/goals";

export default function TrackProgressView() {
    {/* TODO: Get only goals pending tracking */}
    const [goals,] = useGoals();

    return <div class="mt-4">
        <h1 class="font-bold text-lg text-soothe-400">Track Goal Progress (0/{goals()?.length})</h1>
        <p class="text-sm text-calm-400">Please reflect on your progress with the following goals:</p>
        <For each={goals()}>
            {(goal) => <GoalReflectForm goal={goal} />}
        </For>
    </div>;
}
