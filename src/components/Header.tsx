import Logo from "../assets/logo.svg";
import { appWindow } from '@tauri-apps/api/window';
import { A } from '@solidjs/router';

function NavItem(props: any) {
    return <li><A href={props.href} class="uppercase tracking-wider text-calm-500 hover:text-calm-200 transition-colors" activeClass="text-calm-200">{props.children}</A></li>;
}

export default function Header() {
    return <div data-tauri-drag-region class="px-6 pt-6 select-none cursor-default flex items-center relative z-10">
        <a href="#" onClick={async () => { await appWindow.hide(); }} class="close-btn absolute bg-red-400 right-4 top-4 rounded-full w-3 h-3 hover:bg-red-200 focus:bg-red-200 transition-colors"></a>
        <a target="_blank"
            tabindex="-1"
            href="https://github.com/jacobmellin/goel"
            class="inline-flex text-3xl tracking-wide font-light uppercase text-orange-300 drop-shadow-lg">
            <Logo class="w-10 h-10 stroke-orange-300 mr-2" />
            <span>Goel</span>
        </a>
        <ul class="inline-flex gap-4 ml-8">
            <NavItem href="/">My goals</NavItem>
            <NavItem href="/progress">Track Progress</NavItem>
            <NavItem href="/trash">Trash</NavItem>
            <NavItem href="/settings">Settings</NavItem>
        </ul>
    </div>;
}
