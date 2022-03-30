import { get } from "svelte/store";
import { BACKEND_BASE } from "../../api/endpoint";
import { apiFetch } from "../../api/fetch";
import { ERROR_MESSAGE_STORE, TOKEN_STORE } from "../../stores";

/**
 * Saves an idea
 * @param id Ideas ID to save
 * @param then Function to call after successfull operation
 */
export function saveIdeaCommand(id: string, then: () => void = null): void {
	const token = get(TOKEN_STORE);

	const url = new URL(BACKEND_BASE + "/idea/save");
	const data = new FormData();
	data.append("id", id);
	data.append("token", token);

	const error = () => {
		ERROR_MESSAGE_STORE.set("could not post data to server");
	};

	const success = () => {
		if (then) then();
	};

	apiFetch(url.toString(), "POST", data, success, error);
}
