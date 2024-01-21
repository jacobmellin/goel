import { A, useParams } from "@solidjs/router";
import EvaIcon from "../components/EvaIcon";
import { useGoals } from "../store/goals";
import { GoalRecord } from "../types/Goal";
import { createMemo } from "solid-js";

export default function GoalDetails() {
    const [goals, refetchGoals] = useGoals();
    const params = useParams();

    const goal = createMemo(() => {
        return goals()?.find((g: GoalRecord) => g.id === params.goalId)
    })

    return <div class="pt-4">
        <A href="/" class="text-soothe-500 hover:text-soothe-400 transition-all uppercase text-wider flex gap-1 items-center justify-left"><EvaIcon class="h-5 -ml-0.5 fill-soothe-500" name="arrow-back"/> Go back</A>
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
        <h1 class="text-lg font-bold text-soothe-400 my-2 ml-0.5">My Progress and Barriers:</h1>
    </div>;
}
