export default function Button(props: any) {
    return <button onClick={props.onClick} class="px-2 text-sm tracking-wide font-medium py-1 rounded uppercase text-soothe-300 border tracking-wider border-white/10 hover:bg-orange-300/50 hover:border-orange-300 transition-colors hover:text-neutral-200">{ props.children }</button>;
}
