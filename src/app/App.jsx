import { Provider } from "react-redux";
import { store } from "./store";
import SearchBar from "../features/search/SearchBar";

const App = () => {
    return (
        <Provider store={store}>
            <SearchBar />
        </Provider>
    );
};

export default App;