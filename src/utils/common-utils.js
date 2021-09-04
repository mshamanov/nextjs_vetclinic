let idx = 0;

export const generateId = function (prefix = "") {
    return `${prefix}-${idx++}`;
}

export function parseDateToInputFormat(date) {
    const d = date.getDate();
    const y = date.getFullYear();
    const m = date.getMonth() + 1;

    const year = "0".repeat(4 - String(y).length) + y;
    const day = d < 10 ? `0${d}` : d;
    const month = m < 10 ? `0${m}` : m;

    return `${year}-${month}-${day}`;
}

export function parseDateFromInputFormat(value) {
    let date;

    value.replace(/(\d{1,4})-(\d{2})-(\d{2})/g, (_, year, month, day) => {
        date = new Date(year, +month - 1, day);
    });

    return date;
}

export function mapKeyAsTitle(key, value) {
    key = key.replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());
    if (key.toLowerCase() === "email" && value.includes("@")) {
        value = <a href={`mailto:${value}`}>{value}</a>;
    }

    return {
        key,
        value
    }
}

export function getKeyValuePairs(obj, mapFn) {
    return Object.keys(obj).filter(k => k !== "id" && typeof obj[k] === "string").map(k => {
        let key = k;
        let value = obj[k];

        if (mapFn) {
            const result = mapFn(key, value);
            if (result) {
                key = result.key;
                value = result.value;
            }
        }

        return {
            key,
            value
        };
    });
}