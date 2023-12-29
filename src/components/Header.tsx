import Logo from "../assets/logo.svg";
import { exit } from '@tauri-apps/api/process';

export default function Header() {
    return <div class="px-6 pt-6 select-none cursor-default relative z-10">
        <a href="#" onClick={async () => { await exit(1); alert("hi"); }} class="close-btn absolute bg-red-400 right-4 top-4 rounded-full w-3 h-3 hover:bg-red-200 transition-colors"></a>
        <a target="_blank"
            href="https://github.com/jacobmellin/goel"
            class="inline-flex text-3xl tracking-wide font-light uppercase text-orange-300 drop-shadow-lg">
            <Logo class="w-10 h-10 stroke-orange-300 mr-2" />
            <span>Goel</span>
        </a>
    </div>;
}
