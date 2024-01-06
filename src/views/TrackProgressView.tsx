import { For, createResource } from "solid-js";
import GoalReflectForm from "../components/GoalReflectForm";
import { invoke } from "@tauri-apps/api";
import { useInfoBar } from "../components/InfoBar";
import { GoalRecord } from "../types/Goal";

export default function TrackProgressView() {
    const infoBar = useInfoBar();

    const [goals,] = createResource<GoalRecord[]>(async () => {
        const res = await invoke("get_goals_pending_reflection");
        console.log(res);
        return JSON.parse(res);
    })

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
                            await invoke("create_goal_reflection", { reflectData: JSON.stringify({
                                rating: reflectData.rating,
                                barriers_reflection: reflectData.barriersReflection,
                                success_reflection: reflectData.successReflection,
                                goal_id: reflectData.goalId
                            }) }); 
                            infoBar.showInfo("Saved reflection for goal!");
                        } catch(e: any) {
                            infoBar.showError(e.toString());
                        }
                    }}
                    goal={goal} />}
        </For>
    </div>;
}

