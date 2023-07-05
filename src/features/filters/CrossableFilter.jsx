import PropTypes from "prop-types";
import Filter from "./Filter";
import CrossButton from "../../components/CrossButton";

const CrossableFilter = ({ filterId, onCross }) => {
    return (
        <Filter filterId={filterId} className="pr-6">
            <CrossButton size={12} onClick={onCross}/>
        </Filter>
    );
};

CrossableFilter.propTypes = {
    filterId: PropTypes.string.isRequired,
    onCross: PropTypes.func,
};

export default CrossableFilter;