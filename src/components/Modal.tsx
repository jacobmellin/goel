import ButtonPrimary from "./ButtonPrimary";
import Button from "./Button.tsx";
import TextInput from "./TextInput.tsx";

interface ModalProps {
    allowBgClose?: boolean,
    visible?: boolean,
    title: string
}

export default function Modal(props: ModalProps) {
    return <div classList={{ hidden: !props.visible }} class="flex px-4 flex-col justify-center items-center absolute pt-24 top-1 left-1 bottom-1 right-1 rounded-2xl backdrop-blur-lg bg-slate-900/10 select-none cursor-default">
        <div class="p-6 bg-gaze-900 rounded-lg w-full max-w-xl shadow-lg border border-white/10">
            <h2 class="font-bold text-lg text-orange-200">{props.title}</h2>
            <TextInput label="Goal Description" placeholder="Enter your goal here" />
            <div class="flex mt-4 pt-2 gap-2 flex-row justify-space-between">
                <ButtonPrimary>Add Goal</ButtonPrimary>
                <Button>Cancel</Button>
            </div>
        </div>
    </div>;
}
