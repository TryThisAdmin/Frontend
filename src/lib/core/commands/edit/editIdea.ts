import { get } from "svelte/store";
import { BACKEND_BASE } from "../../api/endpoint";
import { apiFetch } from "../../api/fetch";
import { ERROR_MESSAGE_STORE, TOKEN_STORE } from "../../stores";

/**
 * Edits an existing idea
 * @param id ID of the idea to edit
 * @param title New title of the idea
 * @param content New content of the idea
 * @param tags New tags of the idea
 * @param then Function to call after successfull operation
 */
export function editIdeaCommand(
	id: string,
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
	data.append("id", id);
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
