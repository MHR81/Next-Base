export const formatNumber = (value, locale = 'en-US') => {
    const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (isNaN(num)) return '';
    return new Intl.NumberFormat(locale).format(num);
};

export const formatPhone = (value, pattern = '###-###-####') => {
    const digits = value.replace(/\D/g, '');
    let result = '';
    let digitIndex = 0;

    for (let i = 0; i < pattern.length && digitIndex < digits.length; i++) {
        if (pattern[i] === '#') {
            result += digits[digitIndex];
            digitIndex++;
        } else {
            result += pattern[i];
        }
    }

    return result;
};

export const unformatNumber = (value) => {
    return value.replace(/,/g, '');
};