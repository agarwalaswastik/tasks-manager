import { useDispatch, useSelector } from "react-redux";
import FilterListEditor from "../filters/FilterListEditor";
import { addSearchFilter, removeSearchFilter } from "./searchSlice";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
    const searchFilterIds = useSelector((state) => state.search.searchFilterIds);
    const dispatch = useDispatch();

    return (
        <div className="flex h-12 w-full items-center rounded-xl border border-black pl-1">
            <div className="flex h-12 w-[85%] items-center">
                <FilterListEditor
                    filterIds={searchFilterIds}
                    onCross={(filterId) => dispatch(removeSearchFilter(filterId))}
                    wrap={false}
                    onAdd={(filterId) => dispatch(addSearchFilter(filterId))}
                />
            </div>

            <input
                name="searchTextField"
                type="text"
                placeholder="Description..."
                className="ml-2 h-12 w-[10%] border border-black pl-1 focus:outline-none"
            />
            <button className="relative h-full w-[5%] rounded-e-xl bg-gray-300 hover:bg-gray-400">
                <FiSearch className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            </button>
        </div>
    );
};

export default SearchBar;
