import { For } from "solid-js";
import GoalReflectForm from "../components/GoalReflectForm";
import { useGoals } from "../store/goals";
import { invoke } from "@tauri-apps/api";
import { useInfoBar } from "../components/InfoBar";

export default function TrackProgressView() {
    {/* TODO: Get only goals pending tracking */}
    const [goals,] = useGoals();
    const infoBar = useInfoBar();

    return <div class="mt-4">
        <h1 class="font-bold text-lg text-soothe-400">Track Goal Progress (0/{goals()?.length})</h1>
        <p class="text-sm text-calm-400">Please reflect on your progress with the following goals:</p>
        <For each={goals()}>
            {(goal) => 
                <GoalReflectForm
                    finished={false}
                    onSkip={() => {}}
                    onSubmit={async (reflectData) => {
                        try {
                            await invoke("create_goal_reflection", { 
                                goalId: goal.id,
                                reflectionData: JSON.stringify(reflectData)
                            }); 
                            infoBar.showInfo("Saved reflection for goal!");
                        } catch(e: any) {
                            infoBar.showError(e.toString());
                        }
                    }}
                    goal={goal} />}
        </For>
    </div>;
}
