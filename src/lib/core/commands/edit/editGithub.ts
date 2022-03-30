import { ERROR_MESSAGE_STORE, TOKEN_STORE } from "../../stores";
import { get } from "svelte/store";
import { BACKEND_BASE } from "$lib/core/api/endpoint";
import { apiFetch } from "$lib/core/api/fetch";

/**
 * Changes the GitHub username of a user
 * @param username New GitHub username
 * @param then Function to call after successfull operation
 */
export function editGithubCommand(username: string, then: () => void = null): void {
	const token = get(TOKEN_STORE);

	const url = new URL(BACKEND_BASE + "/user/github");
	const data = new FormData();
	data.append("username", username);
	data.append("token", token);

	const error = () => {
		ERROR_MESSAGE_STORE.set("Could not change github");
	};

	const success = () => {
		if (then) then();
	};

	apiFetch(url.toString(), "POST", data, success, error);
}
