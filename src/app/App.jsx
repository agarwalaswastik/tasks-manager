import { Provider } from "react-redux";
import { store } from "./store";
import Navbar from "./Navbar";
import TaskBoard from "../features/tasks/TaskBoard";

const App = () => {
    return (
        <Provider store={store}>
            <Navbar />
            <main className="absolute bottom-0 left-0 right-0 top-24 p-2 -z-10">
                <TaskBoard />
            </main>
        </Provider>
    );
};

export default App;
