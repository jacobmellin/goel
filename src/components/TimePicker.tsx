import EvaIcon from "./EvaIcon";

interface TimePickerProps {
    required?: boolean,
    placeholder?: string,
    label?: string,
    onChange: (v: string) => void
}

export default function TimePicker(props: TimePickerProps) {
    return <div class="inline-flex w-20 text-gaze-300 bg-gaze-800 py-1 px-2 rounded border border-white/10 focus:outline-none box-border focus:border focus:border-orange-300 transition-colors hover:bg-gaze-700 placeholder-gaze-700 shadow-inner">
        <EvaIcon name="clock-outline" class="w-6 mr-1.5 fill-soothe-400" />
        <input 
            onChange={(e) => props.onChange(e.currentTarget.value)}
            type="text" value="11:45" pattern="[0-9]{2}:[0-9]{2}" required={props.required} placeholder={props.placeholder} class="w-full text-gaze-300 bg-transparent focus:outline-none box-border focus:border-none focus:border-orange-300 transition-colors hover:bg-gaze-700 placeholder-gaze-700 shadow-inner" />
    </div>;
}
