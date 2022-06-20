
/**
 * Get weather time for hourly section.
 * @param {Number} tdDate - Weather date.
 */
export const getHour =  (tdDate) => {
    const time = new Date(tdDate * 1000).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    return time;
}

/**
 * Get weather date for daily section.
 * @param {Number} tdDate - Weather date.
 */
export const getDay =  (tdDate) => {
    const day = new Date(tdDate * 1000).toLocaleString("en-us", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
    return day;
}

/**
 * Get current time
 */
export const getNow =  () => {
    const day = new Date().toLocaleString("en-us", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    return day;
}