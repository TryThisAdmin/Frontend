import { SEARCH_RESULTS_STORE } from "../../stores";

/**
 * Clears the SEARCH_RESULTS_STORE
 * @param then Function to call after successfull operation
 */
export function clearSearchResultsCommand(then: () => void = null): void {
	SEARCH_RESULTS_STORE.set([]);

	if (then) then();
}
