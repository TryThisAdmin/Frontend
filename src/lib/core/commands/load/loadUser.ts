import { get } from "svelte/store";
import { BACKEND_BASE } from "../../api/endpoint";
import { apiFetch } from "../../api/fetch";
import type { RAW_User } from "../../api/interfaces";
import { mapUser } from "../../api/mappings";
import { ERROR_MESSAGE_STORE, TOKEN_STORE, USER_STORE } from "../../stores";

/**
 * Loads user information into the USER_STORE
 * @param uid User ID to load data from
 * @param then Function to call after successfull operation
 */
export function loadUserCommand(uid: string, then: () => void = null): void {
	const token = get(TOKEN_STORE);

	const url = new URL(BACKEND_BASE + "/user");
	url.searchParams.append("id", uid);
	url.searchParams.append("token", token);

	const error = () => {
		ERROR_MESSAGE_STORE.set("could not load user data from server");
	};

	const success = (data: { entries: RAW_User[] }) => {
		if (!data.entries.length) {
			ERROR_MESSAGE_STORE.set("could not load user data from server");
			return;
		}
		USER_STORE.set(mapUser(data.entries[0]));

		if (then) then();
	};

	apiFetch(url.toString(), "GET", null, success, error);
}
