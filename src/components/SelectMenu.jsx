import PropTypes from "prop-types";

const SelectMenu = ({ itemsData, renderItem, onClick }) => {
    return (
        <ul className="max-h-[10rem] w-full overflow-y-scroll border border-gray-400">
            {itemsData.map((itemData) => (
                <li
                    key={itemData.id}
                    onClick={onClick && (() => onClick(itemData))}
                    className="relative w-full cursor-pointer select-none border border-gray-200 bg-gray-50 p-2 hover:bg-gray-200"
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
