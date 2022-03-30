import { get } from "svelte/store";
import { BACKEND_BASE } from "../../api/endpoint";
import { apiFetch } from "../../api/fetch";
import type { RAW_Account } from "../../api/interfaces";
import { mapAccount } from "../../api/mappings";
import { ACCOUNT_STORE, ERROR_MESSAGE_STORE, TOKEN_STORE } from "../../stores";

/**
 * Loads account information into the ACCOUNT_STORE
 * @param then Function to call after successfull operation
 */
export function loadAccountCommand(then: () => void = null): void {
	const token = get(TOKEN_STORE);

	const url = new URL(BACKEND_BASE + "/user/account");
	url.searchParams.append("token", token);

	const error = () => {
		ERROR_MESSAGE_STORE.set("could not load account data from server");
	};

	const success = (data: { entries: RAW_Account[] }) => {
		if (!data.entries.length) {
			ERROR_MESSAGE_STORE.set("could not load account data from server");
			return;
		}
		ACCOUNT_STORE.set(mapAccount(data.entries[0]));

		if (then) then();
	};

	apiFetch(url.toString(), "GET", null, success, error);
}
