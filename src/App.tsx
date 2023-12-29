import "./App.css";

import GoalsView from "./components/GoalsView";
import Header from "./components/Header";
import Modal from "./components/Modal";

function App() {
    return (
        <main class="">
            <Header />
            <div class="px-6 select-none cursor-default z-0">
                <GoalsView />
            </div>
            {/* <Modal /> */}
        </main>
    );
}

export default App;
