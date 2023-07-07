import PropTypes from "prop-types";
import { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";

const EditableText = ({ text, setText, renderText, className }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputText, setInputText] = useState(text);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setIsEditing(false);
            setText(inputText);
        } else if (e.key === "Escape") {
            setIsEditing(false);
            setInputText(text);
        }
    };

    return (
        <div className={className}>
            {!isEditing && renderText(text)}
            {!isEditing && (
                <button onClick={() => setIsEditing(true)}>
                    <BiSolidEdit className="text-sm" />
                </button>
            )}
            {isEditing && (
                <input
                    type="text"
                    className="relative z-30 w-80 border border-black pl-1 text-black"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onBlur={() => {
                        setIsEditing(false);
                        setInputText(text);
                    }}
                    onKeyDown={handleKeyDown}
                />
            )}
        </div>
    );
};

EditableText.propTypes = {
    text: PropTypes.string.isRequired,
    setText: PropTypes.func.isRequired,
    renderText: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default EditableText;
