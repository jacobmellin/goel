import TextInput from "../TextInput";
import Button from "../Button";
import ButtonPrimary from "../ButtonPrimary";
import SelectInput from "../SelectInput";
import NumberInput from "../NumberInput";

import { GoalRecord, TrackingInterval } from "../../types/Goal";
import { createStore } from "solid-js/store";
import { createMemo } from "solid-js";
import { Show } from "solid-js";
import { useSettings } from "../../store/settings";
import { onCleanup } from "solid-js";

interface GoalFormProps {
    goal: Partial<GoalRecord>,
    onSubmit: (goal: Partial<GoalRecord>) => void,
    onCancel: () => void,
    confirmLabel: string,
}

interface TrackProgressOption {
    name: TrackingInterval,
    label: string,
    selectedLabel?: string
}

const optionsFormat = 
    (item: { 
        label: string,
        name: string,
        selectedLabel?: string
    }, type: string) => {
        return (type === "option" ? 
            item.label : item.selectedLabel || item.label);
    }



export default function GoalForm(props: GoalFormProps) {
    let formRef: HTMLFormElement;

    const [newGoal, setNewGoal] = createStore<Partial<GoalRecord>>(props.goal);

    const [trackProgressOpts,] = createStore<Array<TrackProgressOption>>(
        [
            { name: "daily", label: "Daily", },
            { name: "weekly", label: "Weekly" },
            { name: "monthly", label: "Monthly" },
            {
                name: "every",
                label: "Every ... days",
                selectedLabel: "Every"
            }
        ]
    );
    
    const [settings,] = useSettings();
    const nextRemindDate = createMemo((): Date | undefined => {
        if(settings()) {
            const date = new Date();
            const timeMillis = settings()!.remind_time.split(":").map((v) => parseInt(v)).reduce((a, b) => a * 60 + b, 0) * 1000;
            date.setHours(0); 
            date.setMinutes(0);
            date.setSeconds(0);
            date.setTime(date.getTime() + timeMillis);

            switch (newGoal.tracking_freq) {
                case "daily":
                    date.setDate(date.getDate() + 1);
                break;
                case "weekly":
                    date.setDate(date.getDate() + 7);
                break;
                case "monthly":
                    date.setMonth(date.getMonth() + 1);
                break;
                case "every":
                    date.setDate(date.getDate() + newGoal.tracking_days_interval! || 1);
                break;
                default:
                    return undefined;
            }
            return date;
        }

        return undefined;
    });

    return <form ref={formRef!} onSubmit={(e) => {
            e.preventDefault();
            formRef.reset();
            props.onSubmit(newGoal); 
        }}>
            <div class="my-4">
                <TextInput 
                    initialValue={props.goal.description}
                    required
                    label="Goal Description"
                    placeholder="Enter your goal here"
                    onChange={(v) => setNewGoal({description: v})}
                />
            </div>
            <div class="flex gap-4 my-4 items-end">
                <div class="grow">
                    <SelectInput
                        initialValue={
                            props.goal.tracking_freq ?
                                trackProgressOpts
                                    .find(o => o.name === props.goal.tracking_freq)
                                        : trackProgressOpts[0]}
                        label="Remind / Track Progress"
                        format={optionsFormat} options={trackProgressOpts} 
                        onChange={(v: TrackProgressOption) => {
                            setNewGoal({ tracking_freq: v.name });
                        }}
                    />
                </div>
                <Show when={newGoal.tracking_freq === 'every'}>
                    <div class="grow max-w-32">
                        <NumberInput default={props.goal.tracking_days_interval || 2} min={2} 
                                     max={365} label="Number of Days"
                                     onChange={
                                        (n) => setNewGoal({ tracking_days_interval: n })} />
                    </div>
                    <div class="px-2 py-2 self-end text-gaze-300">
                        days
                    </div>
                </Show>
            </div>
            <div class="text-sm text-soothe-400">Goel will remind you {
                newGoal.tracking_freq === 'every' ? "every " + newGoal.tracking_days_interval + " days" :
                newGoal.tracking_freq?.toLowerCase()
            } of this goal, starting {
                nextRemindDate()?.toLocaleDateString([], { hour: 'numeric', minute: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            }.</div>
            <div class="flex mt-4 pt-2 gap-2 flex-row justify-space-between">
                <ButtonPrimary submit>{props.confirmLabel}</ButtonPrimary>
                <Button onClick={props.onCancel}>Cancel</Button>
            </div>
        </form>
}
