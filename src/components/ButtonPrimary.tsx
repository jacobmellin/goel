export default function ButtonPrimary(props: any) {
    return <button class="bg-soothe-800 px-2 text-sm tracking-wide font-medium py-1 rounded uppercase text-soothe-200 border border-white/10 hover:bg-orange-300/50 hover:border-orange-300 transition-colors hover:text-neutral-200">{ props.children }</button>;
}
