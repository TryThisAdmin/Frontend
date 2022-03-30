import { COMMENTS_STORE } from "../../stores";

/**
 * Clears the COMMENTS_STORE
 * @param then Function to call after successfull operation
 */
export function clearCommentsCommand(then: () => void = null): void {
	COMMENTS_STORE.set([]);

	if (then) then();
}
