import { ACCOUNT_STORE } from "../../stores";

/**
 * Clears the ACCOUNT_STORE
 * @param then Function to call after successfull operation
 */
export function clearAccountCommand(then: () => void = null): void {
	ACCOUNT_STORE.set(null);

	if (then) then();
}
