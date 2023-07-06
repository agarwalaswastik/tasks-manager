import PropTypes from "prop-types";
import FilterList from "./FilterList";
import SelectMenu from "../../components/SelectMenu";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter } from "./filtersSlice";
import Filter from "./Filter";

const FilterListEditor = ({ filterIds, onCross, wrap, onAdd }) => {
    const allFilters = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    const [searchFilterFieldValue, setSearchFilterFieldValue] = useState("");

    const searchedFilters = allFilters.filter((filter) =>
        filter.desc.includes(searchFilterFieldValue.trim())
    );
    const unaddedSearchedFilters = searchedFilters.filter(
        (filter) => filterIds.indexOf(filter.id) === -1
    );

    const handleFieldValueChange = (e) => {
        if (e.target.value.length < 40) {
            setSearchFilterFieldValue(e.target.value);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (unaddedSearchedFilters.length) {
                onAdd(unaddedSearchedFilters[0].id);
            } else if (searchFilterFieldValue.trim()) {
                dispatch(addFilter(searchFilterFieldValue.trim()));
            }
        }
    };

    return (
        <FilterList
            filterIds={filterIds}
            onCross={onCross}
            className={`flex items-center gap-1 ${wrap ? "flex-wrap" : "w-fit"}`}
        >
            <div className="relative">
                <input
                    name="searchFilterField"
                    type="text"
                    placeholder="Filters..."
                    style={{
                        width: `${10 + searchFilterFieldValue.length}ch`,
                    }}
                    className="peer pl-1 focus:outline-none"
                    value={searchFilterFieldValue}
                    onChange={handleFieldValueChange}
                    onKeyDown={handleKeyDown}
                />
                <div className="absolute left-0 top-full hidden w-44 hover:block peer-focus:block">
                    <SelectMenu
                        itemsData={unaddedSearchedFilters}
                        renderItem={(itemData) => (
                            <Filter
                                filterId={itemData.id}
                                className="absolute left-1/2 max-w-[90%] -translate-x-1/2 overflow-hidden text-ellipsis whitespace-nowrap align-top"
                            />
                        )}
                        onClick={(itemData) => onAdd(itemData.id)}
                    />
                </div>
            </div>
        </FilterList>
    );
};

FilterListEditor.propTypes = {
    filterIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    onCross: PropTypes.func,
    wrap: PropTypes.bool,
    onAdd: PropTypes.func.isRequired,
};

export default FilterListEditor;
