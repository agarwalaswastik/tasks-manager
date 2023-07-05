import PropTypes from "prop-types";
import CrossableFilter from "./CrossableFilter";
import Filter from "./Filter";

const FilterList = ({ filterIds, crossable, onCross }) => {
    const getFilterComponent = (filterId) => {
        if (crossable) {
            return <CrossableFilter filterId={filterId} onCross={() => onCross(filterId)} />;
        } else {
            return <Filter filterId={filterId} />;
        }
    };

    return (
        <ul className="flex flex-wrap gap-1">
            {filterIds.map((filterId) => (
                <li key={filterId}>{getFilterComponent(filterId)}</li>
            ))}
        </ul>
    );
};

FilterList.propTypes = {
    filterIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    crossable: PropTypes.bool,
    onCross: PropTypes.func,
};

export default FilterList;
