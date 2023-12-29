import TrashIcon from 'eva-icons/outline/svg/trash-outline.svg';


type TrackingInterval = "monthly" | "daily" | "weekly";

interface GoalProps {
    text: string,
    trackingInterval: TrackingInterval
}

function Goal(props: GoalProps) {
    return (
        <div class="bg-gaze-700/40 rounded-md border-white/10 border shadow-md text-soothe-200 flex flex-col hover:border-orange-300/50 hover:bg-calm-400/20 hover:cursor-pointer transition-colors">
            <div class="p-4 font-medium flex-1">{props.text}</div>
            <div class="flex w-full border-t-white/10 border-t">
                <div class="p-2 text-calm-500 tracking-wider font-normal text-sm uppercase flex-1">{props.trackingInterval}</div>
                <div class="border-l-white/10 border-l py-2 px-3 inline-flex hover:bg-orange-300/20 transition-colors">
                    <TrashIcon class="w-5 fill-red-400/50" />
                </div>
            </div>
        </div>
    );
}

export default Goal;
