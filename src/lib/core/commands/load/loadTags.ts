import { BACKEND_BASE } from "$lib/core/api/endpoint";
import { apiFetch } from "$lib/core/api/fetch";
import { ERROR_MESSAGE_STORE, TAG_STORE } from "$lib/core/stores";

/**
 * Loads all used tags into the TAG_STORE
 * @param then Function to call after successfull operation
 */
export function loadTagsCommand(then: () => void = null): void {
	const url = new URL(BACKEND_BASE + "/info/tags");

	const error = () => {
		ERROR_MESSAGE_STORE.set("Could not load tags");
	};

	const success = (data: { entries: string[] }) => {
		TAG_STORE.set(data.entries);

		if (then) then();
	};

	apiFetch(url.toString(), "GET", null, success, error);
}
