import { createSignal } from "solid-js";

import Modal from "./Modal";
import TextInput from "./TextInput";
import Button from "./Button";
import ButtonPrimary from "./ButtonPrimary";
import SelectInput from "./SelectInput";
import NumberInput from "./NumberInput";
import { Show } from "solid-js";

interface selectOptionsData {
     
}

export default function AddGoalModal(props: any) {
    const optionsFormat =
        (item: { label: string, name: string, selectedLabel?: string }, type: string) => {
            console.log(type);
            return (type === "option" ? item.label : item.selectedLabel || item.label);
        }

    const [trackProgressValue, setTrackProgressValue] = createSignal({});

    return <Modal visible={props.visible} title="Add a new goal">
        <div class="my-4"> 
            <TextInput label="Goal Description" placeholder="Enter your goal here" />
        </div>
        <div class="flex gap-4 my-4 items-end">
            <div class="grow">
            <SelectInput
                label="Remind / Track Progress"
                format={optionsFormat} options={
                    [
                        { name: "daily", label: "Daily" },
                        { name: "weekly", label: "Weekly" },
                        { name: "monthly", label: "Monthly" },
                        {
                            name: "every",
                            label: "Every ... days",
                            selectedLabel: "Every"
                        }
                    ]}
                onChange={setTrackProgressValue}
            />
            </div>
            <Show when={trackProgressValue().name === 'every'}>
                <div class="grow max-w-32">
                    <NumberInput default={3} min={2} max={365} label="Number of Days" />
                </div>
                <div class="px-2 py-2 self-end text-gaze-300">
                    days
                </div>
            </Show>
        </div>
        <div class="flex mt-4 pt-2 gap-2 flex-row justify-space-between">
            <ButtonPrimary>Add Goal</ButtonPrimary>
            <Button onClick={props.onCancel}>Cancel</Button>
        </div>
    </Modal>;
}
