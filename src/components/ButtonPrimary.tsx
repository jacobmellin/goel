export default function ButtonPrimary(props: any) {
    return <button disabled={props.disabled} onClick={props.onClick} class="bg-calm-600 px-2 text-sm tracking-wider font-medium py-1 rounded uppercase text-soothe-300 border border-white/20 hover:bg-orange-300/50 hover:border-orange-300 transition-colors hover:text-neutral-200 focus:outline-none focus:border-orange-300">{ props.children }</button>;
}
