import { useDispatch, useSelector } from "react-redux";
import FilterListEditor from "../filters/FilterListEditor";
import { addSearchFilter, applySearchQuery, removeSearchFilter } from "./searchSlice";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

const SearchBar = () => {
    const searchFilterIds = useSelector((state) => state.search.searchFilterIds);
    const searchQuery = useSelector((state) => state.search.searchQuery);
    const dispatch = useDispatch();

    const [searchTextFieldValue, setSearchTextFieldValue] = useState(searchQuery);

    const handleSearchTextValueChange = (e) => {
        setSearchTextFieldValue(e.target.value);
    };

    const handleApplySearchQuery = () => {
        dispatch(applySearchQuery(searchTextFieldValue));
    };

    return (
        <div className="flex h-12 w-full items-center rounded-xl border border-black bg-white pl-1">
            <FilterListEditor
                filterIds={searchFilterIds}
                onCross={(filterId) => dispatch(removeSearchFilter(filterId))}
                wrap={false}
                onAdd={(filterId) => dispatch(addSearchFilter(filterId))}
                className="flex h-12 w-[65%] items-center overflow-x-auto"
            />

            <input
                name="searchTextField"
                type="text"
                placeholder="Description..."
                className="h-12 w-[30%] border border-black px-1 focus:outline-none"
                value={searchTextFieldValue}
                onBlur={() => setSearchTextFieldValue(searchQuery)}
                onChange={handleSearchTextValueChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleApplySearchQuery();
                    }
                }}
            />
            <button
                onClick={handleApplySearchQuery}
                className="relative h-full w-[5%] rounded-e-xl bg-gray-300 hover:bg-gray-400"
            >
                <FiSearch className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            </button>
        </div>
    );
};

export default SearchBar;
