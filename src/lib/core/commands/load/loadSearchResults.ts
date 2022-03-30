import { get } from "svelte/store";
import { BACKEND_BASE } from "../../api/endpoint";
import { apiFetch } from "../../api/fetch";
import type { RAW_IdeaPreview } from "../../api/interfaces";
import { mapIdeaPreview } from "../../api/mappings";
import { ERROR_MESSAGE_STORE, SEARCH_RESULTS_STORE, TOKEN_STORE } from "../../stores";

/**
 * Loads IdeaPreviews of search results into the SEARCH_RESULTS_STORE
 * @param query Query to search for
 * @param limit Number of ideas to load
 * @param offset Offset to the begin of ideas
 * @param then Function to call after successfull operation
 */
export function loadSearchResultsCommand(
	query: string,
	limit = 0,
	offset = 0,
	then: () => void = null
): void {
	const token = get(TOKEN_STORE);

	const url = new URL(BACKEND_BASE + "/idea/search");
	url.searchParams.append("token", token);
	url.searchParams.append("query", query);
	if (limit) url.searchParams.append("limit", limit.toString());
	if (offset) url.searchParams.append("offset", offset.toString());

	const error = () => {
		ERROR_MESSAGE_STORE.set("could not fetch search results from server");
	};

	const success = (data: { entries: RAW_IdeaPreview[] }) => {
		SEARCH_RESULTS_STORE.set(data.entries.map((e) => mapIdeaPreview(e)));

		if (then) then();
	};

	apiFetch(url.toString(), "GET", null, success, error);
}
