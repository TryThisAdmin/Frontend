import { get } from "svelte/store";
import { BACKEND_BASE } from "../../api/endpoint";
import { apiFetch } from "../../api/fetch";
import type { RAW_Idea } from "../../api/interfaces";
import { mapIdea } from "../../api/mappings";
import { CURRENT_IDEA_STORE, ERROR_MESSAGE_STORE, TOKEN_STORE } from "../../stores";

/**
 * Loads Idea into the CURRENT_IDEA_STORE
 * @param id Ideas ID to load
 * @param then Function to call after successfull operation
 */
export function loadIdeaCommand(id: string, then: () => void = null): void {
	const token = get(TOKEN_STORE);

	const url = new URL(BACKEND_BASE + "/idea");
	url.searchParams.append("id", id);
	url.searchParams.append("token", token);

	const error = (code: number) => {
		if (code == 404) {
			ERROR_MESSAGE_STORE.set("entry not found");
		} else {
			ERROR_MESSAGE_STORE.set("could not fetch data from server");
		}
	};

	const success = (data: { entries: RAW_Idea[] }) => {
		if (!data.entries.length) {
			ERROR_MESSAGE_STORE.set("something went wrong");
			return;
		} else {
			CURRENT_IDEA_STORE.set(mapIdea(data.entries[0]));
		}

		if (then) then();
	};

	apiFetch(url.toString(), "GET", null, success, error);
}
