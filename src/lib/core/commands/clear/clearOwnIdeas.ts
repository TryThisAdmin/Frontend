import { OWN_IDEAS_STORE } from "../../stores";

/**
 * Clears the OWN_IDEAS_STORE
 * @param then Function to call after successfull operation
 */
export function clearOwnIdeasCommand(then: () => void = null): void {
	OWN_IDEAS_STORE.set([]);

	if (then) then();
}
