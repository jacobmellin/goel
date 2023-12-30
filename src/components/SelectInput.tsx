import { Select } from "@thisbeyond/solid-select"

interface SelectInputProps {
    options: any,
    format: any,
    onChange: any
    label?: string,
    initialValue?: any
}

export default function SelectInput(props: SelectInputProps) {
    return <div>
        <div class="text-gaze-400 mb-1 left-0.5 relative text-sm font-bold">{props.label}</div>
        <Select 
            initialValue={props.initialValue}
            options={props.options}
            format={props.format}
            onChange={props.onChange}
        />
    </div>;
}
