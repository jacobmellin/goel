import { A, useParams } from "@solidjs/router";
import EvaIcon from "../components/EvaIcon";
import { useGoals } from "../store/goals";
import { GoalRecord } from "../types/Goal";
import { For, createMemo, createResource } from "solid-js";
import { invoke } from "@tauri-apps/api";

export default function GoalDetails() {
    const [goals,] = useGoals();
    const params = useParams();

    const goal = createMemo(() => {
        return goals()?.find((g: GoalRecord) => g.id === params.goalId)
    });

    const [goalReflections] = createResource(async () => {
        const res: string = await invoke("get_goal_reflections", { goalId: params.goalId });
        console.log(res);
        return JSON.parse(res);
    });

    return <div class="pt-4">
        <A href="/" class="text-soothe-500 hover:text-soothe-400 transition-all uppercase text-wider flex gap-1 items-center justify-left"><EvaIcon class="h-5 -ml-0.5 fill-soothe-500" name="arrow-back" /> Go back</A>
        <div class="border border-white/10 shadow-lg bg-gaze-700/50 mt-2 rounded-md px-4 py-4 flex-col justify-between items-center">
            <div>
                <p class="text-calm-400 text-wider uppercase">{
                    goal()?.tracking_freq === 'every' ?
                        `Every ${goal()?.tracking_days_interval} days` : goal()?.tracking_freq
                }</p>
            </div>
            <div class="flex items-center justify-between">
                <h1 class="text-xl font-light text-gaze-200">{goal()?.description}</h1>
                <EvaIcon class="h-5 fill-calm-500" name="edit-2-outline" />
            </div>
        </div>
        <h1 class="text-lg font-bold text-soothe-400 mt-3 mb-2 ml-0.5">My Progress and Barriers:</h1>
        <div class="grid md:grid-cols-2 gap-2">
            <For each={goalReflections()}>{(reflection) =>
                <div class="border border-white/10 shadow-md bg-gaze-700/50 mt-2 rounded-md px-4 py-4 flex-col justify-between items-center">
                    <div>
                        <div class="flex gap-1 justify-between">
                            <p class="tabular-nums text-calm-400" ><span class="font-bold text-sm uppercase text-soothe-400">Date:</span> {new Date(Date.parse(reflection.date_created)).toLocaleDateString()}</p>
                            <p class="tabular-nums text-calm-400" ><span class="font-bold text-sm uppercase text-soothe-400">Happiness:</span> {reflection.rating}</p>
                        </div>
                        <p class="text-gaze-200 my-2"><span class="font-bold text-sm uppercase text-soothe-400">What went good:</span><br /> {reflection.barriers_reflection}</p>
                        <p class="text-gaze-200"><span class="font-bold text-sm uppercase text-soothe-400">Barriers to overcome:</span><br />{reflection.success_reflection}</p>
                    </div>
                </div>
            }
            </For>
        </div>
    </div>;
}
