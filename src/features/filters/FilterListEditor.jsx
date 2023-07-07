import PropTypes from "prop-types";
import FilterList from "./FilterList";
import SelectMenu from "../../components/SelectMenu";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter } from "./filtersSlice";
import Filter from "./Filter";

const FilterListEditor = ({ filterIds, onCross, wrap, onAdd, className, filtersClassName }) => {
    const allFilters = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    const searchFilterFieldRef = useRef();
    const [searchFilterFieldValue, setSearchFilterFieldValue] = useState("");
    const [showDropDown, setShowDropDown] = useState(false);

    const searchedFilters = allFilters.filter((filter) =>
        filter.desc.includes(searchFilterFieldValue.trim())
    );
    const unaddedSearchedFilters = searchedFilters.filter(
        (filter) => filterIds.indexOf(filter.id) === -1
    );
    unaddedSearchedFilters.sort((a, b) => a.desc.localeCompare(b));

    const handleFieldValueChange = (e) => {
        if (e.target.value.length < 40) {
            setSearchFilterFieldValue(e.target.value);
        }
    };

    const createFilterAndAddToList = () => {
        const action = addFilter(searchFilterFieldValue);
        dispatch(action);
        setSearchFilterFieldValue("");
        onAdd(action.payload.id);
    };

    const handleKeyDown = (e) => {
        if (e.key === " ") {
            e.preventDefault();
            if (unaddedSearchedFilters.length) {
                setSearchFilterFieldValue("");
                onAdd(unaddedSearchedFilters[0].id);
            } else if (
                searchFilterFieldValue.trim() &&
                !searchedFilters.find((filter) => filter.desc === searchFilterFieldValue)
            ) {
                createFilterAndAddToList();
            }
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (
                searchFilterFieldValue.trim() &&
                !searchedFilters.find((filter) => filter.desc === searchFilterFieldValue)
            ) {
                createFilterAndAddToList();
            }
        }
    };

    return (
        <>
            <div className={`relative ${className}`}>
                <FilterList
                    filterIds={filterIds}
                    onCross={onCross}
                    className={`flex items-center gap-1 ${wrap ? "flex-wrap" : "w-fit"}`}
                    filtersClassName={filtersClassName}
                >
                    <input
                        name="searchFilterField"
                        type="text"
                        placeholder="Filters..."
                        className="pl-1 focus:outline-none"
                        ref={searchFilterFieldRef}
                        value={searchFilterFieldValue}
                        onBlur={() => setShowDropDown(false)}
                        onChange={(e) => {
                            handleFieldValueChange(e);
                            setShowDropDown(true);
                            searchFilterFieldRef.current.style.width =
                                10 + searchFilterFieldRef.current.value.length + "ch";
                        }}
                        onKeyDown={handleKeyDown}
                    />
                </FilterList>
            </div>

            <FilterSelectionDropdown
                showDropDown={showDropDown}
                searchFilterFieldRef={searchFilterFieldRef}
                unaddedSearchedFilters={unaddedSearchedFilters}
                onAdd={onAdd}
            />
        </>
    );
};

FilterListEditor.propTypes = {
    filterIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    onCross: PropTypes.func,
    wrap: PropTypes.bool,
    onAdd: PropTypes.func.isRequired,
    className: PropTypes.string,
    filtersClassName: PropTypes.string,
};

const FilterSelectionDropdown = ({
    showDropDown,
    searchFilterFieldRef,
    unaddedSearchedFilters,
    onAdd,
}) => {
    if (!searchFilterFieldRef.current) {
        return <></>;
    }
    const { top, left, height } = searchFilterFieldRef.current.getBoundingClientRect();

    return (
        <div
            className={"fixed w-44 " + (showDropDown ? "block" : "hidden") + " z-50 hover:block"}
            style={{
                top: top + height,
                left: left,
            }}
        >
            <SelectMenu
                itemsData={unaddedSearchedFilters}
                renderItem={(itemData) => (
                    <Filter
                        filterId={itemData.id}
                        className="absolute left-1/2 max-w-[90%] -translate-x-1/2 align-top"
                    />
                )}
                onClick={(itemData) => onAdd(itemData.id)}
            />
        </div>
    );
};

FilterSelectionDropdown.propTypes = {
    showDropDown: PropTypes.bool.isRequired,
    searchFilterFieldRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
    unaddedSearchedFilters: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAdd: PropTypes.func.isRequired,
};

export default FilterListEditor;
