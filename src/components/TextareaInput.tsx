import { ResolvedChildren } from "solid-js";

interface TextInputProps {
    required?: boolean,
    placeholder?: string,
    label?: string,
    onChange: (v: string) => void,
    children: ResolvedChildren;
}

export default function TextareaInput(props: TextInputProps) {
    return <div>
        <div class="text-gaze-400 mb-1 left-0.5 relative text-sm font-bold">{ props.label }</div>
        <textarea 
            onChange={(e) => props.onChange(e.currentTarget.value)}
            required={props.required} placeholder={props.placeholder} class="min-h-20 text-gaze-300 w-full bg-gaze-800 py-1 px-2 rounded border border-white/10 focus:outline-none box-border focus:border focus:border-orange-300 transition-colors hover:bg-gaze-700 placeholder-gaze-700 shadow-inner">{props.children}</textarea>
    </div>;
}
