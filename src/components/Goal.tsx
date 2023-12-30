import TrashIcon from 'eva-icons/outline/svg/trash-outline.svg';

import { TrackingInterval } from '../types/Goal';
import { createEffect, createSignal } from 'solid-js';

interface GoalProps {
    text: string,
    trackingInterval: TrackingInterval,
    days?: number
}

function Goal(props: GoalProps) {
    const [trackingInfo, setTrackingInfo] = createSignal(props.trackingInterval as string);
    createEffect(() => {
        setTrackingInfo(props.trackingInterval === 'every' ?
            `Every ${props.days} days` : props.trackingInterval);
    });

    return (
        <div class="bg-gaze-700/40 rounded-md border-white/10 border shadow-md text-soothe-200 flex flex-col hover:border-orange-300/50 hover:bg-calm-400/20 hover:cursor-pointer transition-colors">
            <div class="p-4 font-medium flex-1">{props.text}</div>
            <div class="flex w-full border-t-white/10 border-t">
                <div class="p-2 text-calm-500 tracking-wider font-normal text-sm uppercase flex-1">{trackingInfo()}</div>
                <div class="border-l-white/10 border-l py-2 px-3 inline-flex hover:bg-orange-300/20 transition-colors">
                    <TrashIcon class="w-5 fill-red-400/50" />
                </div>
            </div>
        </div>
    );
}

export default Goal;
