import { ROLE_STORE, TOKEN_STORE, UID_STORE, USERNAME_STORE } from "../../stores";

/**
 * Clears all information from ROLE_STORE, USERNAME_STORE, UID_STORE and TOKEN_STORE.
 * Effectively logs out the user
 * @param then Function to call after successfull operation
 */
export function logoutCommand(then: () => void = null): void {
	TOKEN_STORE.set("");
	UID_STORE.set("");
	USERNAME_STORE.set("");
	ROLE_STORE.set("");

	if (then) then();
}
