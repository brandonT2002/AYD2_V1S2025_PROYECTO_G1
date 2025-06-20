// DatePicker/config/index.js
export const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Devuelve 100 años hacia atrás (útil para el <select>)
export const YEARS = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
);
