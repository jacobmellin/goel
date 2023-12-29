import { Select } from "@thisbeyond/solid-select";

import Modal from "./Modal";
import TextInput from "./TextInput";
import Button from "./Button";
import ButtonPrimary from "./ButtonPrimary";

// import "@thisbeyond/solid-select/style.css";

export default function AddGoalModal(props: any) {
    return <Modal visible={props.visible} title="Add a new goal">
        <TextInput label="Goal Description" placeholder="Enter your goal here" />
        <div>
        <div class="text-gaze-400 mb-1 left-0.5 relative text-sm font-bold">Remind / Track Progress</div>
            <Select options={["Daily", "Weekly", "Monthly"]} />
        </div>
        <div class="flex mt-4 pt-2 gap-2 flex-row justify-space-between">
            <ButtonPrimary>Add Goal</ButtonPrimary>
            <Button onClick={props.onCancel}>Cancel</Button>
        </div>
    </Modal>;
}
