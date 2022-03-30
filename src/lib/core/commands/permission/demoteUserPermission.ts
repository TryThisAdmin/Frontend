import { get } from "svelte/store";
import { BACKEND_BASE } from "../../api/endpoint";
import { apiFetch } from "../../api/fetch";
import { ERROR_MESSAGE_STORE, TOKEN_STORE } from "../../stores";

/**
 * Takes administrator permissions from a user
 * @param uid User to take permissions from
 * @param then Function to call after successfull operation
 */
export function demoteUserPermissionCommand(uid: string, then: () => void = null): void {
	const token = get(TOKEN_STORE);

	const url = new URL(BACKEND_BASE + "/user/permission");
	url.searchParams.append("id", uid);
	url.searchParams.append("token", token);

	const error = () => {
		ERROR_MESSAGE_STORE.set("could not delete data from server");
	};

	const success = () => {
		if (then) then();
	};

	apiFetch(url.toString(), "DELETE", null, success, error);
}
