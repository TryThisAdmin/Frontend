import { LIKED_IDEAS_STORE } from "../../stores";

/**
 * Clears the LIKED_IDEAS_STORE
 * @param then Function to call after successfull operation
 */
export function clearLikeIdeasCommand(then: () => void = null): void {
	LIKED_IDEAS_STORE.set([]);

	if (then) then();
}
