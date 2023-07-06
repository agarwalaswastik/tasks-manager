import { Provider } from "react-redux";
import { store } from "./store";
import FilterListEditor from "../features/filters/FilterListEditor";

const App = () => {
    return (
        <Provider store={store}>
            <FilterListEditor onAdd={() => {}} filterIds={[]} wrap={true}/>  
        </Provider>
    );
};

export default App;