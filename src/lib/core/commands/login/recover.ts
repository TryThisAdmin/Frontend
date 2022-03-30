import { BACKEND_BASE } from "../../api/endpoint";
import { apiFetch } from "../../api/fetch";
import { ERROR_MESSAGE_STORE } from "../../stores";

/**
 * Requests account recovery
 * @param email E-Mail of the user account
 * @param then Function to call after successfull operation
 */
export function recoverCommand(email: string, then: () => void = null): void {
	const url = new URL(BACKEND_BASE + "/user/recovery");
	const data = new FormData();
	data.append("email", email);

	const error = () => {
		ERROR_MESSAGE_STORE.set("could not post data to server");
	};

	const success = () => {
		if (then) then();
	};

	apiFetch(url.toString(), "POST", data, success, error);
}
