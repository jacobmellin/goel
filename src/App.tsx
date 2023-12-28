import "./App.css";
import { exit } from '@tauri-apps/api/process';


function App() {
  return (
    <main>
        <a href="#" onClick={async () => { await exit(1); alert("hi"); }} class="close-btn absolute bg-red-400 right-5 top-5 rounded-full w-4 h-4 hover:bg-red-200 transition-colors"></a>
        <div class="container px-8 py-8 select-none cursor-default">
          <h1 class="text-3xl tracking-wide font-light text-slate-400 uppercase">Goal</h1>
        </div>
    </main>
  );
}

export default App;
