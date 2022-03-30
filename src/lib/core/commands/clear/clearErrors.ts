import { ERROR_MESSAGE_STORE } from "../../stores";

/**
 * Clears the ERROR_MESSAGE_STORE
 * @param then Function to call after successfull operation
 */
export function clearErrorsCommand(then: () => void = null): void {
	ERROR_MESSAGE_STORE.set("");

	if (then) then();
}
