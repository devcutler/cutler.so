export function formatDate(dateString: string): string {
	const date = dateString.match(/^\d{4}-\d{2}-\d{2}$/)
		? new Date(`${dateString}T12:00:00Z`)
		: new Date(dateString);

	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

export function formatDateShort(dateString: string): string {
	const date = dateString.match(/^\d{4}-\d{2}-\d{2}$/)
		? new Date(`${dateString}T12:00:00Z`)
		: new Date(dateString);

	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: '2-digit'
	});
}