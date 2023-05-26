const getDaysDiff = (date) => {
    const { eachDayOfInterval, format } = require('date-fns');

    const startDate = new Date(date[0].startDate);
    const endDate = new Date(date[0].endDate);
    const daysBetween = eachDayOfInterval({ start: startDate, end: endDate });
    return daysBetween.map(day => format(day, 'dd/MM/yyyy'));
}

export const generateRandomId = () => {
    const timestamp = Date.now().toString(); // Get the current timestamp
    const random = Math.random().toString().substr(2, 5); // Get a random number and remove "0." from the beginning

    return `${timestamp}-${random}`; // Combine the timestamp and random number to form the ID
}

export default getDaysDiff