import { For } from "solid-js";
import ButtonPrimary from "./ButtonPrimary";
import Goal from "./Goal";

import { GoalRecord } from "../types/Goal.ts";

interface GoalsViewProps {
    disabled?: boolean,
    addGoalClicked?: Function,
    goals?: GoalRecord[],
    onGoalRemoved: Function
}

export default function GoalsView(props: GoalsViewProps) {
    return <div class="mt-4">
        <div class="flex flex-row items-center justify-between">
            <h1 class="my-4 text-lg font-bold text-orange-200">My goals:</h1>
            <ButtonPrimary disabled={props.disabled} onClick={props.addGoalClicked}>Create New goal</ButtonPrimary>
        </div>
        <div class="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
            <For each={props.goals?.filter((g) => !g.is_removed)}>{(goal, _) => 
                <Goal 
                    onGoalRemoved={props.onGoalRemoved}
                    id={goal.id} trackingInterval={goal.tracking_freq} days={goal.tracking_days_interval} text={goal.description} />
            }</For>
        </div>
    </div>;
}
