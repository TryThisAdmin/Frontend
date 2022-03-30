import { BACKEND_BASE } from "$lib/core/api/endpoint";
import { apiFetch } from "$lib/core/api/fetch";
import { ERROR_MESSAGE_STORE } from "$lib/core/stores";

/**
 * Registers a new user account
 * @param username Username for login
 * @param email E-Mail of the new user
 * @param password Password for login
 * @param then Function to call after successfull operation
 */
export function registerCommand(
	username: string,
	email: string,
	password: string,
	then: () => void = null
): void {
	const url = new URL(BACKEND_BASE + "/register");
	const data = new FormData();
	data.append("username", username);
	data.append("email", email);
	data.append("password", password);

	const error = () => {
		ERROR_MESSAGE_STORE.set("Could not register new user");
	};

	const success = () => {
		if (then) then();
	};

	apiFetch(url.toString(), "POST", data, success, error);
}
