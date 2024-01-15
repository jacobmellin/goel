import EvaIcon from "./EvaIcon";

interface TimePickerProps {
    required?: boolean,
    placeholder?: string,
    label?: string,
    onChange: (v: string) => void
}

interface SelectableTimeProps {
    time?: string, 
    onClick?: () => void,
    selected?: boolean
}

// TODO:
//
// - Add validation
// - Dropdown select
// - Time format based on locale

function SelectableTime(props : SelectableTimeProps) {
    return <div classList={{ 'bg-gaze-600 border border-orange-300': props.selected }} class="border-box py-1 hover:bg-gaze-700 mx-1 px-1 transition-colors rounded cursor-pointer">10:45 AM</div>;
}

export default function TimePicker(props: TimePickerProps) {
    return <div class="relative inline-flex w-28 text-gaze-300 bg-gaze-800 py-1 pl-2 rounded border border-white/10 focus:outline-none box-border focus:border focus-within:border-orange-300 transition-colors hover:bg-gaze-700 placeholder-gaze-700 shadow-inner">
        <EvaIcon name="clock-outline" class="w-6 mr-1.5 fill-soothe-400" />
        <input 
            onChange={(e) => props.onChange(e.currentTarget.value)}
            type="text" value="11:45" pattern="[0-9]{2}:[0-9]{2}" required={props.required} placeholder={props.placeholder} class="w-full text-gaze-300 bg-transparent focus:outline-none box-border focus:border-none focus:border-orange-300 transition-colors hover:bg-gaze-700 placeholder-gaze-700 shadow-inner" />
            <button type="button" class="inline-flex w-10 h-6 items-center justify-center">
                <EvaIcon name="arrow-ios-downward-outline" class="w-4 fill-gaze-400" /> 
            </button>
        <div class="absolute right-0 w-max mt-1 top-full tabular-nums whitespace-nowrap z-10 text-sm items-center bg-slate-900/90 rounded shadow-lg border border-white/10 px-2 py-2 grid grid-cols-4 text-center max-h-36 overflow-y-scroll">
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime selected />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
            <SelectableTime />
        </div>
    </div>;
}
