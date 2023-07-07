import { useDispatch } from "react-redux";
import CrossButton from "../components/CrossButton";
import SearchBar from "../features/search/SearchBar";
import { addTaskList } from "../features/tasks/tasksSlice";

const Navbar = () => {
    const dispatch = useDispatch();

    return (
        <nav className="fixed flex w-full items-center border-b-4 border-black shadow-lg bg-white p-4 pr-24">
            <SearchBar />
            <CrossButton
                plus={true}
                size={70}
                color="#00cc00"
                onClick={() => dispatch(addTaskList("New Task List"))}
                className="right-3 hover:bg-gray-100"
            />
        </nav>
    );
};

export default Navbar;
