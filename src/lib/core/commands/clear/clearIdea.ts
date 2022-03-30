import { CURRENT_IDEA_STORE } from "../../stores";

/**
 * Clears the CURRENT_IDEA_STORE
 * @param then Function to call after successfull operation
 */
export function clearIdeaCommand(then: () => void = null): void {
	CURRENT_IDEA_STORE.set(null);

	if (then) then();
}
