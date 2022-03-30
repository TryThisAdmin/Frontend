import { get } from "svelte/store";
import { BACKEND_BASE } from "../../api/endpoint";
import { apiFetch } from "../../api/fetch";
import type { RAW_Comment } from "../../api/interfaces";
import { mapComment } from "../../api/mappings";
import { COMMENTS_STORE, ERROR_MESSAGE_STORE, TOKEN_STORE } from "../../stores";

/**
 * Loads Comments into the COMMENTS_STORE
 * @param idea Idea to load comments from
 * @param limit Number of comments to load
 * @param offset Offset to the begin of comments
 * @param then Function to call after successfull operation
 */
export function loadCommentsCommand(
	idea: string,
	limit = 0,
	offset = 0,
	then: () => void = null
): void {
	const token = get(TOKEN_STORE);

	const url = new URL(BACKEND_BASE + "/idea/comments");
	url.searchParams.append("id", idea);
	if (limit) url.searchParams.append("limit", limit.toString());
	if (offset) url.searchParams.append("offset", offset.toString());
	url.searchParams.append("token", token);

	const error = () => {
		ERROR_MESSAGE_STORE.set("could not load comments from server");
	};

	const success = (data: { entries: RAW_Comment[] }) => {
		COMMENTS_STORE.set(data.entries.map((e) => mapComment(e)));

		if (then) then();
	};

	apiFetch(url.toString(), "GET", null, success, error);
}
