import { invoke } from "@tauri-apps/api";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import Modal from "./Modal";
import TextInput from "./TextInput";
import Button from "./Button";
import ButtonPrimary from "./ButtonPrimary";
import SelectInput from "./SelectInput";
import NumberInput from "./NumberInput";

import { GoalRecord, TrackingInterval } from '../types/Goal';

interface TrackProgressOption {
    name: TrackingInterval,
    label: string,
    selectedLabel?: string
}

interface AddGoalModalProps {
    visible: boolean,
    onModalHide: Function,
    onGoalAdded: Function,
    onGoalAddError: Function
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

export default function AddGoalModal(props: AddGoalModalProps) {
    const [formRef, setFormRef] = createSignal<HTMLFormElement | undefined>(undefined);

    const [trackProgressOpts, _] = createStore<Array<TrackProgressOption>>(
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
            props.onGoalAdded();
            props.onModalHide();
        } catch(e) {
            props.onGoalAddError(e);
        }
    };


    return <Modal visible={props.visible} title="Add a new goal">
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
                        format={optionsFormat} options={trackProgressOpts}      onChange={(v: TrackProgressOption) => {
                            setGoalRecord({ tracking_freq: v.name });
                        }}
                    />
                </div>
                <Show when={goalRecord.tracking_freq === 'every'}>
                    <div class="grow max-w-32">
                        <NumberInput default={2} min={2} max={365} label="Number of Days" onChange={(n) => setGoalRecord({ tracking_days_interval: n })} />
                    </div>
                    <div class="px-2 py-2 self-end text-gaze-300">
                        days
                    </div>
                </Show>
            </div>
            <div class="flex mt-4 pt-2 gap-2 flex-row justify-space-between">
                <ButtonPrimary submit>Add Goal</ButtonPrimary>
                <Button onClick={props.onModalHide}>Cancel</Button>
            </div>
        </form>
    </Modal>;
}
