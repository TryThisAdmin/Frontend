import { RECENT_IDEAS_STORE } from "../../stores";

/**
 * Clears the RECENT_IDEAS_STORE
 * @param then Function to call after successfull operation
 */
export function clearRecentIdeasCommand(then: () => void = null): void {
	RECENT_IDEAS_STORE.set([]);

	if (then) then();
}
