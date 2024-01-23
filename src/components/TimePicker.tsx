import { For, createMemo, createSignal } from "solid-js";
import EvaIcon from "./EvaIcon";
import { createEffect } from "solid-js";

interface TimePickerProps {
    required?: boolean,
    label?: string,
    initialTime?: string,
    labelRight?: boolean,
    onChange: (v: Date) => void
}

interface SelectableTimeProps {
    time?: Date,
    onClick?: () => void,
    selected?: boolean
}

function getTimes() {
    const times = [];
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 4; j++) {
            times.push(new Date(0, 0, 0, i, j * 15));
        }
    }
    return times;
}


// TODO: Correctly parse AM/PM
function parseTime(text: string) {
    var time = text.match(/(\d?\d):?(\d?\d?)/);
    var h = parseInt(time![1], 10);
    var m = parseInt(time![2], 10) || 0;

    if (h > 24) {
        // try a different format
        time = text.match(/(\d)(\d?\d?)/);
        h = parseInt(time![1], 10);
        m = parseInt(time![2], 10) || 0;
    }

    if(text.toLowerCase().includes("pm") && h !== 12) {
        h = 12 + h;
    }

    var d = new Date();
    d.setHours(h);
    d.setMinutes(m);
    return d;

}

function SelectableTime(props: SelectableTimeProps) {
    return <div onClick={props.onClick} classList={{ 'bg-gaze-600 border border-orange-300': props.selected }} class="border-box py-1 hover:bg-gaze-700 mx-1 px-1 transition-colors rounded cursor-pointer">{props.time?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>;
}

export default function TimePicker(props: TimePickerProps) {
    const [selectedTime, setSelectedTime] = createSignal(parseTime(props.initialTime || "15:27"));
    const [menuVisible, setMenuVisible] = createSignal(false);
    const inputTime = createMemo(() => {
        return selectedTime().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    });
    let timePickerRoot: HTMLDivElement;
    let input: HTMLInputElement;

    createEffect(() => {
        setSelectedTime(parseTime(props.initialTime || "15:27"));
    });

    const handleTimeInput = (newInput: string) => {
        let parsedDate;
        try {
            parsedDate = parseTime(newInput);
            setSelectedTime(parsedDate);
            props.onChange(parsedDate);
        } catch (e) {
            input.value = inputTime();
        }
    };

    document.addEventListener('click', (event) => {
        if (!timePickerRoot.contains(event.target as HTMLElement)) {
            setMenuVisible(false);
        }
    });
    return <div>
        <div class="text-gaze-400 mb-1 mx-0.5 relative text-sm font-bold" classList={{ 'text-right' : props.labelRight }}>{props.label}</div>
        <div ref={timePickerRoot!} class="relative inline-flex w-28 text-gaze-300 bg-gaze-800 py-1 pl-2 rounded border border-white/10 focus:outline-none box-border focus:border focus-within:border-orange-300 transition-colors hover:bg-gaze-700 placeholder-gaze-700 shadow-inner">
            <EvaIcon name="clock-outline" class="w-6 mr-1.5 fill-soothe-400" />
            <input
                ref={input!}
                onChange={(e) => handleTimeInput(e.currentTarget.value)}
                onFocus={() => setMenuVisible(true)}
                type="text" value={inputTime()} pattern="[0-9]{2}:[0-9]{2}" required={props.required} class="w-full tabular-nums text-md text-gaze-300 bg-transparent focus:outline-none box-border focus:border-none focus:border-orange-300 transition-colors hover:bg-gaze-700 placeholder-gaze-700 shadow-inner" />
            <button onClick={() => setMenuVisible(true)} type="button" class="inline-flex w-10 h-6 items-center justify-center">
                <EvaIcon name="arrow-ios-downward-outline" class="w-4 fill-gaze-400" />
            </button>
            <div classList={{ 'hidden': !menuVisible() }} class="absolute right-0 w-max mt-1 top-full tabular-nums whitespace-nowrap z-10 text-sm items-center bg-slate-900/90 rounded shadow-lg border border-white/10 px-2 py-2 grid grid-cols-4 text-center max-h-36 overflow-y-scroll">
                <For each={getTimes()}>{(time) =>
                    <SelectableTime time={time} onClick={() => {
                        setSelectedTime(time);
                        props.onChange(selectedTime());
                        setMenuVisible(false);
                    }} />
                }</For>
            </div>
        </div>
    </div>;
}
