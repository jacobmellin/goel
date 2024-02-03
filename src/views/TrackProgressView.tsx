import { For, Show, createResource, createSignal } from "solid-js";
import GoalReflectForm from "../components/GoalReflectForm";
import { invoke } from "@tauri-apps/api";
import { useInfoBar } from "../components/InfoBar";
import { GoalRecord } from "../types/Goal";

export default function TrackProgressView() {
    const infoBar = useInfoBar();

    const [finishCount, setFinishCount] = createSignal(0);

    const [goals,] = createResource<GoalRecord[]>(async () => {
        const res: string = await invoke("get_goals_pending_reflection");
        return JSON.parse(res);
    })

    return <div class="mt-4">
        <Show when={typeof goals() !== 'undefined' && goals()!.length > 0}>
            <h1 class="font-bold text-lg text-soothe-400">Track Goal Progress ({finishCount()}/{goals()?.length})</h1>
            <p class="text-sm text-calm-400">Please reflect on your progress with the following goals:</p>
            <For each={goals()}>
                {(goal) => {
                    const [finished, setFinished] = createSignal(false);
                    return <GoalReflectForm
                        finished={finished()}
                        onSkip={async () => {
                            try {
                                await invoke("create_goal_reflection", {
                                    reflectData: JSON.stringify({
                                        skipped: true,
                                        goal_id: goal.id
                                    })
                                });
                                setFinished(true);
                                setFinishCount(finishCount() + 1);
                            }
                            catch (e: any) {
                                infoBar.showError(e.toString());
                            }
                        }}
                        onSubmit={async (reflectData) => {
                            try {
                                await invoke("create_goal_reflection", {
                                    reflectData: JSON.stringify({
                                        rating: reflectData.rating,
                                        barriers_reflection: reflectData.barriersReflection,
                                        success_reflection: reflectData.successReflection,
                                        goal_id: reflectData.goalId
                                    })
                                });
                                setFinished(true);
                                setFinishCount(finishCount() + 1);
                                infoBar.showInfo("Saved reflection for goal!");
                            } catch (e: any) {
                                infoBar.showError(e.toString());
                            }
                        }}
                        goal={goal} />
                }}
            </For>
        </Show>
    </div>;
}

