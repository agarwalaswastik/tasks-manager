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

const hslToHex = (h, s, l) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
};

let h = Math.random();
const golden_ratio_conjugate = 0.618033988749895;

export const generateNextColor = () => {
    h = (h + golden_ratio_conjugate) % 1;
    return hslToHex(h * 360, 85, 50);
};
