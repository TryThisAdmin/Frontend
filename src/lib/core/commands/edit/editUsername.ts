import { ERROR_MESSAGE_STORE, TOKEN_STORE, USERNAME_STORE } from "../../stores";
import { get } from "svelte/store";
import { BACKEND_BASE } from "$lib/core/api/endpoint";
import { apiFetch } from "$lib/core/api/fetch";

/**
 * Changes the username of a user
 * @param username New username adsress
 * @param then Function to call after successfull operation
 */
export function editUsernameCommand(username: string, then: () => void = null): void {
	const token = get(TOKEN_STORE);

	const url = new URL(BACKEND_BASE + "/user/name");
	const data = new FormData();
	data.append("name", username);
	data.append("token", token);

	const error = () => {
		ERROR_MESSAGE_STORE.set("Could not change username");
	};

	const success = () => {
		USERNAME_STORE.set(username);
		if (then) then();
	};

	apiFetch(url.toString(), "POST", data, success, error);
}
