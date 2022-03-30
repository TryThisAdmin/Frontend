import { USER_STORE } from "../../stores";

/**
 * Clears the USER_STORE
 * @param then Function to call after successfull operation
 */
export function clearUserCommand(then: () => void = null): void {
	USER_STORE.set(null);

	if (then) then();
}
