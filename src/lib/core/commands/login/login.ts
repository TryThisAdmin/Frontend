import { BACKEND_BASE } from "../../api/endpoint";
import { apiFetch } from "../../api/fetch";
import { getPayload } from "../../api/jwtDecoder";
import {
	ERROR_MESSAGE_STORE,
	ROLE_STORE,
	TOKEN_STORE,
	UID_STORE,
	USERNAME_STORE
} from "../../stores";

/**
 * Loads token from backend and loads information into ROLE_STORE, USERNAME_STORE, UID_STORE and TOKEN_STORE
 * @param username Username for login
 * @param password Password for login
 * @param then Function to call after successfull operation
 */
export function loginCommand(username: string, password: string, then: () => void = null): void {
	const url = new URL(BACKEND_BASE + "/token");
	url.searchParams.set("username", username);
	url.searchParams.set("password", password);

	const success = (data: { token: string }) => {
		const payload = getPayload(data.token);

		ROLE_STORE.set(payload.role);
		USERNAME_STORE.set(username);
		UID_STORE.set(payload.uid);
		TOKEN_STORE.set(data.token);

		if (then) then();
	};

	const error = () => {
		ERROR_MESSAGE_STORE.set("Login failed");
	};

	apiFetch(url.toString(), "GET", null, success, error);
}
