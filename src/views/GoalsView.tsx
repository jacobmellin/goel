import { For, Show, createMemo } from "solid-js";
import ButtonPrimary from "../components/ButtonPrimary";
import Goal from "../components/Goal";
import EmptyBg from "/src/assets/empty_bg.svg?component-solid";

import { useGoals } from "../store/goals.ts";
import { useAddGoalModal } from "../components/AddGoalModal.tsx";

export default function GoalsView() {
    const [goals, refetchGoals] = useGoals();
    const addGoalModal = useAddGoalModal();

    const hasGoals = createMemo(() => {
        return typeof goals() !== 'undefined' && goals()!.length > 0;
    });

    return <>
        <div classList={{ hidden: !hasGoals() }} class="flex flex-row items-center justify-between relative z-1">
            <h1 class="my-4 text-lg font-bold text-soothe-400">My goals:</h1>
            <ButtonPrimary onClick={addGoalModal.open}>Create New goal</ButtonPrimary>
        </div>
        <Show when={!hasGoals()}>
            <div class="flex items-center h-full justify-center flex-col gap-4">
                <div class="w-full relative -mt-8">
                    <EmptyBg class="max-w-xl max-h-[60vh] mx-auto block" />
                </div>
                <div class="text-center text-xl font-light text-soothe-400">Start by adding a new goal!</div>
                <ButtonPrimary onClick={addGoalModal.open}>Create New goal</ButtonPrimary>
            </div>
        </Show>
        <div class="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
            <For each={goals()}>{(goal) =>
                <Goal
                    onGoalRemoved={refetchGoals}
                    id={goal.id} trackingInterval={goal.tracking_freq} days={goal.tracking_days_interval} text={goal.description} />
            }</For>
        </div>
    </>;
}
