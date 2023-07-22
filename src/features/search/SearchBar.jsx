import { useDispatch, useSelector } from "react-redux";
import FilterListEditor from "../filters/FilterListEditor";
import { addSearchFilter, applySearchQuery, removeSearchFilter } from "./searchSlice";

const SearchBar = () => {
    const searchFilterIds = useSelector((state) => state.search.searchFilterIds);
    const searchQuery = useSelector((state) => state.search.searchQuery);
    const dispatch = useDispatch();

    const handleSearchTextValueChange = (e) => {
        dispatch(applySearchQuery(e.target.value));
    };

    return (
        <div className="flex h-12 w-full items-center rounded-xl border-4 border-r-2 border-black bg-white pl-1">
            <FilterListEditor
                filterIds={searchFilterIds}
                onCross={(filterId) => dispatch(removeSearchFilter(filterId))}
                wrap={false}
                onAdd={(filterId) => dispatch(addSearchFilter(filterId))}
                className="flex h-12 w-[60%] items-center overflow-x-auto"
                filtersClassName="align-top"
            />

            <input
                name="searchTextField"
                type="text"
                placeholder="Search..."
                className="h-12 w-[40%] rounded-e-xl border-4 border-r-2 border-black px-1 focus:outline-none"
                value={searchQuery}
                onChange={handleSearchTextValueChange}
            />
        </div>
    );
};

export default SearchBar;
