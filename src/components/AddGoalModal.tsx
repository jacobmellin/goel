import { invoke } from "@tauri-apps/api";
import { Show, createMemo, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import Modal from "./Modal";
import TextInput from "./TextInput";
import Button from "./Button";
import ButtonPrimary from "./ButtonPrimary";
import SelectInput from "./SelectInput";
import NumberInput from "./NumberInput";

import { GoalRecord, TrackingInterval } from '../types/Goal';
import { useInfoBar } from "./InfoBar";
import { useGoals } from "../store/goals";
import { useSettings } from "../store/settings";

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

interface AddGoalModalData {
    visible: boolean,
}

const [state, setState] = createStore<AddGoalModalData>({
    visible: false
});

export const useAddGoalModal = () => {
    return {
        open() {
            setState({ visible: true });
        },
        close() {
            setState({ visible: false });
        }
    }
};

export default function AddGoalModal() {
    const infoBar = useInfoBar();
    const [, refetchGoals] = useGoals();

    const [formRef, setFormRef] = createSignal<HTMLFormElement | undefined>(undefined);

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

    const [goalRecord, setGoalRecord] = createStore<Partial<GoalRecord>>();

    const createGoal = async () => {
        try {
            await invoke("new_goal", { goalJson: JSON.stringify(goalRecord) });
            formRef()?.reset();
            refetchGoals();
            infoBar.showInfo("Goal added");
            setState({ visible: false });
        } catch(e) {
            infoBar.showError(`Error adding goal: ${e}`)
        }
    };

    const [settings,] = useSettings();

    const nextRemindDate = createMemo((): Date | undefined => {
        if(settings()) {
            let date = new Date();
            let timeMillis = settings()!.remind_time.split(":").map((v) => parseInt(v)).reduce((a, b) => a * 60 + b, 0) * 1000;
            date.setHours(0); 
            date.setMinutes(0);
            date.setSeconds(0);
            date.setTime(date.getTime() + timeMillis);

            switch (goalRecord.tracking_freq) {
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
                    date.setDate(date.getDate() + goalRecord.tracking_days_interval! || 1);
                    break;
                default:
                    return undefined;
            }
            return date;
        }

        return undefined;
    })


    return <Modal visible={state.visible} title="Add a new goal">
        <form ref={(el) => setFormRef(el)} onSubmit={(e) => {
            e.preventDefault()
            createGoal();
        }}>
            <div class="my-4">
                <TextInput 
                    required
                    label="Goal Description"
                    placeholder="Enter your goal here"
                    onChange={(v) => setGoalRecord({description: v})}
                />
            </div>
            <div class="flex gap-4 my-4 items-end">
                <div class="grow">
                    <SelectInput
                        initialValue={trackProgressOpts[0]}
                        label="Remind / Track Progress"
                        format={optionsFormat} options={trackProgressOpts} 
                        onChange={(v: TrackProgressOption) => {
                            setGoalRecord({ tracking_freq: v.name });
                        }}
                    />
                </div>
                <Show when={goalRecord.tracking_freq === 'every'}>
                    <div class="grow max-w-32">
                        <NumberInput default={2} min={2} 
                                     max={365} label="Number of Days"
                                     onChange={
                                        (n) => setGoalRecord({ tracking_days_interval: n })} />
                    </div>
                    <div class="px-2 py-2 self-end text-gaze-300">
                        days
                    </div>
                </Show>
            </div>
            <div class="text-sm text-soothe-400">Goel will remind you {
                goalRecord.tracking_freq === 'every' ? "every " + goalRecord.tracking_days_interval + " days" :
                goalRecord.tracking_freq?.toLowerCase()
            } of this goal, starting {
                nextRemindDate()?.toLocaleDateString([], { hour: 'numeric', minute: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            }.</div>
            <div class="flex mt-4 pt-2 gap-2 flex-row justify-space-between">
                <ButtonPrimary submit>Add Goal</ButtonPrimary>
                <Button onClick={() => setState({ visible: false})}>Cancel</Button>
            </div>
        </form>
    </Modal>;
}
