import EvaIcon from './EvaIcon';

import { TrackingInterval } from '../types/Goal';
import { createEffect, createSignal } from 'solid-js';
import { invoke } from '@tauri-apps/api';
import { useInfoBar } from './InfoBar';
import { A } from '@solidjs/router';

interface GoalProps {
    text: string,
    trackingInterval: TrackingInterval,
    days?: number,
    id: string,
    onGoalRemoved: Function
}

function Goal(props: GoalProps) {
    const [trackingInfo, setTrackingInfo] = createSignal(props.trackingInterval as string);

    createEffect(() => {
        setTrackingInfo(props.trackingInterval === 'every' ?
            `Every ${props.days} days` : props.trackingInterval);
    });

    const deleteGoal = async () => {
        try {
            await invoke("set_goal_removed", {
                goalId: props.id,
                removed: true
            });
            useInfoBar().showInfo("Goal deleted", true, async () => {
                await invoke("set_goal_removed", {
                    goalId: props.id,
                    removed: false
                });
                props.onGoalRemoved();
            });
            props.onGoalRemoved()
        } catch(e) {
            console.error("Error removing goal");
        }
    };

    return (
        <A href={`/goal/${props.id}`} class="bg-gaze-700/40 rounded-md border-white/10 border shadow-md text-soothe-200 flex flex-col hover:border-orange-300/50 hover:bg-calm-400/20 hover:cursor-pointer transition-colors">
            <div class="p-4 font-medium flex-1">{props.text}</div>
            <div class="flex w-full border-t-white/10 border-t">
                <div class="p-2 text-calm-500 tracking-wider font-normal text-sm uppercase flex-1">{trackingInfo()}</div>
                <button
                    onClick={() => console.log("goal")}
                    class="border-l-white/10 border-l py-2 px-3 inline-flex hover:bg-orange-300/20 transition-colors items-center justify-content-center">
                    <EvaIcon name="edit-2-outline" class="h-[18px] fill-orange-300/70" />
                </button>
                <button
                    onClick={(e: any) => { e.preventDefault(); deleteGoal(); }}
                    class="border-l-white/10 border-l py-2 px-3 inline-flex hover:bg-orange-300/20 transition-colors items-center justify-content-center">
                    <EvaIcon name="trash-outline" class="h-[18px] fill-red-400/70" />
                </button>
            </div>
        </A>
    );
}

export default Goal;
