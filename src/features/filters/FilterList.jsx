import PropTypes from "prop-types";
import CrossableFilter from "./CrossableFilter";
import Filter from "./Filter";

const FilterList = ({ filterIds, onCross, className, children }) => {
    const getFilterComponent = (filterId) => {
        if (onCross) {
            return <CrossableFilter filterId={filterId} onCross={() => onCross(filterId)} />;
        } else {
            return <Filter filterId={filterId} />;
        }
    };

    return (
        <ul className={className}>
            {filterIds.map((filterId) => (
                <li key={filterId}>{getFilterComponent(filterId)}</li>
            ))}
            {children}
        </ul>
    );
};

FilterList.propTypes = {
    filterIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    onCross: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
};

export default FilterList;
