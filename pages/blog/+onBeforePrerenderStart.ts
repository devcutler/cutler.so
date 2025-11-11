export async function onBeforePrerenderStart(): Promise<string[]> {
	return [ '/blog' ];
}