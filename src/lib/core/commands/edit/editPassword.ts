import { ERROR_MESSAGE_STORE, TOKEN_STORE } from "../../stores";
import { get } from "svelte/store";
import { BACKEND_BASE } from "$lib/core/api/endpoint";
import { apiFetch } from "$lib/core/api/fetch";

/**
 * Changes the password of a user
 * @param password New password
 * @param then Function to call after successfull operation
 */
export function editPasswordCommand(password: string, then: () => void = null): void {
	const token = get(TOKEN_STORE);

	const url = new URL(BACKEND_BASE + "/user/password");
	const data = new FormData();
	data.append("password", password);
	data.append("token", token);

	const error = () => {
		ERROR_MESSAGE_STORE.set("Could not change password");
	};

	const success = () => {
		if (then) then();
	};

	apiFetch(url.toString(), "POST", data, success, error);
}
