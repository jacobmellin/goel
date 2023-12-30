import { Select } from "@thisbeyond/solid-select"

interface SelectInputProps {
    options: any,
    format: any,
    onChange: any
    label?: string
}

export default function SelectInput(props: SelectInputProps) {
    return <div>
        <div class="text-gaze-400 mb-1 left-0.5 relative text-sm font-bold">{props.label}</div>
        <Select 
            options={props.options}
            format={props.format}
            onChange={props.onChange}
        />
    </div>;
}
