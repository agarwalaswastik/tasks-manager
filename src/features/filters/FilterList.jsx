import PropTypes from "prop-types";
import CrossableFilter from "./CrossableFilter";
import Filter from "./Filter";

const FilterList = ({ filterIds, onCross, className, children, filtersClassName }) => {
    const getFilterComponent = (filterId) => {
        if (onCross) {
            return (
                <CrossableFilter
                    filterId={filterId}
                    onCross={() => onCross(filterId)}
                    className={filtersClassName}
                />
            );
        } else {
            return <Filter filterId={filterId} className={filtersClassName} />;
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
    filtersClassName: PropTypes.string,
};

export default FilterList;
