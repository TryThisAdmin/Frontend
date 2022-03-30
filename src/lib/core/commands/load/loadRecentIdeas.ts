import { get } from "svelte/store";
import { BACKEND_BASE } from "../../api/endpoint";
import { apiFetch } from "../../api/fetch";
import type { RAW_IdeaPreview } from "../../api/interfaces";
import { mapIdeaPreview } from "../../api/mappings";
import { ERROR_MESSAGE_STORE, RECENT_IDEAS_STORE, TOKEN_STORE } from "../../stores";

/**
 * Loads IdeaPreviews of recent ideas into the RECENT_IDEAS_STORE
 * @param limit Number of ideas to load
 * @param offset Offset to the begin of ideas
 * @param then Function to call after successfull operation
 */
export function loadRecentIdeasCommand(limit = 0, offset = 0, then: () => void = null): void {
	const token = get(TOKEN_STORE);

	const url = new URL(BACKEND_BASE + "/idea/recent");
	url.searchParams.append("token", token);
	if (limit) url.searchParams.append("limit", limit.toString());
	if (offset) url.searchParams.append("offset", offset.toString());

	const error = () => {
		ERROR_MESSAGE_STORE.set("could not fetch recent ideas from server");
	};

	const success = (data: { entries: RAW_IdeaPreview[] }) => {
		RECENT_IDEAS_STORE.set(data.entries.map((e) => mapIdeaPreview(e)));

		if (then) then();
	};

	apiFetch(url.toString(), "GET", null, success, error);
}
