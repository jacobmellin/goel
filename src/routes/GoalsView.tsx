import { For } from "solid-js";
import ButtonPrimary from "../components/ButtonPrimary";
import Goal from "../components/Goal";

import { useGoals } from "../store/goals.ts";
import { useAddGoalModal } from "../components/AddGoalModal.tsx";

export default function GoalsView() {
    const [goals, refetchGoals] = useGoals();
    const addGoalModal = useAddGoalModal();

    return <div class="mt-4">
        <div class="flex flex-row items-center justify-between">
            <h1 class="my-4 text-lg font-bold text-soothe-400">My goals:</h1>
            <ButtonPrimary onClick={addGoalModal.open}>Create New goal</ButtonPrimary>
        </div>
        <div class="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
            <For each={goals()}>{(goal) => 
                <Goal 
                    onGoalRemoved={refetchGoals}
                    id={goal.id} trackingInterval={goal.tracking_freq} days={goal.tracking_days_interval} text={goal.description} />
            }</For>
        </div>
    </div>;
}
