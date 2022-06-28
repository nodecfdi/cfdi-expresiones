// added current fixed to since in javascript
// toFixed-function, the floating point number 5
// does not belong to the upper half of an integer,
// the given number is rounded down
const toFixed = (number: number, decimals: number): string => {
    const base = 10 ** decimals;

    return (Math.round(number * base) / base).toFixed(decimals);
};

const rtrim = (str: string, chart?: string): string => {
    chart = !chart ? ' \\s\u00A0' : (chart + '').replace(/([[\]().?/*{}+$^:])/g, '\\$1');
    const re = new RegExp('[' + chart + ']+$', 'g');

    return (str + '').replace(re, '');
};

const html_entities = (str: string): string => {
    const tagsToReplace: Record<string, string> = {
        '&': '&amp;'
    };
    const replaceTag = (tag: string): string => {
        return tagsToReplace[tag] || tag;
    };

    return str.replace(/[&<>]/g, replaceTag);
};

export { toFixed, rtrim, html_entities };
