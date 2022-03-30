import { get } from "svelte/store";
import { BACKEND_BASE } from "../../api/endpoint";
import { apiFetch } from "../../api/fetch";
import { ERROR_MESSAGE_STORE, TOKEN_STORE } from "../../stores";

/**
 * Creates a new comment
 * @param idea ID of the idea to comment on
 * @param content Comments content
 * @param then Function to call after successfull operation
 */
export function createCommentCommand(idea: string, content: string, then: () => void = null): void {
	const token = get(TOKEN_STORE);

	const url = new URL(BACKEND_BASE + "/comment");
	const data = new FormData();
	data.append("idea", idea);
	data.append("content", content);
	data.append("token", token);

	const error = () => {
		ERROR_MESSAGE_STORE.set("could not post data to server");
	};

	const success = () => {
		if (then) then();
	};

	apiFetch(url.toString(), "POST", data, success, error);
}
