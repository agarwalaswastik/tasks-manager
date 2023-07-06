import PropTypes from "prop-types";

const SelectMenu = ({ itemsData, renderItem, onClick }) => {
    return (
        <ul className="w-full border border-gray-400 max-h-[10rem] overflow-y-scroll">
            {itemsData.map((itemData) => (
                <li
                    key={itemData.id}
                    onClick={onClick && (() => onClick(itemData))}
                    className="w-full relative cursor-pointer select-none border border-gray-200 bg-gray-50 p-2 hover:bg-gray-200"
                >
                    {renderItem(itemData)}
                </li>
            ))}
        </ul>
    );
};

SelectMenu.propTypes = {
    itemsData: PropTypes.arrayOf(PropTypes.object).isRequired,
    renderItem: PropTypes.func.isRequired,
    onClick: PropTypes.func,
};

export default SelectMenu;
