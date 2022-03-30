export function apiFetch(
	url: string,
	method: string,
	data: FormData = null,
	success: (data: any) => void = null,
	error: (code: number) => void = null
): void {
	const xhr = new XMLHttpRequest();

	xhr.addEventListener("readystatechange", () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 && success) success(JSON.parse(xhr.responseText));
			else if (error) error(xhr.status);
		}
	});
	xhr.addEventListener("error", () => {
		if (error) error(xhr.status);
	});

	xhr.open(method, url, false);
	if (data) xhr.send(data);
	else xhr.send();
}
