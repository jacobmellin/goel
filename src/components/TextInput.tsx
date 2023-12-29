export default function TextInput(props: any) {
    return <div class="my-4">
        <div class="text-gaze-400 mb-1 left-0.5 relative text-sm font-bold">{ props.label }</div>
        <input type="text" placeholder={props.placeholder} class="text-gaze-300 w-full bg-gaze-800 h-8 px-2 rounded border border-white/10 focus:outline-none box-border focus:border focus:border-orange-300 transition-colors hover:bg-gaze-700 placeholder-gaze-700"></input>
    </div>;
}
