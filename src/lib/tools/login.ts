import { get, writable } from "svelte/store";

export const SHOW_LOGIN = writable(false);

export function showLogin(): void {
	SHOW_LOGIN.set(true);
}

export function hideLogin(): void {
	SHOW_LOGIN.set(false);
}

export function toggleLogin(): void {
	SHOW_LOGIN.set(!get(SHOW_LOGIN));
}
