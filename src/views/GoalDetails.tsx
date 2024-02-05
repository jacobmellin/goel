import { A, useParams } from "@solidjs/router";
import EvaIcon from "../components/EvaIcon";
import { useGoals } from "../store/goals";
import { GoalRecord } from "../types/Goal";
import { For, Show, createMemo, createResource } from "solid-js";
import { invoke } from "@tauri-apps/api";
import { useEditGoalModal } from "../components/EditGoalModal";

interface GoalReflectionRecord {
    goal_id: string;
    rating: string;
    barriers_reflection: string;
    success_reflection: string;
    date_created: string;
    skipped: boolean;
}

function GoalReflection(props: { reflection: GoalReflectionRecord }) {
    const happinessMap: { [key: number]: { text: string, class: string } } = {
        101: { text: "Very Happy", class: "text-green-300" },
        75:  { text: "Happy", class: "text-emerald-400" },
        65:  { text: "Kind of Happy", class: "text-yellow-400" },
        50:  { text: "Neutral", class: "text-gray-500"},
        25:  { text: "Kind of Unhappy", class: "text-soothe-300" },
        10:  { text: "Unhappy", class: "text-red-700" },
        0:   { text: "Very Unhappy", class: "text-red-600" }
    };

    const happinessText = createMemo(() => {
        for (const k of Object.keys(happinessMap).sort((a, b) => parseInt(a, 10) - parseInt(b, 10))) {
            const n = parseInt(k, 10);
            const m = parseInt(props.reflection.rating, 10);
            if (m < n) {
                return happinessMap[n];
            }
        }
        return happinessMap[90];
    });

    return <div class="border border-white/10 shadow-md bg-gaze-700/50 mt-2 rounded-md px-4 py-4 flex-col justify-between items-center">
        <div class="flex gap-1 justify-between">
            <p class="tabular-nums text-calm-400" ><span class="font-bold text-sm uppercase text-soothe-400">Date:</span> {new Date(Date.parse(props.reflection.date_created)).toLocaleDateString()}</p>
        </div>
        <p class="text-gaze-200 my-2"><span class="font-bold text-sm uppercase text-soothe-400">What went good:</span><br /> {props.reflection.barriers_reflection}</p>
        <p class="text-gaze-200"><span class="font-bold text-sm uppercase text-soothe-400">Barriers to overcome:</span><br />{props.reflection.success_reflection}</p>
        <div class="text-sm bg-gaze-700/50 rounded-md px-4 py-3 mt-4 text-soothe-200 flex gap-2 flex-row items-center">
        <p>You felt <span class={`uppercase ${happinessText().class} text-sm`}>{happinessText().text}</span> with the progress on your goal here.</p>
        <div class="rounded-md bg-green-400/50 w-10 h-10 flex items-center justify-center">
        {props.reflection.rating} 
        </div>
        </div>
    </div>
}

export default function GoalDetails() {
    const [goals,] = useGoals();
    const params = useParams();

    const goal = createMemo(() => {
        return goals()?.find((g: GoalRecord) => g.id === params.goalId)
    });

    const [goalReflections] = createResource(async () => {
        const res: string = await invoke("get_goal_reflections", { goalId: params.goalId });
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
                <button
                    onClick={(e) => 
                        {
                            e.preventDefault();
                            useEditGoalModal().open(goal() as GoalRecord);
                        }
                    }
                    class="border-white/10 rounded border py-2 px-3 inline-flex hover:bg-orange-300/20 transition-colors items-center justify-content-center">
                    <EvaIcon name="edit-2-outline" class="h-[18px] fill-orange-300/70" />
                </button>
            </div>
        </div>
        <Show when={goalReflections() !== 'undefined' && goalReflections()?.length > 0}>
        <h1 class="text-lg font-bold text-soothe-400 mt-3 mb-2 ml-0.5">My Progress and Barriers:</h1>
        <div class="grid md:grid-cols-2 gap-2">
            <For each={goalReflections()}>{(reflection) =>
                <GoalReflection reflection={reflection} />
            }
            </For>
        </div>
        </Show>
    </div>;
}
