export async function removePassword<T>(item: T): Promise<Omit<T, "password">> {
	const { password, ...itemWithoutPassword } = item as any
	return itemWithoutPassword
}
