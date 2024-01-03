export default function Button(props: any) {
    return <button type={props.submit ? 'submit' : 'button'} onClick={props.onClick} class={`px-2 font-medium py-1 rounded uppercase ${props.textColor || "text-soothe-300"} border tracking-wider border-white/10 hover:bg-orange-300/50 hover:border-orange-300 transition-colors hover:text-neutral-200 focus:outline-none focus:border-orange-300 ${props.small? "text-xs" : "text-sm"}`}>{ props.children }</button>;
}
