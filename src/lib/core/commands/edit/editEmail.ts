import { ERROR_MESSAGE_STORE, TOKEN_STORE } from "../../stores";
import { get } from "svelte/store";
import { BACKEND_BASE } from "$lib/core/api/endpoint";
import { apiFetch } from "$lib/core/api/fetch";

/**
 * Changes the E-Mail of a user
 * @param email New E-Mail adsress
 * @param then Function to call after successfull operation
 */
export function editEmailCommand(email: string, then: () => void = null): void {
	const token = get(TOKEN_STORE);

	const url = new URL(BACKEND_BASE + "/user/email");
	const data = new FormData();
	data.append("email", email);
	data.append("token", token);

	const error = () => {
		ERROR_MESSAGE_STORE.set("Could not change email");
	};

	const success = () => {
		if (then) then();
	};

	apiFetch(url.toString(), "POST", data, success, error);
}
