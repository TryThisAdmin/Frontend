import { get } from "svelte/store";
import { BACKEND_BASE } from "../../api/endpoint";
import { apiFetch } from "../../api/fetch";
import { ERROR_MESSAGE_STORE, TOKEN_STORE } from "../../stores";

/**
 * Follows a user
 * @param uid User ID to follow
 * @param then Function to call after successfull operation
 */
export function followUserCommand(uid: string, then: () => void = null): void {
	const token = get(TOKEN_STORE);

	const url = new URL(BACKEND_BASE + "/user/follow");
	const data = new FormData();
	data.append("id", uid);
	data.append("token", token);

	const error = () => {
		ERROR_MESSAGE_STORE.set("could not post data to server");
	};

	const success = () => {
		if (then) then();
	};

	apiFetch(url.toString(), "POST", data, success, error);
}
