import Logo from "../assets/logo.svg";
import { appWindow } from '@tauri-apps/api/window';
import { A } from '@solidjs/router';
import { useGoals } from "../store/goals";
import { Show } from "solid-js";
import EvaIcon from "./EvaIcon";

function NavItem(props: any) {
    return <li class="uppercase tracking-wider p-2 rounded bg-gaze-700/30 min-[600px]:p-0 min-[600px]:bg-transparent">
        <Show when={!props.disabled} fallback={
            <span class="text-md text-gaze-500/30 flex justify-center items-middle gap-2">
                <EvaIcon class="fill-gaze-500/30 w-[22px] min-[600px]:w-5 relative" name={props.iconName} />
                <span class="hidden min-[600px]:block">{props.children}</span>
            </span>}>
            <A href={props.href}
                class="hover:text-calm-300 transition-colors text-md flex items-middle justify-center gap-2"
                end={true}
                inactiveClass="text-calm-500"
                activeClass="underline-offset-4 underline text-calm-300 cursor-default [&>svg]:fill-calm-300 ">
                    <EvaIcon class="cursor-pointer fill-calm-500 w-[22px] min-[600px]:w-5 min-w-5 relative" name={props.iconName} />
                    <span class="hidden min-[600px]:block">{props.children}</span>
            </A>
        </Show>
    </li>;
}

export default function Header() {
    const [goals,] = useGoals();

    return <div data-tauri-drag-region class="px-6 pt-6 select-none cursor-default flex items-center relative z-10">
        <a href="#" onClick={async () => { await appWindow.hide(); }} class="close-btn absolute bg-red-400 right-4 top-4 rounded-full w-3 h-3 hover:bg-red-200 focus:bg-red-200 transition-colors"></a>
        <a target="_blank"
            tabindex="-1"
            href="https://github.com/jacobmellin/goel"
            class="inline-flex text-3xl tracking-wide font-light uppercase text-orange-300 drop-shadow-lg">
            <Logo class="w-10 h-10 stroke-orange-300 mr-2" />
            <span>Goel</span>
        </a>
        <ul class="inline-flex gap-4 ml-8 relative -top-0.5">
            <NavItem href="/" iconName="star">goals</NavItem>
            <NavItem disabled={!goals()?.length} iconName="file-add" href="/track">Track</NavItem>
            <NavItem disabled href="/trash" iconName="trash">Trash</NavItem>
            <NavItem href="/settings" iconName="settings-2">Settings</NavItem>
        </ul>
    </div>;
}
