export function isValidPassword(password: string): boolean {
	const minLength = 8;
	const filteredPassword = password.replace(/\s+/g, "");

	return filteredPassword.length >= minLength;
}

export function isValidUsername(username: string): boolean {
	const minLength = 3;
	const filteredUsername = username.replace(/\s+/g, "");

	return username === filteredUsername && filteredUsername.length >= minLength;
}

export function isValidTag(tag: string): boolean {
	const spaces = tag.includes(" ");
	const commas = tag.includes(",");
	const length = tag.length > 1;

	return !spaces && !commas && length;
}

export function isValidTitle(title: string): boolean {
	const minLength = 8;
	const filteredTitle = title.replace(/\s+/g, "");

	return filteredTitle.length >= minLength;
}

export function isValidContent(content: string): boolean {
	const minLength = 120;
	const filteredContent = content.replace(/\s+/g, "");

	return filteredContent.length >= minLength;
}

export function isValidComment(comment: string): boolean {
	const minLength = 1;
	const filteredComment = comment.replace(/\s+/g, "");

	return filteredComment.length >= minLength;
}
