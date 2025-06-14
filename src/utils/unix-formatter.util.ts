

export function unixFormatter(date: Date | null) {
    if (!date) return null;
    
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}