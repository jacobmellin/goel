import { createSignal, onMount } from "solid-js";

interface TextInputProps {
    label: string,
    required?: boolean,
    placeholder?: string,
    default?: number,
    min?: number,
    max?: number,
    onChange: (n: number) => void
}

export default function TextInput(props: TextInputProps) {
    const [value, setValue] = createSignal(props.default || 0);

    const updateValue = (numValue: string | number) => {
        let num: number;
        if(typeof numValue === 'number') {
            num = numValue; 
        } else {
            num = parseInt(numValue, 10); 
        }
        const clamped = Math.min(Math.max(num, props.min || -Infinity), props.max || Infinity);
        setValue(clamped); 
        props.onChange(value());
    };

    onMount(async() => { 
        props.onChange(value());
    });

    return <div>
        <div class="text-gaze-400 mb-1 mx-0.5 relative text-sm font-bold">{props.label}</div>
        <div class="relative">
            <input type="number" min={props.min} max={props.max} placeholder={props.placeholder} class="text-gaze-300 w-full bg-gaze-800 py-1 px-2 rounded border border-white/10 focus:outline-none box-border focus:border focus:border-orange-300 transition-colors hover:bg-gaze-700 placeholder-gaze-700 pr-10 shadow-inner" onChange={(e) => updateValue(e.target.value)} value={value()}></input>
            <div class="absolute right-1 top-0 h-full z-10 flex items-center">
                <button type="button" onClick={() => updateValue(value()-1)} class="w-6 h-6 bg-gaze-800 rounded-tl rounded-bl border border-white/10 font-bold text-gaze-300 text-lg leading-none text-center hover:bg-orange-300/50 hover:border-orange-300 transition-colors hover:text-neutral-200 focus:outline-none focus:border-orange-300 relative"><span>-</span></button>
                <button type="button" onClick={() => updateValue(value()+1)}class="w-6 h-6 bg-gaze-800 rounded-tr rounded-br border border-white/10 border-l-transparent font-bold text-gaze-300 text-lg leading-none text-center hover:bg-orange-300/50 hover:border-orange-300 transition-colors hover:text-neutral-200 focus:outline-none focus:border-orange-300"><span>+</span></button>
            </div>
        </div>
    </div>;
}
