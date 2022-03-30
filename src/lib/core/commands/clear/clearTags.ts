import { TAG_STORE } from "../../stores";

/**
 * Clears the TAG_STORE
 * @param then Function to call after successfull operation
 */
export function clearTagsCommand(then: () => void = null): void {
	TAG_STORE.set([]);

	if (then) then();
}
