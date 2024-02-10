import { createSignal } from "solid-js"

interface SwitchProps {
    onChange: (v: boolean) => void,
    initialValue: boolean
}


export default function Switch(props: SwitchProps) {
    const [checked, setChecked] = createSignal(props.initialValue);

    return <div class="cursor-pointer" role="switch" aria-checked={checked()} onClick={() => {
        setChecked(!checked());
        props.onChange(checked());
    }}>
        <div class="w-10 h-5 border-white/30 relative transition-colors border rounded-full" classList={{
            "bg-soothe-400": checked() ,
            "bg-gaze-800": !checked()
        }}>
            <span class="w-3.5 h-3.5 absolute transition-all top-[2px] block rounded-full"
                classList={{ 
                    "bg-gaze-800 left-[22px]": checked(),
                    "bg-soothe-400 left-[2px]": !checked()
                }} 
            ></span>
            </div>
        </div>;
}
