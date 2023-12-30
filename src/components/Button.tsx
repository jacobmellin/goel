export default function Button(props: any) {
    return <button onClick={props.onClick} class="px-2 text-sm font-medium py-1 rounded uppercase text-soothe-300 border tracking-wider border-white/10 hover:bg-orange-300/50 hover:border-orange-300 transition-colors hover:text-neutral-200 focus:outline-none focus:border-orange-300" classList={{ "text-xs": props.small }}>{ props.children }</button>;
}
