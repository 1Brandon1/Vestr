/**
 * Utility to merge Tailwind CSS class names conditionally.
 * Filters out falsy values and joins the rest with spaces.
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
	return classes.filter(Boolean).join(' ')
}
