import EvaIcon from "./EvaIcon";

interface TimePickerProps {
    required?: boolean,
    placeholder?: string,
    label?: string,
    onChange: (v: string) => void
}

// TODO:
//
// - Add validation
// - Dropdown select
// - Time format based on locale
// - Focus of container element

export default function TimePicker(props: TimePickerProps) {
    return <div class="inline-flex w-28 text-gaze-300 bg-gaze-800 py-1 pl-2 rounded border border-white/10 focus:outline-none box-border focus:border focus:border-orange-300 transition-colors hover:bg-gaze-700 placeholder-gaze-700 shadow-inner">
        <EvaIcon name="clock-outline" class="w-6 mr-1.5 fill-soothe-400" />
        <input 
            onChange={(e) => props.onChange(e.currentTarget.value)}
            type="text" value="11:45" pattern="[0-9]{2}:[0-9]{2}" required={props.required} placeholder={props.placeholder} class="w-full text-gaze-300 bg-transparent focus:outline-none box-border focus:border-none focus:border-orange-300 transition-colors hover:bg-gaze-700 placeholder-gaze-700 shadow-inner" />
            <button type="button" class="inline-flex w-10 h-6 items-center justify-center">
                <EvaIcon name="arrow-ios-downward-outline" class="w-4 fill-gaze-400" /> 
            </button>
    </div>;
}
