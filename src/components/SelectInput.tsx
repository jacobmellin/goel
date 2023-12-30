import { Select } from "@thisbeyond/solid-select"

interface SelectInputProps {
    options: string[]
}

export default function SelectInput(props: SelectInputProps) {
    return <div>
        <div class="text-gaze-400 mb-1 left-0.5 relative text-sm font-bold">Remind / Track Progress</div>
        <Select options={props.options} />
    </div>;
}
