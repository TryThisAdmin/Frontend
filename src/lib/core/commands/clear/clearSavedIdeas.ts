import { SAVED_IDEAS_STORE } from "../../stores";

/**
 * Clears the SAVED_IDEAS_STORE
 * @param then Function to call after successfull operation
 */
export function clearSavedIdeasCommand(then: () => void = null): void {
	SAVED_IDEAS_STORE.set([]);

	if (then) then();
}
