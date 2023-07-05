export const getLuminance = (color) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

export const generateFontColor = (background) => {
    const luminance = getLuminance(background);
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
};