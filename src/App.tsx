import { createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";
import { A } from "solid-router";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name: name() }));
  }

  return (
    <main>
        
        <div class="container">
          <h1>Goal</h1>
          <h2>Your Goals</h2>
        </div>
    </main>
  );
}

export default App;
