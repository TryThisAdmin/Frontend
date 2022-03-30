import { TOP_IDEAS_STORE } from "../../stores";

/**
 * Clears the TOP_IDEAS_STORE
 * @param then Function to call after successfull operation
 */
export function clearTopIdeasCommand(then: () => void = null): void {
	TOP_IDEAS_STORE.set([]);

	if (then) then();
}
