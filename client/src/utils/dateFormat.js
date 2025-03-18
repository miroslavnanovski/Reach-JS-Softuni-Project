export default function dateFormat(dateStr){

    if (!dateStr) return "Invalid Date"; // Handle null/undefined input

    const date = new Date(dateStr);
    
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    
    // Add ordinal suffix manually
    const day = date.getUTCDate();
    const suffix = (day) => ["th", "st", "nd", "rd"][(day % 10 > 3 || Math.floor((day % 100) / 10) === 1) ? 0 : day % 10];
    
    return (`${formattedDate.replace(/\d+/, day + suffix(day))}`);


}