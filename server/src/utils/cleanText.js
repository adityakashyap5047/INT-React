export const cleanText = (text) => {
    if (!text) return "";

    return text
        .replace(/\t/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .replace(/ {2,}/g, " ")
        .trim();
};