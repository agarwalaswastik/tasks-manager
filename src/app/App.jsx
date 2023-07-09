import { Provider } from "react-redux";
import { store, persistor } from "./store";
import Navbar from "./Navbar";
import TaskBoard from "../features/tasks/TaskBoard";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Navbar />
                <main className="absolute bottom-0 left-0 right-0 top-24 -z-10 p-2">
                    <TaskBoard />
                </main>
            </PersistGate>
        </Provider>
    );
};

export default App;
