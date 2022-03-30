import { USER_IDEAS_STORE } from "../../stores";

/**
 * Clears the USER_IDEAS_STORE
 * @param then Function to call after successfull operation
 */
export function clearUserIdeasCommand(then: () => void = null): void {
	USER_IDEAS_STORE.set([]);

	if (then) then();
}
