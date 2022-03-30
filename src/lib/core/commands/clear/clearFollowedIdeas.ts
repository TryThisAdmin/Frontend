import { FOLLOWED_IDEAS_STORE } from "../../stores";

/**
 * Clears the FOLLOWED_IDEAS_STORE
 * @param then Function to call after successfull operation
 */
export function clearFollowedIdeasCommand(then: () => void = null): void {
	FOLLOWED_IDEAS_STORE.set([]);

	if (then) then();
}
