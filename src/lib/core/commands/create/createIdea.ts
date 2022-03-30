import { get } from "svelte/store";
import { BACKEND_BASE } from "../../api/endpoint";
import { apiFetch } from "../../api/fetch";
import { ERROR_MESSAGE_STORE, TOKEN_STORE } from "../../stores";

/**
 * Creates a new idea
 * @param title Title of the new idea
 * @param content Ideas content
 * @param tags Tags for the idea
 * @param then Function to call after successfull operation
 */
export function createIdeaCommand(
	title: string,
	content: string,
	tags: string[] = [],
	then: () => void = null
): void {
	const token = get(TOKEN_STORE);

	const tagString = tags
		.map((e) => e.replace(",", ""))
		.map((e) => e.trim())
		.filter((e) => !!e)
		.join(",");

	if (!title) {
		ERROR_MESSAGE_STORE.set("no title provided");
	}

	const url = new URL(BACKEND_BASE + "/idea");
	const data = new FormData();
	data.append("title", title);
	data.append("content", content);
	data.append("tags", tagString);
	data.append("token", token);

	const error = () => {
		ERROR_MESSAGE_STORE.set("could not post data to server");
	};

	const success = () => {
		if (then) then();
	};

	apiFetch(url.toString(), "POST", data, success, error);
}
