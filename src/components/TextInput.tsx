interface TextInputProps {
    required?: boolean,
    placeholder?: string,
    label?: string,
    initialValue?: string,
    onChange: (v: string) => void
}

export default function TextInput(props: TextInputProps) {
    return <div>
        <div class="text-gaze-400 mb-1 left-0.5 relative text-sm font-bold">{ props.label }</div>
        <input 
            onChange={(e) => props.onChange(e.currentTarget.value)}
            type="text" value={props.initialValue || ""} required={props.required} placeholder={props.placeholder} class="text-gaze-300 w-full bg-gaze-800 py-1 px-2 rounded border border-white/10 focus:outline-none box-border focus:border focus:border-orange-300 transition-colors hover:bg-gaze-700 placeholder-gaze-700 shadow-inner"></input>
    </div>;
}
