import { useDispatch } from "react-redux";
import CrossButton from "../components/CrossButton";
import SearchBar from "../features/search/SearchBar";
import { addTaskList } from "../features/tasks/tasksSlice";

const Navbar = () => {
    const dispatch = useDispatch();

    return (
        <nav className="fixed w-full flex items-center border-b border-black p-4 pr-24">
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
