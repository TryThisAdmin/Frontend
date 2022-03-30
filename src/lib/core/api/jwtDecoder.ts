import type { JWTPayload } from "./interfaces";

export function getPayload(token: string): JWTPayload {
	const payload = token.split(".")[1];
	const decoded = decodeURIComponent(payload);
	const content: JWTPayload = JSON.parse(atob(decoded));
	return content;
}
