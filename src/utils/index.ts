// added current fixed to since in javascript
// toFixed-function, the floating point number 5
// does not belong to the upper half of an integer,
// the given number is rounded down
const toFixed = (number: number, decimals: number) => {
    const base = 10 ** decimals;
    return (Math.round(number * base) / base).toFixed(decimals);
};

const rtrim = (str: string, chart?: string): string => {
    chart = !chart ? ' \\s\u00A0' : (chart + '').replace(/([[\]().?/*{}+$^:])/g, '\\$1');
    const re = new RegExp('[' + chart + ']+$', 'g');
    return (str + '').replace(re, '');
};

export { toFixed, rtrim };
