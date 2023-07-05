import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { filterSelector } from "./filtersSlice";
import { generateFontColor } from "../../utils/colorUtils";

const Filter = ({ filterId, className, children }) => {
    const filter = useSelector((state) => filterSelector(state, filterId));

    return (
        <span
            className={`relative inline-block cursor-pointer select-none rounded-xl px-2 py-0.5 text-sm ${className}`}
            style={{
                backgroundColor: filter.color,
                color: generateFontColor(filter.color),
            }}
        >
            {filter.desc}
            {children}
        </span>
    );
};

Filter.propTypes = {
    filterId: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
};

export default Filter;
