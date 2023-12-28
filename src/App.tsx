import "./App.css";
import Logo from "./assets/logo.svg";

import { exit } from '@tauri-apps/api/process';
import Goal from "./components/Goal";


function App() {
  return (
    <main>
        <a href="#" onClick={async () => { await exit(1); alert("hi"); }} class="close-btn absolute bg-red-400 right-5 top-5 rounded-full w-4 h-4 hover:bg-red-200 transition-colors"></a>
        <div class="px-8 py-8 select-none cursor-default">
          <a target="_blank" href="https://github.com/jacobmellin/goel" class="inline-flex text-3xl tracking-wide font-light uppercase text-orange-300 drop-shadow-lg"><Logo class="w-10 h-10 stroke-orange-300 mr-2"/>Goel</a>
          <div class="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mt-10">
            <Goal trackingInterval="daily" text="This is an example goal" />
            <Goal trackingInterval="monthly" text="This is an example goal" />
            <Goal trackingInterval="weekly" text="This is an example goal" />
            <Goal trackingInterval="weekly" text="This is an example goal with a longer text that has a linebreak." />
          </div>
        </div>
    </main>
  );
}

export default App;
