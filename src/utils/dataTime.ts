export const beginDate = (): string => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1); // Subtract one day to get yesterday's date
    const formattedDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    return formattedDate;
};

export const convertToDateFormat = (isoDate: string): string => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};
