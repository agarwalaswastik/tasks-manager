import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
    return (
        <Provider store={store}>
            <></>
        </Provider>
    );
};

export default App;