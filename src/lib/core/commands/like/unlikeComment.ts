import { get } from "svelte/store";
import { BACKEND_BASE } from "../../api/endpoint";
import { apiFetch } from "../../api/fetch";
import { ERROR_MESSAGE_STORE, TOKEN_STORE } from "../../stores";

/**
 * Unlikes a comment
 * @param id Comments ID to unlike
 * @param then Function to call after successfull operation
 */
export function unlikeCommentCommand(id: string, then: () => void = null): void {
	const token = get(TOKEN_STORE);

	const url = new URL(BACKEND_BASE + "/comment/like");
	url.searchParams.append("id", id);
	url.searchParams.append("token", token);

	const error = () => {
		ERROR_MESSAGE_STORE.set("could not delete data from server");
	};

	const success = () => {
		if (then) then();
	};

	apiFetch(url.toString(), "DELETE", null, success, error);
}
