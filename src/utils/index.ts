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
        '"': '&quot;',
        '&': '&amp;',
        "'": '&#x27;',
        '<': '&lt;',
        // See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
        // following is not strictly necessary unless it’s part of a tag or an
        // unquoted attribute value. We’re only escaping it to support those
        // situations, and for XML support.
        '>': '&gt;',
        // In Internet Explorer ≤ 8, the backtick character can be used
        // to break out of (un)quoted attribute values or HTML comments.
        // See http://html5sec.org/#102, http://html5sec.org/#108, and
        // http://html5sec.org/#133.
        '`': '&#x60;'
    };
    const replaceTag = (tag: string): string => {
        return tagsToReplace[tag];
    };

    return str.replace(/["&'<>`]/g, replaceTag);
};

export { toFixed, rtrim, html_entities };
