import PropTypes from "prop-types";
import { BsPlus } from "react-icons/bs";

const CrossButton = ({ plus, size, onClick, color, className }) => {
    return (
        <button
            onClick={onClick}
            className={`absolute right-1 top-1/2 -translate-y-1/2 rounded-full text-center ${
                plus ? "" : "rotate-45"
            } ${className}`}
        >
            <BsPlus
                className="stroke-1"
                style={{
                    fontSize: size,
                    color,
                }}
            />
        </button>
    );
};

CrossButton.propTypes = {
    plus: PropTypes.bool,
    size: PropTypes.number,
    onClick: PropTypes.func,
    color: PropTypes.string,
    className: PropTypes.string,
};

export default CrossButton;
